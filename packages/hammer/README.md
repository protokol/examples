[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

# Hammer

A Protokol module providing test script to fill up the blockchain.

## Usage instructions
The purpose of this module is to fill the blockchain with various types of data.
Here are some basic instructions to make the script work.

### Usage instructions via command line
```sh
yarn node dist/index put passphrase here
```
### Usage instructions via code
First you have to setup the script.
Set up the configurations inside - `configurations.ts`
```ts
export const configurations = {
	clientHost: "http://localhost:4003/api",
	network: "testnet",
	networkHeight: 2,
};
```
and run this part of the script
```ts
setupScript();
```
Second you must initialize the script object
```ts
const scriptType = new FillScript();
```
Now you can start using the fillScript methods which are implemented for filling the chain with NFT Transactions
```ts
await scriptType.createCollections(1, 5, () => fifaCollection);

await scriptType.createAssets(1, 5, 3, () => {
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

await scriptType.createAuctions(2, 4);

await scriptType.createBids(10, 2);

await scriptType.createTrades();
```

To learn more about what each methods does check the comments inside `script.ts` file
# License

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

This work is licensed under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/), under the following terms:

#### Attribution

You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

#### NonCommercial

You may not use the material for commercial purposes. For commercial purposes please reach out to info@protokol.com.

#### ShareAlike

If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.

#### Legal code

Read the rest of the obligatory [license legal code](https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode).

Copyright (c) Protokol.com 2020
