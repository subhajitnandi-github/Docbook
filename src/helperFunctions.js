import _ from 'lodash'

export const capitalizeTitle = title => {
	let newWord = []
	for (let word of title.split(' ')) {
		newWord.push(_.capitalize(word))
	}
	return newWord.join(' ')
}
