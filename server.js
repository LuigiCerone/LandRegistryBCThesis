const express = require('express');
const app = express();
const PORT = 3000;

//Serve static assets (js, css, ...)
app.use(express.static('app/'));
app.use(express.static('dist/'));

//Serve contract artifact files (ex: ToDo.json)
app.use(express.static('build/contracts'));

//Serve index.html
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/dist/index.html');
});

//If anything else is requested that's an error
app.get('*', (req, res) => {
	res.status(404);
	res.send('Oops... this URL does not exist');
});

//Start the server
app.listen(PORT, () => {
	console.log(`Ethereum app running on port ${PORT}...`);
});
