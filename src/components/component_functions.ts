
/**
 * @returns The hex color corresponding to the given temperature
 * 
 * @param temperature - The object temperature
 * @param element - Choice of color between 'background' or 'border'
 * 
 * @example
 * returns '#cf2525' for temperature = 70 and element = 'border'
 * ```ts
 * console.log(currentColor(70, 'border'))
 * ```
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator}
*/
export default function currentColor(temperature: number, element: string): string {

	if (temperature > 60) {
		return element === 'background' ? '#cf252588' : '#cf2525'
	}
	if (temperature > 50) {
		return element === 'background' ? '#cf502588' : '#cf5025'
	}
	if (temperature > 40) {
		return element === 'background' ? '#cf942588' : '#cf9425'
	}
	if (temperature > 30) {
		return element === 'background' ? '#cfcc2588' : '#cfcc25'
	}
	if (temperature > 20) {
		return element === 'background' ? '#7dcf2588' : '#7dcf25'
	}
	if (temperature > 10) {
		return element === 'background' ? '#25cf2588' : '#25cf25'
	}
	return element === 'background' ? '#25cfb088' : '#25cfb0'
}