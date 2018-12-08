const serverDbUrl = 'http://127.0.0.1:3000';
const serverBlockUrl = 'https://ibmhackblockchain.now.sh';

export class fetchModule {
	static _ajax ({ useUrl='db', method = 'GET', path = '/', body, headers } = {}) {
		let theUrl = "";
		if (useUrl === 'db'){
			theUrl = serverBlockUrl;
		} else if ( useUrl === 'block'){
			theUrl = serverDbUrl;
		}

		const url = theUrl + path;

		const options = {
			mode: 'cors',
			// credentials: 'false',
			method: method,
			headers: {}
		};
		if (headers) {
			options.headers = headers;
		}

		if (body) {
			console.log("body: ", body);
			options.headers['Content-Type'] = 'application/json; charset=utf-8' ;
			options.body = JSON.stringify(body);
		}
		return fetch(url, options);
	}

	static doGet (params = {}) {
		return this._ajax({ ...params, method: 'GET' });
	}

	static doPost (params = {}) {
		console.log("do post ", params);
		return this._ajax({ ...params, method: 'POST' });
	}

	static doDelete (params = {}) {
		return this._ajax({ ...params, method: 'DELETE' });
	}

	static doPut (params = {}) {
		return this._ajax({ ...params, method: 'PUT' });
	}
	static doPatch (params = {}) {
		return this._ajax({ ...params, method: 'PATCH' });
	}
}
