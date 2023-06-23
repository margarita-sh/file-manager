import fs from 'fs';
import path from 'path';

const outputFileList = async (directoryPath) => {
	try {
		const files = await fs.promises.readdir(directoryPath);
		const table = [];

		for (const file of files) {
			const filePath = path.join(directoryPath, file);
			const fileStats = await fs.promises.stat(filePath);
			const fileSize = fileStats.isDirectory() ? '-' : fileStats.size + ' B';
			const fileType = fileStats.isDirectory() ? 'Directory' : 'File';
			table.push({ Name: file, Size: fileSize, Type: fileType });
		}
		console.table(table);
		console.log(`You are currently in ${directoryPath}`);
	} catch (err) {
		console.log('Operation failed');
	}
}

export { outputFileList };
