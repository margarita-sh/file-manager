import os from 'os';

const getOperationInfo = (command, workingDirectory) => {
	try {
		switch (command) {
			case '--EOL':
				console.log(os.EOL)
				break;
			case '--cpus':
				const numCPUs = os.cpus().length;
				console.log('SPUS number:', numCPUs);
				const spusInfo = [];
				os.cpus().forEach((cpu, index) => {
					const model = cpu.model;
					const speedMHz = cpu.speed;
					const speedGHz = (speedMHz / 1000).toFixed(2);
					spusInfo.push({
						CPU: index + 1,
						model,
						speedGHz
					})
				});
				console.table(spusInfo);
				break;
			case '--homedir':
				console.log(os.homedir());
				break;
			case '--username':
				console.log(os.userInfo().username);
				break;
			case '--architecture':
				console.log(os.arch());
				break;
			default:
				console.log('Invalid input');
				break;
		}
		console.log(`\nYou are currently in ${workingDirectory}`);
	} catch (err) {
		console.log('Operation failed');
	}
}
export { getOperationInfo };