import fs from 'fs';
import path from 'path';

const copyFile = (sourceFilePath, destinationDirPath, workingDirectory) => {

	const destinationFilePath = path.join(destinationDirPath, path.basename(sourceFilePath));

	const sourceStream = fs.createReadStream(sourceFilePath);
	const destinationStream = fs.createWriteStream(destinationFilePath);

	sourceStream.pipe(destinationStream);

	sourceStream.on('error', (err) => {
		console.log('Operation failed');
	});

	destinationStream.on('error', (err) => {
		console.log('Operation failed');
	});

	destinationStream.on('finish', () => {
		console.log(`You are currently in ${workingDirectory}`);
	});
};

export { copyFile };
