

import test from 'ava';

import Router from '../dist/index';

test('multiple senders', async t => {
	const router = new Router();

	let results = new Map();
	results.set('TEST1 type:sender1', undefined);
	results.set('TEST1 section:multiple, type:sender1', undefined);

	results.set('TEST2 type:sender2', undefined);
	results.set('TEST2 section:multiple, type:sender2', undefined);

	let finished = new Promise((resolve, reject) => {

		router
			.receive
			.post('/multiple/:type')
			.respond((request) => request.data);

		router
			.receive
			.post('/*section/:type')
			.respond((request) => request.data);

		router
			.send
			.post('/multiple/sender1')
			.request('TEST1')
			.receive((res) => {
				let params = Object
					.entries(res.params)
					.sort((a, b) => a[0] > b[0])
					.reduce((a, c) => a ? `${a}, ${`${c[0]}:${c[1]}`}` : `${c[0]}:${c[1]}`, '');
				results.set(`${res.data} ${params}`, true);
			});

		router
			.send
			.post('/multiple/sender2')
			.request('TEST2')
			.receive((res) => {
				let params = Object
					.entries(res.params)
					.sort((a, b) => a[0] > b[0])
					.reduce((a, c) => a ? `${a}, ${`${c[0]}:${c[1]}`}` : `${c[0]}:${c[1]}`, '');
				results.set(`${res.data} ${params}`, true);
			});

		setTimeout(() => resolve(results), 100);
	});
	(await finished).forEach(r => t.truthy(r));
});