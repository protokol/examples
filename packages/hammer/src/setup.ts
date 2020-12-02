import { ARKCrypto, Transactions as NFTTransactions } from "@protokol/nft-base-crypto";
import { Transactions as NFTExchangeTransactions } from "@protokol/nft-exchange-crypto";

import { configurations } from "./configurations";
import exceptions from "./data/networks/exceptions.json";
import milestones from "./data/networks/milestones.json";
import configs from "./data/networks/network.json";

export const setupScript = async () => {
	ARKCrypto.Managers.configManager.setFromPreset(configurations.network as "testnet" | "devnet" | "mainnet");
	ARKCrypto.Managers.configManager.setHeight(configurations.networkHeight);

	ARKCrypto.Managers.configManager.setConfig({
		network: configs,
		milestones: milestones,
		genesisBlock: ARKCrypto.Managers.configManager.getPreset("devnet").genesisBlock,
		exceptions: exceptions,
	});

	ARKCrypto.Transactions.TransactionRegistry.registerTransactionType(
		NFTTransactions.NFTRegisterCollectionTransaction,
	);
	ARKCrypto.Transactions.TransactionRegistry.registerTransactionType(NFTTransactions.NFTCreateTransaction);
	ARKCrypto.Transactions.TransactionRegistry.registerTransactionType(NFTExchangeTransactions.NFTAuctionTransaction);
	ARKCrypto.Transactions.TransactionRegistry.registerTransactionType(NFTExchangeTransactions.NFTBidTransaction);
	ARKCrypto.Transactions.TransactionRegistry.registerTransactionType(
		NFTExchangeTransactions.NFTAcceptTradeTransaction,
	);
};
