export function pad(num: number): string {
	return num < 10 ? '0' + num : String(num)
}

export function getHeight(el: HTMLElement): number {
	let height = el.offsetHeight
	let css = window.getComputedStyle(el, null)
	let top = parseFloat(css.getPropertyValue('margin-top'))
	let bottom = parseFloat(css.getPropertyValue('margin-bottom'))

	return height + top + bottom
}

export function formatTimestamp(timestamp: number): string {
	let date = new Date(timestamp * 1000)
	return date.getFullYear() + '.' +
		pad(date.getMonth() + 1) + '.' +
		pad(date.getDate()) + ' ' +
		pad(date.getHours()) + ':' +
		pad(date.getMinutes())
}

export function formatPhone(p: string | number): string {
	if (!p) return ''
	let digits = String(p).replace(/\D/g, '')
	return `+1 (${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6,10)}`
}

export function formatMail(mail: string): string {
	if (!mail) return ''
	if (mail.length < 25) return mail
	return mail.substring(0, 25) + '…'
}
