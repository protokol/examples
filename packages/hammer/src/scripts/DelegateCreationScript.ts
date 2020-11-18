import { ProtokolConnection } from "@protokol/client";
import { ARKCrypto } from "@protokol/nft-base-crypto";

import { configurations } from "../configurations";
import { createDelegate } from "../creation";

export class DelegateCreationScript {
	public client = new ProtokolConnection(configurations.clientHost);

	public constructor(public readonly passphrase: string) {}

	public async createDelegate(delegateName: string) {
		const wallet = await this.client
			.api("wallets")
			.get(ARKCrypto.Identities.Address.fromPassphrase(this.passphrase));

		const nonce = wallet.body.data.nonce + 1;

		const delegate = createDelegate(delegateName, nonce.toString(), this.passphrase);

		const broadcastResponse = await this.client.api("transactions").create({ transactions: [delegate] });
		console.log(JSON.stringify(broadcastResponse.body.data, null, 4));
		if (!broadcastResponse.body.data.accept.includes(delegate.id!)) {
			throw new Error("Error creating delegate");
		}
	}
}
