var Migrations = artifacts.require("./Migrations.sol");

module.exports = function (deployer) {
	deployer.deploy(Migrations);
};


api.post('/progress', (req, res) => {
	let progress = new Progress();
	progress.user_id = req.body.user_id;
	progress.level = req.body.level;
	progress.iconName = req.body.iconName;
	progress.category_id = req.body.category_id;

	progress.save(function (err) {
		if (err) {
			res.send(err);
		}
		res.json({
			message: 'progress saved!'
		});

	});
});
