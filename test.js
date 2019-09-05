
import test from 'ava';

import Router from './dist/index';

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

// test('bar', async t => {
// 	const bar = Promise.resolve('bar');
// 	t.is(await bar, 'bar');
// });