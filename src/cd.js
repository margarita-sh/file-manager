import path from 'path';
import fs from 'fs';

const changeDir = (dirName, workingDirectory) => {
	const currentDirectory = path.resolve(workingDirectory, dirName);
	const isDirExist = fs.existsSync(currentDirectory); //fs.exists() is deprecated, but fs.existsSync() is not
	if (isDirExist) {
		console.log(`You are currently in ${currentDirectory}`);
		return currentDirectory;
	}
	console.log(`Sorry, there is no this directory ${currentDirectory}`);
	console.log(`You are currently in ${workingDirectory}`);
	return workingDirectory;
}

export { changeDir };