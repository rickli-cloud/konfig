export function getCookies(): { [x: string]: string | undefined } {
	return Object.fromEntries(document.cookie.split(/;/g).map((i) => i.trim().split(/=/)));
}
