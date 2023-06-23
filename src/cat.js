import path from 'path';
import fs from 'fs';

const readAndPrintFileContent = (fileName, workingDirectory) => {
	const filePath = path.resolve(workingDirectory, fileName);
	const readableStream = fs.createReadStream(filePath, { encoding: 'utf-8' });
	readableStream.on('data', (chunk) => {
		process.stdout.write(chunk);
	});

	readableStream.on('end', () => {
		console.log(`\nYou are currently in ${workingDirectory}`);
	});

	readableStream.on('error', (err) => {
		console.error('Error reading file:', err);
	});

};
export { readAndPrintFileContent };