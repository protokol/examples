import testnetPassphrases = require("./data/passphrases/protokol-devnet-passphrases.json");

export const configurations = {
	clientHost: "https://devnet-explorer.protokol.sh/api",
	network: "devnet",
	networkHeight: 2,
	passphrasesFile: testnetPassphrases,
	// protokol devnet - networks can be empty and it will take default configurations
	// TODO
	// networkConfigurations: {
	// 	exceptionsUrl:
	// 		"https://raw.githubusercontent.com/protokol/network-configurations/master/networks/protokol/devnet/crypto/exceptions.json",
	// 	milestonesUrl:
	// 		"https://raw.githubusercontent.com/protokol/network-configurations/master/networks/protokol/devnet/crypto/milestones.json",
	// 	networkUrl:
	// 		"https://raw.githubusercontent.com/protokol/network-configurations/master/networks/protokol/devnet/crypto/network.json",
	// },
};
