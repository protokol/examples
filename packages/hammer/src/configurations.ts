import passphrases = require("./data/networks/delegates.json");

export const configurations = {
	clientHost: "https://devnet-explorer.protokol.sh/api",
	passphrasesFile: passphrases,
	delayTime: 8000,
};
