async function importJSON(consumerFun) {
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = 'application/json';

	input.addEventListener('change', async (event) => {
		const file = event.target.files[0];
		if (!file) return;

		try {
			const jsonData = await readFile(file);
			consumerFun(jsonData);
		} catch (error) {
			console.error('Error importing JSON:', error);
			alert('Error importing JSON: ' + error.message);
		}
	});

	input.click();
}

function readFile(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = (event) => {
			resolve(event.target.result);
		};

		reader.onerror = (event) => {
			reject(new Error('Error reading the file.'));
		};

		reader.readAsText(file);
	});
}

export { importJSON };
