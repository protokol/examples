import testnetPassphrases = require("./data/networks/delegates.json");

export const configurations = {
	// clientHost: "http://localhost:5003/api",
	clientHost: "https://proto-devnet.protokol.sh/api",
	network: "devnet",
	networkHeight: 0,
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
