import fifaCollection = require("./data/collections/fifa-collection.json");
import marvelCollection = require("./data/collections/marvel-collection.json");
import breitlingCollection = require("./data/collections/breitling-collection.json");
import nascarCollection = require("./data/collections/nascar-collection.json");
import IWCCollection = require("./data/collections/iwc-collection.json");
import nascarTeamCollection = require("./data/collections/nascar-team-collection.json");

import ironManAsset = require("./data/assets/marvel/iron-man.json");
import breaitlingAsset = require("./data/assets/breitling/breitling-watch1.json");
import nascarAsset = require("./data/assets/nascar/driver1.json");
import IWCAsset = require("./data/assets/iwc/iwc-watch1.json");

// Nascar teams
import nascarTeam1 = require("./data/assets/nascar-team/chip-ganassi-team.json");
import nascarTeam2 = require("./data/assets/nascar-team/front-row-motosports-team.json");
import nascarTeam3 = require("./data/assets/nascar-team/gaunt-brothers-team.json");
import nascarTeam4 = require("./data/assets/nascar-team/germain-team.json");
import nascarTeam5 = require("./data/assets/nascar-team/go-fas.json");

import { ProtokolConnection } from "@protokol/client";
import { ARKCrypto } from "@protokol/nft-base-crypto";
import chalk from "chalk";
import delay from "delay";
import faker from "faker";

import { configurations } from "./configurations";
import { DelegateScript } from "./scripts/DelegateScript";
import { FillScript } from "./scripts/FillScript";
import { ShareCoinsScript } from "./scripts/ShareCoinsScript";
import { setupScript } from "./setup";

