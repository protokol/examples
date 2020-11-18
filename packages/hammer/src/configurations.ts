import testnetPassphrases = require("./data/passphrases/protokol-testnet-passphrases.json");

export const configurations = {
	clientHost: "https://testnet-explorer.protokol.sh/api",
	network: "testnet",
	networkHeight: 2,
	passphrasesFile: testnetPassphrases,
};
