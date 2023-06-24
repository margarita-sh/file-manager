import fs from 'fs';
import path from 'path';

const moveFile = (sourceFilePath, destinationDirPath, workingDirectory) => {
	const readPath = path.resolve(workingDirectory, sourceFilePath);
	const writePath = path.resolve(workingDirectory, destinationDirPath, path.basename(sourceFilePath));

	const sourceStream = fs.createReadStream(readPath);
	const destinationStream = fs.createWriteStream(writePath);

	sourceStream.on('error', (err) => {
		console.log('Operation failed');
	});

	destinationStream.on('error', (err) => {
		console.log('Operation failed');
	});

	destinationStream.on('finish', () => {
		fs.unlink(readPath, (err) => {
			if (err) {
				console.log('Operation failed');
			} else {
				console.log('Source file deleted.');
			}
		});
		console.log(`You are currently in ${workingDirectory}`);
	});

	sourceStream.pipe(destinationStream);
};

export { moveFile };
