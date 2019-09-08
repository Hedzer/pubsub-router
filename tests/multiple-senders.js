

import test from 'ava';

import Router from '../dist/index';

test('multiple senders', async t => {
	const router = new Router();

	let results = new Map();
	results.set('sender1', undefined);
	results.set('sender2', undefined);
	results.set('TEST1', undefined);
	results.set('TEST2', undefined);

	let finished = new Promise((resolve, reject) => {

		router
			.receive
			.post('/multiple/:type')
			.respond((request) => request.data);

		router
			.send
			.post('/multiple/sender1')
			.request('TEST1')
			.receive((res) => {
				results.set(res.data, true);
				results.set(res.params.type, true);
			});

		router
			.send
			.post('/multiple/sender2')
			.request('TEST2')
			.receive((res) => {
				results.set(res.data, true);
				results.set(res.params.type, true);
			});

		setTimeout(() => resolve(results), 100);
	});
	(await finished).forEach(r => t.truthy(r));
});