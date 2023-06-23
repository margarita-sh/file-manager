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
		const sortedTable = table.sort((a, b) => {
			if (a.Type === 'Directory' && b.Type !== 'Directory') {
				return -1; // 'a' is a directory, 'b' is not, so 'a' comes first
			} else if (a.Type !== 'Directory' && b.Type === 'Directory') {
				return 1; // 'b' is a directory, 'a' is not, so 'b' comes first
			} else {
				return a.Name.localeCompare(b.Name); // sort by Name
			}
		})
		console.table(sortedTable);
		console.log(`You are currently in ${directoryPath}`);
	} catch (err) {
		console.log('Operation failed');
	}
}

export { outputFileList };
