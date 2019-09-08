

import test from 'ava';

import Router from '../dist/index';

test('multiple responders', async t => {
	const router = new Router();

	let results = new Map();
	results.set('/multiple/responders', false);
	results.set('/multiple/:type', false);

	let finished = new Promise((resolve, reject) => {

		router
			.receive
			.post('/multiple/responders')
			.respond((request) => request.data);

		router
			.receive
			.post('/multiple/:type')
			.respond((request) => request.data);

		router
			.send
			.post('/multiple/responders')
			.request('TEST')
			.receive((res) => {
				results.set(res.route, true);
				switch (res.route) {
					case '/multiple/responders':
						t.is(res.data, 'TEST');
						break;

					case '/multiple/:type':
						t.deepEqual(res.params, { type: 'responders'});
						t.is(res.data, 'TEST');
						break;
						
					default:
						reject();
						break;
				}
				resolve(results);
			});
			
		setTimeout(reject, 5000);
	});
	(await finished).forEach(r => t.truthy(r));
});