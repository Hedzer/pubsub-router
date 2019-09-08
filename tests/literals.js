

import test from 'ava';

import Router from '../dist/index';

test('literals', async t => {
	const router = new Router();
	let finished = new Promise((resolve, reject) => {
		router
			.receive
			.post('/example/echo')
			.respond((request) => request.data);

		router
			.send
			.post('/example/echo')
			.request('TEST')
			.receive((res) => resolve(res.data));

		setTimeout(reject, 5000);
	});

	t.is(await finished, 'TEST');
});


test('literals with url params', async t => {
	const router = new Router();
	let finished = new Promise((resolve, reject) => {
		router
			.receive
			.post('/example/echo?type=:type')
			.respond((request) => request.data);

		router
			.send
			.post('/example/echo?type=example')
			.request('TEST')
			.receive((res) => resolve(res));

		setTimeout(reject, 5000);
	});

	let received = await finished;
	t.is(received.data, 'TEST');
	t.deepEqual(received.params, { type: 'example' });
});