export const main = async () => {
	/** Setup the script - registering transaction types and network settings */
	console.log(chalk.blue("Setup script"));
	await setupScript();

	const scriptType = new FillScript(configurations.passphrasesFile.secrets);
	console.log(scriptType.mainPassphrase);

	console.log(chalk.green("Create FIFA collections"));
	/**
	 *	The first argument is number of batches you want to create
	 *	The second argument is numberOfTransactionsPerBatch I suggest that you don't put over
	 *	40 transactions per batch since the default number is 40 in core
	 *	The third argument is the collection asset
	 */
	await scriptType.createCollections(1, 1, () => fifaCollection);

	await delay(8000);

	console.log(chalk.green("Create FIFA assets"));
	/**
	 *  The first argument is number of batches
	 *  The second argument is number of transactionsPerBatch
	 *	The third argument is number of collections used, it takes of an example first three collections
	 * 	you created in first par of the script and makes that many batches of transactions for each
	 */
	await scriptType.createAssets(3, 40, 1, () => {
		return {
			name: faker.name.findName(),
			pac: faker.random.number({ max: 100, min: 1 }),
			sho: faker.random.number({ max: 100, min: 1 }),
			pas: faker.random.number({ max: 100, min: 1 }),
			dri: faker.random.number({ max: 100, min: 1 }),
			def: faker.random.number({ max: 100, min: 1 }),
			phy: faker.random.number({ max: 100, min: 1 }),
		};
	});

	await delay(8000);

	console.log(chalk.green("Create FIFA auctions"));
	/**
	 * The first argument is assetsPerAuction, it is the number of assets you want to put
	 * inside the each auction, make sure there are enough of assets created in the previous
	 * part of the script
	 * The second argument is the number of transactions you want to create
	 * */
	await scriptType.createAuctions(4, 10);

	await delay(8000);

	console.log(chalk.green("Create FIFA bids"));
	/**
	 * The first argument is number of bids you want to create for each auction you created in previous
	 * part of the script
	 * The second argument is the number of auctions you want to bid to, make sure you created enough of them in
	 * previous part of the script
	 * */
	await scriptType.createBids(15, 10);

	await delay(8000);

	console.log(chalk.green("Create FIFA trades"));
	/**
	 * Creates trades for each auction
	 * */
	await scriptType.createTrades();

	await delay(8000);

	/** Marvel collection fill script */
	const fillScriptMarvelCollection = new FillScript(configurations.passphrasesFile.secrets);

	console.log(chalk.green("Create Marvel collections"));
	await fillScriptMarvelCollection.createCollections(1, 1, () => marvelCollection);
	await delay(8000);

	console.log(chalk.green("Create Iron Man assets"));
	await fillScriptMarvelCollection.createAssets(2, 40, 1, () => ironManAsset);

	await delay(8000);

	console.log(chalk.green("Create Marvel auctions"));
	await fillScriptMarvelCollection.createAuctions(2, 10);

	await delay(8000);

	console.log(chalk.green("Create Marvel bids"));
	await fillScriptMarvelCollection.createBids(10, 8);

	await delay(8000);

	console.log(chalk.green("Create Marvel trades"));
	await fillScriptMarvelCollection.createTrades();

	await delay(8000);

	/** Breitling collection fill script */

	const fillScriptBreitlingCollection = new FillScript(configurations.passphrasesFile.secrets);

	console.log(chalk.green("Create Breitling collections"));
	await fillScriptBreitlingCollection.createCollections(1, 1, () => breitlingCollection);
	await delay(8000);

	console.log(chalk.green("Create Breitling watch assets"));
	await fillScriptBreitlingCollection.createAssets(2, 40, 1, () => breaitlingAsset);

	await delay(8000);

	console.log(chalk.green("Create Breitling auctions"));
	await fillScriptBreitlingCollection.createAuctions(2, 12);

	await delay(8000);

	console.log(chalk.green("Create Breitling bids"));
	await fillScriptBreitlingCollection.createBids(15, 5);

	await delay(8000);

	console.log(chalk.green("Create Breitling trades"));
	await fillScriptBreitlingCollection.createTrades();

	await delay(8000);

	/** Nascar collection fill script */

	const fillScriptNascarCollection = new FillScript(configurations.passphrasesFile.secrets);

	console.log(chalk.green("Create Nascar collections"));
	await fillScriptNascarCollection.createCollections(1, 1, () => nascarCollection);
	await delay(8000);

	console.log(chalk.green("Create Nascar assets"));
	await fillScriptNascarCollection.createAssets(2, 40, 1, () => nascarAsset);

	await delay(8000);

	console.log(chalk.green("Create Nascar auctions"));
	await fillScriptNascarCollection.createAuctions(2, 15);

	await delay(8000);

	console.log(chalk.green("Create Nascar bids"));
	await fillScriptNascarCollection.createBids(15, 5);

	await delay(8000);

	console.log(chalk.green("Create Nascar trades"));
	await fillScriptNascarCollection.createTrades();

	await delay(8000);

	/** IWC collection fill script */

	const fillScriptIWCCollection = new FillScript(configurations.passphrasesFile.secrets);

	console.log(chalk.green("Create IWC collections"));
	await fillScriptIWCCollection.createCollections(1, 1, () => IWCCollection);
	await delay(8000);

	console.log(chalk.green("Create IWC assets"));
	await fillScriptIWCCollection.createAssets(2, 40, 1, () => IWCAsset);

	await delay(8000);

	console.log(chalk.green("Create IWC auctions"));
	await fillScriptIWCCollection.createAuctions(2, 13);

	await delay(8000);

	console.log(chalk.green("Create IWC bids"));
	await fillScriptIWCCollection.createBids(15, 8);

	await delay(8000);

	console.log(chalk.green("Create IWC trades"));
	await fillScriptIWCCollection.createTrades();

	await delay(8000);

	/** Nascar team fill script */
	const nascarTeamScriptType = new FillScript(configurations.passphrasesFile.secrets);

	console.log(chalk.green("Create Nascar Team collection"));
	await nascarTeamScriptType.createCollections(1, 1, () => {
		return nascarTeamCollection;
	});

	await delay(8000);

	console.log(chalk.green("Create Nascar Team assets"));
	await nascarTeamScriptType.createAssets(3, 40, 1, () => {
		return [nascarTeam1, nascarTeam2, nascarTeam3, nascarTeam4, nascarTeam5][
			faker.random.number({ max: 4, min: 0 })
		];
	});

	await delay(8000);

	console.log(chalk.green("Create Nascar Team auctions"));
	await nascarTeamScriptType.createAuctions(2, 17);

	await delay(8000);

	console.log(chalk.green("Create Nascar Team bids"));
	await nascarTeamScriptType.createBids(13, 10);

	await delay(8000);

	console.log(chalk.green("Create Nascar Team trades"));
	await nascarTeamScriptType.createTrades();
};
