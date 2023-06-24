import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

const compressFile = (sourceFilePath, destinationDirPath, workingDirectory) => {
	const destinationFilePath = path.join(destinationDirPath, path.basename(sourceFilePath));
	const readStream = fs.createReadStream(sourceFilePath);
	const writeStream = fs.createWriteStream(destinationFilePath);

	const brotli = zlib.createBrotliCompress();

	const stream = readStream.pipe(brotli).pipe(writeStream);

	stream.on('finish', () => {
		console.log('Done compressing 😎');
		console.log(`You are currently in ${workingDirectory}`);
	});
}

export { compressFile };