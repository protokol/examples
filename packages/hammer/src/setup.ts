import { Managers, Transactions } from "@arkecosystem/crypto";
import { ProtokolConnection } from "@protokol/client";
import { Transactions as NFTTransactions } from "@protokol/nft-base-crypto";
import { Transactions as NFTExchangeTransactions } from "@protokol/nft-exchange-crypto";

import { configurations } from "./configurations";

export const setupScript = async () => {
	const client = new ProtokolConnection(configurations.clientHost);
	const configs = await client.api("node").crypto();
	const {
		body: {
			data: {
				block: { height },
			},
		},
	} = await client.get("blockchain");

	Managers.configManager.setConfig({
		network: configs.body.data.network,
		milestones: configs.body.data.milestones,
		genesisBlock: Managers.configManager.getPreset("devnet").genesisBlock,
		exceptions: configs.body.data.exceptions,
	});
	Managers.configManager.setHeight(height);

	Transactions.TransactionRegistry.registerTransactionType(NFTTransactions.NFTRegisterCollectionTransaction);
	Transactions.TransactionRegistry.registerTransactionType(NFTTransactions.NFTCreateTransaction);
	Transactions.TransactionRegistry.registerTransactionType(NFTTransactions.NFTBurnTransaction);
	Transactions.TransactionRegistry.registerTransactionType(NFTTransactions.NFTTransferTransaction);

	Transactions.TransactionRegistry.registerTransactionType(NFTExchangeTransactions.NFTAuctionTransaction);
	Transactions.TransactionRegistry.registerTransactionType(NFTExchangeTransactions.NFTAuctionCancelTransaction);
	Transactions.TransactionRegistry.registerTransactionType(NFTExchangeTransactions.NFTBidTransaction);
	Transactions.TransactionRegistry.registerTransactionType(NFTExchangeTransactions.NFTBidCancelTransaction);
	Transactions.TransactionRegistry.registerTransactionType(NFTExchangeTransactions.NFTAcceptTradeTransaction);
};
