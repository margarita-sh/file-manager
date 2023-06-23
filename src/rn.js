
import { rename } from 'node:fs/promises';
import path from 'path';

const renameFile = async (oldFileName, newFileName, workingDirectory) => {

	const oldDirectory = path.resolve(workingDirectory, oldFileName);
	const newDirectory = path.resolve(workingDirectory, newFileName);
	
	try {
	  await rename(oldDirectory, newDirectory);
	  console.log(`\nYou are currently in ${workingDirectory}`);
	} catch (error) {
	  console.error('there was an error:', error.message);
	}
	
};

export {renameFile};