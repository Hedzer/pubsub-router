

import test from 'ava';

import Router from '../dist/index';

test('subscribe', async t => {
	const router = new Router();
	let finished = new Promise((resolve, reject) => {
		router
			.receive
			.post('/example/:type')
			.subscribe((request) => resolve(request.data));

		router
			.send
			.post('/example/echo')
			.request('RIGHT')
			.receive((res) => resolve("WRONG"));

		setTimeout(reject, 5000);
	});

	let received = await finished;
	t.is(received, 'RIGHT');
});

