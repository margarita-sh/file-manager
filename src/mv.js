import fs from 'fs';
import path from 'path';

const moveFile = (sourceFilePath, destinationDirPath, workingDirectory) => {

	const destinationFilePath = path.join(destinationDirPath, path.basename(sourceFilePath));

	const sourceStream = fs.createReadStream(sourceFilePath);
	const destinationStream = fs.createWriteStream(destinationFilePath);

	sourceStream.on('error', (err) => {
		console.log('Operation failed', err);
	});

	destinationStream.on('error', (err) => {
		console.log('Operation failed');
	});

	destinationStream.on('finish', () => {
		fs.unlink(sourceFilePath, (err) => {
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
