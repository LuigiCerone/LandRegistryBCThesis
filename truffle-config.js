module.exports = {
	// See <http://truffleframework.com/docs/advanced/configuration>
	// for more about customizing your Truffle configuration!
	networks: {
    // When using the development network connect to 127.0.0.1:7545.
		development: {
			host: "127.0.0.1",
			port: 7545,
			network_id: "*" // Match any network id
		}
	}
};
