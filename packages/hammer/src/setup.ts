import { Transactions as NFTTransactions } from "@protokol/nft-base-crypto";
import { Transactions as NFTExchangeTransactions } from "@protokol/nft-exchange-crypto";
import { Managers, Transactions} from "@arkecosystem/crypto";

import { configurations } from "./configurations";
import exceptions from "./data/networks/exceptions.json";
import milestones from "./data/networks/milestones.json";
import configs from "./data/networks/network.json";

export const setupScript = async () => {
	Managers.configManager.setFromPreset(configurations.network as "testnet" | "devnet" | "mainnet");
	Managers.configManager.setHeight(configurations.networkHeight);

	Managers.configManager.setConfig({
		network: configs,
		milestones: milestones,
		genesisBlock: Managers.configManager.getPreset("devnet").genesisBlock,
		exceptions: exceptions,
	});

	Transactions.TransactionRegistry.registerTransactionType(
		NFTTransactions.NFTRegisterCollectionTransaction,
	);
	Transactions.TransactionRegistry.registerTransactionType(NFTTransactions.NFTCreateTransaction);
	Transactions.TransactionRegistry.registerTransactionType(NFTExchangeTransactions.NFTAuctionTransaction);
	Transactions.TransactionRegistry.registerTransactionType(NFTExchangeTransactions.NFTBidTransaction);
	Transactions.TransactionRegistry.registerTransactionType(
		NFTExchangeTransactions.NFTAcceptTradeTransaction,
	);
};
