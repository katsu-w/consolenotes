const http = require('http');
const chalk = require('chalk');

const port = 3000;

const server = http.createServer((req, res) => {
	console.log('res obj', res);
	
	res.end('hello world!');
})

server.listen(port, () => {
	console.log(chalk.green('Server listening on port ' + port));
});