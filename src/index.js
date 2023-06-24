import readline from 'readline';
import os from 'os';
import { upToFolder } from './up.js';
import { outputFileList } from './ls.js';
import { changeDir } from './cd.js';
import { readAndPrintFileContent } from './cat.js';
import { createEmptyFile } from './add.js';
import { renameFile } from './rn.js';
import { copyFile } from './cp.js';
import { moveFile } from './mv.js';
import { calculateFileHash } from './hash.js'
import { compressFile } from './compress.js';
import { decompressFile } from './decompress.js';
import { getOperationInfo } from './os.js'

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

		rl.on('line', async (line) => {
			const [command, ...args] = line.trim().split(' ');

			switch (command) {
				case 'up':
					workingDirectory = upToFolder(workingDirectory);
					break;
				case 'ls':
					await outputFileList(workingDirectory);
					break;
				case 'cd':
					workingDirectory = await changeDir(args[0], workingDirectory);
					break;
				case 'cat':
					await readAndPrintFileContent(args[0], workingDirectory);
					break;
				case 'add':
					await createEmptyFile(args[0], workingDirectory);
					break;
				case 'rn':
					await renameFile(args[0], args[1], workingDirectory);
					break;
				case 'cp':
					await copyFile(args[0], args[1], workingDirectory);
					break;
				case 'mv':
					await moveFile(args[0], args[1], workingDirectory);
					break;
				case 'rm':
					await removeFile(args[0], workingDirectory);
					break;
				case 'hash':
					await calculateFileHash(args[0], workingDirectory);
					break;
				case 'compress':
					await compressFile(args[0], args[1], workingDirectory);
					break;
				case 'decompress':
					await decompressFile(args[0], args[1], workingDirectory);
					break;
				case 'os':
					await getOperationInfo(args[0], workingDirectory);
					break;
				case '.exit':
					rl.close();
					break;
				default:
					console.log('Invalid input');
					break;
			}
		});

		rl.on('close', () => {
			console.log(`Thank you for using File Manager, ${username}, goodbye!`);
			process.exit(0);
		});
	} catch (err) {
		console.log('Operation failed');
	}
};

await launchFileManager();
