import passphrases = require("./data/passphrases/protokol-devnet-passphrases.json");

export const configurations = {
	clientHost: "https://proto-devnet.protokol.sh/api",
	passphrasesFile: passphrases,
	delay: 8000,
};
