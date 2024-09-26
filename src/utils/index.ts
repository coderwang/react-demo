export function queryParse<T = Record<string, string>>(url = location.href): T {
	const queryString = url.split('?')[1];
	if (!queryString) return {} as T;

	const params: Record<string, string> = {};
	queryString.split('&').forEach((param) => {
		const [key, value] = param.split('=');
		if (key) {
			params[decodeURIComponent(key)] = decodeURIComponent(value || '');
		}
	});

	return params as T;
}
