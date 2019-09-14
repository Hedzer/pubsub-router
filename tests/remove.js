

import test from 'ava';

import Router from '../dist/index';

test('remove receiver', async t => {
	const router = new Router();
	let finished = new Promise((resolve, reject) => {

		let receiver = router
			.receive
			.post('/example/:type')
			.respond((request) => "WRONG");

		router
			.send
			.post('/example/echo')
			.request('TEST');

		setTimeout(() => {
			receiver.remove();

			router
				.send
				.post('/example/echo')
				.request('TEST')
				.receive((res) => resolve(res.data));
		}, 100);

		setTimeout(() => {
			resolve('RIGHT');
		}, 200)

		setTimeout(reject, 5000);
	});

	let received = await finished;
	t.is(received, 'RIGHT');
});
