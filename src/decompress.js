import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

const decompressFile = (sourceFilePath, destinationDirPath, workingDirectory) => {
	const readPath = path.resolve(workingDirectory, sourceFilePath);
	const writePath = path.resolve(workingDirectory, destinationDirPath, path.basename(sourceFilePath))
	const readStream = fs.createReadStream(readPath);
	const writeStream = fs.createWriteStream(writePath);

	const brotli = zlib.createBrotliDecompress();

	const stream = readStream.pipe(brotli).pipe(writeStream);

	stream.on('finish', () => {
		console.log('Done decompressing 😎');
		console.log(`You are currently in ${workingDirectory}`);
	});
}

export { decompressFile };