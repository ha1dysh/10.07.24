// 3.Напишите функцию которая восстанавливает сжатую коллекцию из задания 3
// !Для упрощения, объекты могут быть только одноуровневыми!

const compressedData = [
	["varyLoooongIDFieldName", "extremelyLooooooooooooongActiveFiedName"],
	[
		[[0, 1], [1, true]],
		[[0, 2], [1, false]],
		[[0, 3], [1, true]],
		[[0, 4], [1, false]],
		[[0, 5], [1, false]],
		[[0, 6], [1, false]],
		[[0, 7], [1, true]],
		[[0, 8], [1, true]],
		[[0, 9], [1, true]],
		[[0, 10], [1, true]]
	]
]

type TData = [string[], [number, unknown][][]]

function decompress<T>(data: T):{ [key: string]: unknown }[] {
	const [keysArr, valuesArr] = data as TData;
	const res = []

	for (const values of valuesArr) {
		const obj:  { [key: string]: unknown } = {};

		// console.log(values); // [[0,1],[1,true]]...
		for (const [keyIndex, objValue] of values) {
			// console.log(keyIndex); // 0 1...
			// console.log(objValue); // 1 true...
			const objKey = keysArr[keyIndex]
			// console.log(objKey); // keysArr[0] keysArr[1]...
			obj[objKey] = objValue
		}

		res.push(obj)
	}

	return res;
}

console.log(decompress(compressedData));
// [
// 	{ "varyLoooongIDFieldName": 1, "extremelyLooooooooooooongActiveFiedName": true },
// 	{ "varyLoooongIDFieldName": 2, "extremelyLooooooooooooongActiveFiedName": false },
// 	{ "varyLoooongIDFieldName": 3, "extremelyLooooooooooooongActiveFiedName": true },
// 	{ "varyLoooongIDFieldName": 4, "extremelyLooooooooooooongActiveFiedName": false },
// 	{ "varyLoooongIDFieldName": 5, "extremelyLooooooooooooongActiveFiedName": false },
// 	{ "varyLoooongIDFieldName": 6, "extremelyLooooooooooooongActiveFiedName": false },
// 	{ "varyLoooongIDFieldName": 7, "extremelyLooooooooooooongActiveFiedName": true },
// 	{ "varyLoooongIDFieldName": 8, "extremelyLooooooooooooongActiveFiedName": true },
// 	{ "varyLoooongIDFieldName": 9, "extremelyLooooooooooooongActiveFiedName": true },
// 	{ "varyLoooongIDFieldName": 10, "extremelyLooooooooooooongActiveFiedName": true }
// ]
