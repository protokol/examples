import fifaCollection = require("./data/collections/fifa-collection.json");
import marvelCollection = require("./data/collections/marvel-collection.json");
import breitlingCollection = require("./data/collections/breitling-collection.json");

import ironManAsset = require("./data/assets/marvel/iron-man.json");
import breaitlingAsset = require("./data/assets/breitling/breitling-watch1.json");

import delay from "delay";
import faker from "faker";

import { FillScript } from "./scripts/FillScript";
import { setupScript } from "./setup";

export const main = async () => {
	setupScript();

	// const scriptType = new FillScript();
	//
	// console.log("Create collections");
	// await scriptType.createCollections(1, 5, fifaCollection);
	//
	// await delay(8000);
	//
	// console.log("Create assets");
	// await scriptType.createAssets(1, 5, 3, {
	// 	attributes: {
	// 		name: faker.name.findName(),
	// 		pac: faker.random.number({ max: 100, min: 1 }),
	// 		sho: faker.random.number({ max: 100, min: 1 }),
	// 		pas: faker.random.number({ max: 100, min: 1 }),
	// 		dri: faker.random.number({ max: 100, min: 1 }),
	// 		def: faker.random.number({ max: 100, min: 1 }),
	// 		phy: faker.random.number({ max: 100, min: 1 }),
	// 	},
	// });
	//
	// await delay(8000);
	//
	// console.log("Create auctions");
	// await scriptType.createAuctions(2, 4);
	//
	// await delay(8000);
	//
	// console.log("Create bids");
	// await scriptType.createBids(10, 2);
	//
	// await delay(8000);
	//
	// console.log("Create trades");
	// await scriptType.createTrades();

	// const fillScriptMarvelCollection = new FillScript();
	//
	// console.log("Create marvel collections");
	// await fillScriptMarvelCollection.createCollections(1, 5, marvelCollection);
	// await delay(8000);
	//
	// console.log("Create Iron Man assets");
	// await fillScriptMarvelCollection.createAssets(1, 5, 3, {
	// 	attributes: ironManAsset,
	// });
	//
	// await delay(8000);
	//
	// console.log("Create auctions");
	// await fillScriptMarvelCollection.createAuctions(2, 4);
	//
	// await delay(8000);
	//
	// console.log("Create bids");
	// await fillScriptMarvelCollection.createBids(10, 2);
	//
	// await delay(8000);
	//
	// console.log("Create trades");
	// await fillScriptMarvelCollection.createTrades();

	const fillScriptBreitlingCollection = new FillScript();

	console.log("Create breitling collections");
	await fillScriptBreitlingCollection.createCollections(1, 5, breitlingCollection);
	await delay(8000);

	console.log("Create watch assets");
	await fillScriptBreitlingCollection.createAssets(1, 5, 3, {
		attributes: breaitlingAsset,
	});

	await delay(8000);

	console.log("Create auctions");
	await fillScriptBreitlingCollection.createAuctions(2, 4);

	await delay(8000);

	console.log("Create bids");
	await fillScriptBreitlingCollection.createBids(10, 2);

	await delay(8000);

	console.log("Create trades");
	await fillScriptBreitlingCollection.createTrades();
};
