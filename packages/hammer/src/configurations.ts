import passphrase = require("./data/passphrases/protokol-devnet-passphrases.json");

export const configurations = {
	clientHost: "https://proto-devnet.protokol.sh/api",
	passphrasesFile: passphrase,
	delay: 8000,
};
