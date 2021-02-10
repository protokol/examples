import { Identities, Utils } from "@arkecosystem/crypto";
import { ProtokolConnection } from "@protokol/client";

async function getNonce(client: ProtokolConnection, passphrase: string): Promise<Utils.BigNumber> {
	const senderWallet = await client.api("wallets").get(Identities.Address.fromPassphrase(passphrase));
	return Utils.BigNumber.make(senderWallet.body.data.nonce);
}

async function getNextNonce(client: ProtokolConnection, passphrase: string): Promise<Utils.BigNumber> {
	const senderWallet = await client.api("wallets").get(Identities.Address.fromPassphrase(passphrase));
	return Utils.BigNumber.make(senderWallet.body.data.nonce).plus(1);
}
