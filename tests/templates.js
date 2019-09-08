

import test from 'ava';

import Router from '../dist/index';

test('templates', async t => {
	const router = new Router();
	let finished = new Promise((resolve, reject) => {
		router
			.receive
			.post('/example/:type')
			.respond((request) => request.data);

		router
			.send
			.post('/example/echo')
			.request('TEST')
			.receive((res) => resolve(res));

		setTimeout(reject, 5000);
	});

	let response = await finished;
	t.is(response.data, 'TEST');
	t.is(response.params.type, 'echo');
});

test('templates with url params', async t => {
	const router = new Router();
	let finished = new Promise((resolve, reject) => {
		router
			.receive
			.post('/example/:type?args=:args')
			.respond((request) => request.data);

		router
			.send
			.post('/example/echo?args=example')
			.request('TEST')
			.receive((res) => resolve(res));

		setTimeout(reject, 5000);
	});

	let response = await finished;
	t.is(response.data, 'TEST');
	t.deepEqual(response.params, { args: 'example', type: 'echo' });
});
