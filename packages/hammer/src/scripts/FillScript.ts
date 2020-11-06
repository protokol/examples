import { ProtokolConnection } from "@protokol/client";
import { ARKCrypto } from "@protokol/nft-base-crypto";

import delegates = require("../data/delegates/delegates.json");
import faker from "faker";

import { configurations } from "../configurations";
import { createAsset, createAuction, createBid, createCollection, createTrade } from "../creation";

export class FillScript {
	public client = new ProtokolConnection(configurations.clientHost);
	public passphrase = delegates.secrets[faker.random.number({ max: delegates.secrets.length - 1, min: 0 })];

	public collections: string[] = [];
	public assets: string[] = [];
	public auctions: string[] = [];
	public auctionBids: Map<string, string[]> = new Map<string, string[]>();

	public async createCollections(
		numberOfBatchs: number,
		numberOfTransactionsPerBatch: number,
		collection: any,
	): Promise<void> {
		let nonce = await this.getNonce(this.passphrase);
		for (let i = 0; i < numberOfBatchs; i++) {
			const transactions: ARKCrypto.Interfaces.ITransactionJson[] = [];
			for (let i = 1; i < numberOfTransactionsPerBatch + 1; i++) {
				nonce = nonce.plus(1);
				transactions.push(createCollection(collection, nonce.toFixed(), this.passphrase));
			}

			const broadcastResponse = await this.client.api("transactions").create({ transactions: transactions });
			console.log(JSON.stringify(broadcastResponse.body.data, null, 4));
			for (const collectionId of broadcastResponse.body.data.accept) {
				this.collections.push(collectionId);
			}
		}
	}
	public async createAssets(
		batchs: number,
		transactionsPerBatch: number,
		collectionsUsed: number,
		attributes: any,
	): Promise<void> {
		let nonce = await this.getNonce(this.passphrase);
		for (let j = 0; j < collectionsUsed; j++) {
			for (let i = 0; i < batchs; i++) {
				const transactions: ARKCrypto.Interfaces.ITransactionJson[] = [];
				for (let i = 1; i < transactionsPerBatch + 1; i++) {
					nonce = nonce.plus(1);
					transactions.push(
						createAsset(
							{
								collectionId: this.collections[j],
								...attributes,
							},
							nonce.toFixed(),
							this.passphrase,
						),
					);
				}

				const broadcastResponse = await this.client.api("transactions").create({ transactions: transactions });
				console.log(JSON.stringify(broadcastResponse.body.data, null, 4));
				for (const assetId of broadcastResponse.body.data.accept) {
					this.assets.push(assetId);
				}
			}
		}
	}
	public async createAuctions(assetsPerAuction: number, auctions: number): Promise<void> {
		let nonce = await this.getNonce(this.passphrase);
		const clonedAssets = [...this.assets];
		for (let i = 0; i < auctions; i++) {
			const transactions: ARKCrypto.Interfaces.ITransactionJson[] = [];
			nonce = nonce.plus(1);
			transactions.push(
				createAuction(
					{
						nftIds: clonedAssets.splice(0, assetsPerAuction),
						startAmount: ARKCrypto.Utils.BigNumber.make("1"),
						expiration: {
							blockHeight: 10000000000,
						},
					},
					nonce.toFixed(),
					this.passphrase,
				),
			);

			const broadcastResponse = await this.client.api("transactions").create({ transactions: transactions });
			console.log(JSON.stringify(broadcastResponse.body.data, null, 4));
			for (const auctionId of broadcastResponse.body.data.accept) {
				this.auctions.push(auctionId);
			}
		}
	}
	public async createBids(bidsPerAuction: number, auctionsToBid: number): Promise<void> {
		for (let i = 0; i < auctionsToBid; i++) {
			for (let j = 0; j < bidsPerAuction; j++) {
				const pass = delegates.secrets[faker.random.number({ max: delegates.secrets.length - 1, min: 0 })];
				const transactions: ARKCrypto.Interfaces.ITransactionJson[] = [];
				const nonce = await this.getNonce(pass);
				transactions.push(
					createBid(
						{
							bidAmount: ARKCrypto.Utils.BigNumber.make(
								faker.random.number({ max: 1000000, min: 1 }).toString(),
							),
							auctionId: this.auctions[i],
						},
						nonce.plus(1).toString(),
						pass,
					),
				);

				const broadcastResponse = await this.client.api("transactions").create({ transactions: transactions });
				console.log(JSON.stringify(broadcastResponse.body.data, null, 4));
				for (const bidId of broadcastResponse.body.data.accept) {
					let entry = this.auctionBids.get(this.auctions[i]);
					if (!entry) {
						entry = [];
					}
					entry.push(bidId);
					this.auctionBids.set(this.auctions[i], entry);
				}
			}
		}
	}

	public async createTrades(): Promise<void> {
		let nonce = await this.getNonce(this.passphrase);
		for (const [key, value] of this.auctionBids) {
			const transactions: ARKCrypto.Interfaces.ITransactionJson[] = [];
			nonce = nonce.plus(1);

			transactions.push(
				createTrade(
					{
						auctionId: key,
						bidId: value[faker.random.number({ max: value.length, min: 0 })],
					},
					nonce.toFixed(),
					this.passphrase,
				),
			);

			const broadcastResponse = await this.client.api("transactions").create({ transactions: transactions });
			console.log(JSON.stringify(broadcastResponse.body.data, null, 4));
		}
	}

	public async getNonce(passphrase: string): Promise<ARKCrypto.Utils.BigNumber> {
		const senderWallet = await this.client
			.api("wallets")
			.get(ARKCrypto.Identities.Address.fromPassphrase(passphrase));
		return ARKCrypto.Utils.BigNumber.make(senderWallet.body.data.nonce);
	}
}
