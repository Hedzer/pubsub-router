

import test from 'ava';

import Router from '../dist/index';

test('splat', async t => {
	const router = new Router();
	let finished = new Promise((resolve, reject) => {
		router
			.receive
			.post('/*type/*name')
			.respond((request) => request.data);

		router
			.send
			.post('/users/luchador')
			.request('TEST')
			.receive((res) => resolve(res));

			
		setTimeout(reject, 5000);
	});

	let received = await finished;
	t.is(received.data, 'TEST');
	t.deepEqual(received.params, { type:'users', name: 'luchador' });
});

test('splat with url params', async t => {
	const router = new Router();
	let finished = new Promise((resolve, reject) => {
		router
			.receive
			.post('/*type/*name?args=:args')
			.respond((request) => request.data);

		router
			.send
			.post('/users/luchador?args=example')
			.request('TEST')
			.receive((res) => resolve(res));

			
		setTimeout(reject, 5000);
	});

	let received = await finished;
	t.is(received.data, 'TEST');
	t.deepEqual(received.params, { args: 'example', type:'users', name: 'luchador' });
});