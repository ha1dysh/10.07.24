// 2.Напишите функцию сжатия ключей коллекции объектов
// !Для упрощения, объекты могут быть только одноуровневыми!

const data2 = [
	{ "varyLoooongIDFieldName": 1, "extremelyLooooooooooooongActiveFiedName": true },
	{ "varyLoooongIDFieldName": 2, "extremelyLooooooooooooongActiveFiedName": false },
	{ "varyLoooongIDFieldName": 3, "extremelyLooooooooooooongActiveFiedName": true },
	{ "varyLoooongIDFieldName": 4, "extremelyLooooooooooooongActiveFiedName": false },
	{ "varyLoooongIDFieldName": 5, "extremelyLooooooooooooongActiveFiedName": false },
	{ "varyLoooongIDFieldName": 6, "extremelyLooooooooooooongActiveFiedName": false },
	{ "varyLoooongIDFieldName": 7, "extremelyLooooooooooooongActiveFiedName": true },
	{ "varyLoooongIDFieldName": 8, "extremelyLooooooooooooongActiveFiedName": true },
	{ "varyLoooongIDFieldName": 9, "extremelyLooooooooooooongActiveFiedName": true },
	{ "varyLoooongIDFieldName": 10, "extremelyLooooooooooooongActiveFiedName": true }
]

function compress<T extends Record<string, unknown>>(data: T[]): [string[], [number, unknown][]] {
	const res: [string[], [number, unknown][]] = [Object.keys(data[0]), []]

	for (let i = 0; i < data.length; i++) {
		const obj = data[i]
		let keyIndex: number = 0

		for (const key in obj) {
			const value = obj[key]
			res[1].push([keyIndex, value])
			keyIndex++
		}

		keyIndex = 0
	}

	return  res;
}

console.log(compress(data2));
// [
//   ["varyLoooongIDFieldName","extremelyLooooooooooooongActiveFiedName"],
//	 [
//		 [[0,1],[1,true]],
// 		 [[0,2],[1,false]],
//		 [[0,3],[1,true]],
// 		 [[0,4],[1,false]],
//		 [[0,5],[1,false]],
//		 [[0,6],[1,false]],
//		 [[0,7],[1,true]],
//		 [[0,8],[1,true]],
//		 [[0,9],[1,true]],
//	 	 [[0,10],[1,true]]
//	 ]
// ]
