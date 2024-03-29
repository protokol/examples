import { Identities, Managers, Transactions, Utils } from "@arkecosystem/crypto";
import { ProtokolConnection } from "@protokol/client";
import { Builders, Transactions as NFTTransactions } from "@protokol/nft-base-crypto";

export const NFTRegisterCollection = async (): Promise<void> => {
	// Configure manager and register transaction type
	Managers.configManager.setFromPreset("testnet");
	Managers.configManager.setHeight(2);
	Transactions.TransactionRegistry.registerTransactionType(NFTTransactions.NFTRegisterCollectionTransaction);

	// Configure our API client
	const client = new ProtokolConnection("http://localhost:4003/api");
	const passphrase = "clay harbor enemy utility margin pretty hub comic piece aerobic umbrella acquire";

	// Step 1: Retrieve the nonce of the sender wallet
	const senderWallet = await client.api("wallets").get(Identities.Address.fromPassphrase(passphrase));
	const senderNonce = Utils.BigNumber.make(senderWallet.body.data.nonce).plus(1);

	// Step 2: Create the transaction
	const transaction = new Builders.NFTRegisterCollectionBuilder()
		.NFTRegisterCollectionAsset({
			name: "Nascar Hero Cards",
			description: "Nascar Hero Cards collection",
			maximumSupply: 10000,
			jsonSchema: {
				type: "object",
				additionalProperties: false,
				required: ["ipfsHashImageFront", "issuedDate", "issuedLocation", "signed"],
				properties: {
					ipfsHashImageFront: {
						type: "string",
						maxLength: 120,
						minLength: 1,
					},
					ipfsHashImageBack: {
						type: "string",
						maxLength: 120,
						minLength: 1,
					},
					issuedDate: {
						format: "date",
					},
					issuedLocation: {
						type: "string",
						maxLength: 255,
						minLength: 1,
					},
					signed: {
						type: "boolean",
					},
					tags: {
						type: "array",
						maxItems: 12,
						minItems: 1,
						additionalItems: false,
						uniqueItems: true,
						items: {
							type: "string",
						},
					},
				},
			},
		})
		.nonce(senderNonce.toFixed())
		.sign(passphrase);

	// Step 3: Broadcast the transaction
	const broadcastResponse = await client.api("transactions").create({ transactions: [transaction.build().toJson()] });

	// Step 4: Log the response
	console.log(JSON.stringify(broadcastResponse.body.data, null, 4));
};
