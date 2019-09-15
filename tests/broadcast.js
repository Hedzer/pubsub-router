

import test from 'ava';

import Router from '../dist/index';

test('initial broadcast', async t => {
	const router = new Router();
	let finished = new Promise((resolve, reject) => {

		router
			.send
			.post('/wrong/echo')
			.request('WRONG')
			.receive((res) => reject(res));

		router
			.send
			.post('/example/echo')
			.request('RIGHT')
			.receive((res) => resolve(res));

		router
			.receive
			.post('/example/:type')
			.broadcast('RIGHT');

		setTimeout(reject, 5000);
	});

	let response = await finished;
	t.is(response.data, 'RIGHT');
	t.is(response.params.type, 'echo');
});

