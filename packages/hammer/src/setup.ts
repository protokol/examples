import { ARKCrypto, Transactions as NFTTransactions } from "@protokol/nft-base-crypto";
import { Transactions as NFTExchangeTransactions } from "@protokol/nft-exchange-crypto";
import { configurations } from "./configurations";

export const setupScript = () => {
	ARKCrypto.Managers.configManager.setFromPreset(configurations.network as "testnet" | "devnet" | "mainnet");
	ARKCrypto.Managers.configManager.setHeight(configurations.networkHeight);
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
