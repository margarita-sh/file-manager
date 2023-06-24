import fs from 'fs';
import path from 'path';

const copyFile = (sourceFilePath, destinationDirPath, workingDirectory) => {
	const readPath = path.resolve(workingDirectory, sourceFilePath);
	const writePath = path.resolve(workingDirectory, destinationDirPath, path.basename(sourceFilePath));

	const sourceStream = fs.createReadStream(readPath);
	const destinationStream = fs.createWriteStream(writePath);

	sourceStream.pipe(destinationStream);

	sourceStream.on('error', (err) => {
		console.log('Operation failed');
	});

	destinationStream.on('error', (err) => {
		console.log('Operation failed');
	});

	destinationStream.on('finish', () => {
		console.log(`Filed has been copied successfully!`);
		console.log(`You are currently in ${workingDirectory}`);
	});
};

export { copyFile };
