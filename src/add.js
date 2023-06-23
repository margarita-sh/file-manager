import fs from 'fs';
import path from 'path';

const createEmptyFile = (fileName, workingDirectory) => {
	const filePath = path.resolve(workingDirectory, fileName);
	fs.createWriteStream(filePath);
	console.log(`\nYou are currently in ${workingDirectory}`);
}
export {createEmptyFile};