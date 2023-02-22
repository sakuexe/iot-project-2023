
export default function currentColor(temperature: number, element: string) {

	console.log(temperature, element)
	if (temperature > 60) {
		return element === 'background' ? '#cf252588' : '#cf2525'
	}
	if (temperature > 40) {
		return element === 'background' ? '#cf942588' : '#cf9425'
	}
	if (temperature > 20) {
		return element === 'background' ? '#7dcf2588' : '#7dcf25'
	}
	return element === 'background' ? '#25cfb088' : '#25cfb0'
}