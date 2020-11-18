import fifaCollection = require("./data/collections/fifa-collection.json");
import marvelCollection = require("./data/collections/marvel-collection.json");
import breitlingCollection = require("./data/collections/breitling-collection.json");
import nascarCollection = require("./data/collections/nascar-collection.json");
import IWCCollection = require("./data/collections/iwc-collection.json");

import ironManAsset = require("./data/assets/marvel/iron-man.json");
import breaitlingAsset = require("./data/assets/breitling/breitling-watch1.json");
import nascarAsset = require("./data/assets/nascar/driver1.json");
import IWCAsset = require("./data/assets/iwc/iwc-watch1.json");

import delay from "delay";
import faker from "faker";

import { configurations } from "./configurations";
import { FillScript } from "./scripts/FillScript";
import { setupScript } from "./setup";

export const main = async () => {
	/** Setup the script - registering transaction types and network settings */
	setupScript();

	const scriptType = new FillScript(configurations.passphrasesFile.secrets);

	console.log("Create FIFA collections");
	/**
	 *	The first argument is number of batches you want to create
	 *	The second argument is numberOfTransactionsPerBatch I suggest that you don't put over
	 *	40 transactions per batch since the default number is 40 in core
	 *	The third argument is the collection asset
	 */
	await scriptType.createCollections(1, 1, fifaCollection);

	await delay(8000);

	console.log("Create FIFA assets");
	/**
	 *  The first argument is number of batches
	 *  The second argument is number of transactionsPerBatch
	 *	The third argument is number of collections used, it takes of an example first three collections
	 * 	you created in first par of the script and makes that many batches of transactions for each
	 */
	await scriptType.createAssets(5, 40, 1, {
		attributes: {
			name: faker.name.findName(),
			pac: faker.random.number({ max: 100, min: 1 }),
			sho: faker.random.number({ max: 100, min: 1 }),
			pas: faker.random.number({ max: 100, min: 1 }),
			dri: faker.random.number({ max: 100, min: 1 }),
			def: faker.random.number({ max: 100, min: 1 }),
			phy: faker.random.number({ max: 100, min: 1 }),
		},
	});

	await delay(8000);

	console.log("Create auctions");
	/**
	 * The first argument is assetsPerAuction, it is the number of assets you want to put
	 * inside the each auction, make sure there are enough of assets created in the previous
	 * part of the script
	 * The second argument is the number of transactions you want to create
	 * */
	await scriptType.createAuctions(4, 10);

	await delay(8000);

	console.log("Create bids");
	/**
	 * The first argument is number of bids you want to create for each auction you created in previous
	 * part of the script
	 * The second argument is the number of auctions you want to bid to, make sure you created enough of them in
	 * previous part of the script
	 * */
	await scriptType.createBids(15, 100);

	await delay(8000);

	console.log("Create trades");
	/**
	 * Creates trades for each auction
	 * */
	await scriptType.createTrades();

	/** Marvel collection fill script */
	// const fillScriptMarvelCollection = new FillScript(configurations.passphrasesFile.secrets);
	//
	// console.log("Create marvel collections");
	// await fillScriptMarvelCollection.createCollections(1, 1, marvelCollection);
	// await delay(80000);
	//
	// console.log("Create Iron Man assets");
	// await fillScriptMarvelCollection.createAssets(1, 40, 1, {
	// 	attributes: ironManAsset,
	// });
	//
	// await delay(80000);
	//
	// console.log("Create auctions");
	// await fillScriptMarvelCollection.createAuctions(2, 10);
	//
	// await delay(80000);
	//
	// console.log("Create bids");
	// await fillScriptMarvelCollection.createBids(10, 8);
	//
	// await delay(80000);
	//
	// console.log("Create trades");
	// await fillScriptMarvelCollection.createTrades();

	/** Breitling collection fill script */

	// const fillScriptBreitlingCollection = new FillScript(configurations.passphrasesFile.secrets);
	//
	// console.log("Create breitling collections");
	// await fillScriptBreitlingCollection.createCollections(1, 1, breitlingCollection);
	// await delay(8000);
	//
	// console.log("Create watch assets");
	// await fillScriptBreitlingCollection.createAssets(2, 40, 1, {
	// 	attributes: breaitlingAsset,
	// });
	//
	// await delay(8000);
	//
	// console.log("Create auctions");
	// await fillScriptBreitlingCollection.createAuctions(2, 20);
	//
	// await delay(8000);
	//
	// console.log("Create bids");
	// await fillScriptBreitlingCollection.createBids(15, 10);
	//
	// await delay(8000);
	//
	// console.log("Create trades");
	// await fillScriptBreitlingCollection.createTrades();

	/** Nascar collection fill script */

	// const fillScriptNascarCollection = new FillScript(configurations.passphrasesFile.secrets);
	//
	// console.log("Create breitling collections");
	// await fillScriptNascarCollection.createCollections(1, 1, nascarCollection);
	// await delay(8000);
	//
	// console.log("Create watch assets");
	// await fillScriptNascarCollection.createAssets(2, 40, 1, {
	// 	attributes: nascarAsset,
	// });
	//
	// await delay(8000);
	//
	// console.log("Create auctions");
	// await fillScriptNascarCollection.createAuctions(2, 20);
	//
	// await delay(8000);
	//
	// console.log("Create bids");
	// await fillScriptNascarCollection.createBids(15, 10);
	//
	// await delay(8000);
	//
	// console.log("Create trades");
	// await fillScriptNascarCollection.createTrades();

	/** IWC collection fill script */

	// const fillScriptIWCCollection = new FillScript(configurations.passphrasesFile.secrets);
	//
	// console.log("Create IWC collections");
	// await fillScriptIWCCollection.createCollections(1, 1, IWCCollection);
	// await delay(8000);
	//
	// console.log("Create watch assets");
	// await fillScriptIWCCollection.createAssets(2, 40, 1, {
	// 	attributes: IWCAsset,
	// });
	//
	// await delay(8000);
	//
	// console.log("Create auctions");
	// await fillScriptIWCCollection.createAuctions(2, 20);
	//
	// await delay(8000);
	//
	// console.log("Create bids");
	// await fillScriptIWCCollection.createBids(15, 10);
	//
	// await delay(8000);
	//
	// console.log("Create trades");
	// await fillScriptIWCCollection.createTrades();
};
