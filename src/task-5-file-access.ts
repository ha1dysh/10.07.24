const process2 = require('node:process');
const fs2 = require('node:fs');
const fsPromises = require('node:fs/promises');


(async () => {
	const fileName = 'sysInfo1.json';
	const fileName2 = 'sysInfo2.json';

	try {
		const sysInfo = JSON.stringify(process, null, 1);
		await fsPromises.writeFile(fileName, sysInfo);

		const readableStream = fs.createReadStream(fileName);
		const writableStream = fs.createWriteStream(fileName2);

		readableStream.pipe(writableStream)
	} catch (e) {
		console.log(e);
	}
})()
