import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { ProtokolConnection } from "@protokol/client";
import { ARKCrypto } from "@protokol/nft-base-crypto";

import { configurations } from "../configurations";
import { createTransfer } from "../creation";

export class ShareCoinsScript {
	public client = new ProtokolConnection(configurations.clientHost);
	public generatedPassphrases: string[] = [];

	public constructor(public readonly passphrase: string) {}

	public generateRandomPassphrases(wallets: number) {
		for (let i = 0; i < wallets; i++) {
			const pass = BIP39.generate();
			this.generatedPassphrases.push(pass);
		}
	}
	public async splitCoins(tokens: number, passphrases: string[]) {
		const wallet = await this.client
			.api("wallets")
			.get(ARKCrypto.Identities.Address.fromPassphrase(this.passphrase));

		let nonce = ARKCrypto.Utils.BigNumber.make(wallet.body.data.nonce);
		const transactions: ARKCrypto.Interfaces.ITransactionJson[] = [];

		for (const pass of passphrases) {
			nonce = nonce.plus(1);
			const transfer = createTransfer(
				ARKCrypto.Identities.Address.fromPassphrase(pass),
				tokens * 10 ** 8,
				nonce.toFixed(),
				this.passphrase,
			);
			transactions.push(transfer);
		}

		const broadcastResponse = await this.client.api("transactions").create({ transactions: transactions });
		console.log(JSON.stringify(broadcastResponse.body.data, null, 4));
	}
}
