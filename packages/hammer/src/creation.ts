import { ARKCrypto, Builders as NFTBaseBuilders, Interfaces as NFTBaseInterfaces } from "@protokol/nft-base-crypto";
import { Builders as NFTExchangeBuilders, Interfaces as NFTExchangeInterfaces } from "@protokol/nft-exchange-crypto";

export const createCollection = (
	collection: NFTBaseInterfaces.NFTCollectionAsset,
	nonce: string,
	passphrase: string,
): ARKCrypto.Interfaces.ITransactionJson => {
	return new NFTBaseBuilders.NFTRegisterCollectionBuilder()
		.NFTRegisterCollectionAsset(collection)
		.nonce(nonce)
		.sign(passphrase)
		.build()
		.toJson();
};

export const createAsset = (
	asset: NFTBaseInterfaces.NFTTokenAsset,
	nonce: string,
	passphrase: string,
): ARKCrypto.Interfaces.ITransactionJson => {
	return new NFTBaseBuilders.NFTCreateBuilder().NFTCreateToken(asset).nonce(nonce).sign(passphrase).build().toJson();
};

export const createAuction = (
	asset: NFTExchangeInterfaces.NFTAuctionAsset,
	nonce: string,
	passphrase: string,
): ARKCrypto.Interfaces.ITransactionJson => {
	return new NFTExchangeBuilders.NFTAuctionBuilder()
		.NFTAuctionAsset(asset)
		.nonce(nonce)
		.sign(passphrase)
		.build()
		.toJson();
};

export const createBid = (
	asset: NFTExchangeInterfaces.NFTBidAsset,
	nonce: string,
	passphrase: string,
): ARKCrypto.Interfaces.ITransactionJson => {
	return new NFTExchangeBuilders.NFTBidBuilder().NFTBidAsset(asset).nonce(nonce).sign(passphrase).build().toJson();
};

export const createTrade = (
	asset: NFTExchangeInterfaces.NFTAcceptTradeAsset,
	nonce: string,
	passphrase: string,
): ARKCrypto.Interfaces.ITransactionJson => {
	return new NFTExchangeBuilders.NftAcceptTradeBuilder()
		.NFTAcceptTradeAsset(asset)
		.nonce(nonce)
		.sign(passphrase)
		.build()
		.toJson();
};
