import passphrases = require("./data/networks/delegates.json");

export const configurations = {
	clientHost: "https://proto-devnet.protokol.sh/api",
	passphrasesFile: passphrases,
	delay: 8000,
};
