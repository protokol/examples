import fifaCollection = require("./data/collections/fifa-collection.json");

import delay from "delay";
import faker from "faker";

import { setupScript } from "./setup";
import { FillScript } from "./scripts/FillScript";

export const main = async () => {
	setupScript();

	const scriptType = new FillScript();

	console.log("Create collections");
	await scriptType.createCollections(1, 5, fifaCollection);

	await delay(8000);

	console.log("Create assets");
	await scriptType.createAssets(1, 5, 3, {
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
	await scriptType.createAuctions(2, 4);

	await delay(8000);

	console.log("Create bids");
	await scriptType.createBids(10, 2);

	await delay(8000);

	console.log("Create trades");
	await scriptType.createTrades(scriptType.auctionBids.length);
};
