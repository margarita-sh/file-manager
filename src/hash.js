import fs from 'fs';
import crypto from 'crypto';
const calculateFileHash = (path, workingDirectory) => {
	const hash = crypto.createHash('sha256');

	const readStream = fs.createReadStream(path);

	readStream.on('data', (chunk) => {
		hash.update(chunk);
	  });
	
	  readStream.on('end', () => {
		const fileHash = hash.digest('hex');
		console.log(`File Hash is ${fileHash}`);
		console.log(`You are currently in ${workingDirectory}`);
	  });
	
	  readStream.on('error', (error) => {
		console.log('Operation failed');
	  });
}
export {calculateFileHash}


