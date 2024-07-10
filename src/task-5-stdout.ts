const fs = require('node:fs/promises');
const path = require('path');

(async () => {
	const dirPath = process.argv[2] || '.';

	try {
		const files = await fs.readdir(dirPath);
		const res: {[key: string]: string} = {}

		for (const file of files) {
			const filePath = path.join(dirPath, file);
			const stats = await fs.stat(filePath);

			res[file] = `owner=${stats.uid}` +
				", " + `size=${stats.size}` +
				", " + `perm=${stats.mode}` +
				", " + `mod=${stats.mtime.toISOString().slice(0, 10)}`;
		}

		process.stdout.write(JSON.stringify(res, null, 1));
	} catch (e: unknown) {
		if (e instanceof Error && 'code' in e && e.code === 'ENOENT') {
			return console.error(`dir "${dirPath}" not found`);
		}
		console.error(e)
	}
})()
