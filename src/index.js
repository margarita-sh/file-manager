import readline from 'readline';
import os from 'os';
import { upToFolder } from './up.js';
import { outputFileList } from './ls.js';

let workingDirectory = os.homedir();

const launchFileManager = async () => {
	try {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		const username = process.argv.find(a => a.startsWith('--username=')).split('=').pop();
		console.log(`Welcome to the File Manager, ${username}!`);
		console.log(`You are currently in ${workingDirectory}`);
		rl.on('line', (line) => {
			switch (line.trim()) {
				case 'up':
					workingDirectory = upToFolder(workingDirectory);
					break;
				case 'ls':
					outputFileList(workingDirectory);
					break;
				case '.exit':
					console.log(`Thank you for using File Manager, ${username}, goodbye!`)
					break;
				default:
					console.log(`Invalid input`);
					break;
			}
		}).on('close', () => {
			console.log(`Thank you for using File Manager, ${username}, goodbye!`);
			process.exit(0);
		});
	} catch (err) {
		console.log('Operation failed')
	}

}

await launchFileManager();


