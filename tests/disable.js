

import test from 'ava';

import Router from '../dist/index';

test('disable receiver', async t => {
	const router = new Router();
	let finished = new Promise((resolve, reject) => {
		let receiver = router
			.receive
			.post('/example/:type')
			.respond((request) => request.data);

		let sender = router
			.send
			.post('/example/echo')
			.request('RIGHT')
			.receive((res) => t.is(res.data, 'RIGHT'));

		setTimeout(() => {
			receiver
				.disable()
				.respond((res) => resolve(res.data));

			sender
				.request("WRONG");

			setTimeout(() => resolve("RIGHT"), 100);
		}, 100);

		setTimeout(reject, 5000);
	});

	let response = await finished;
	t.is(response, 'RIGHT');
});


test('disable sender', async t => {
	const router = new Router();
	let finished = new Promise((resolve, reject) => {
		router
			.receive
			.post('/example/:type')
			.respond((request) => request.data);

		let sender = router
			.send
			.post('/example/echo')
			.request('RIGHT')
			.receive((res) => t.is(res.data, 'RIGHT'));

		setTimeout(() => {
			sender.disable();

			sender
				.request("WRONG")
				.receive((res) => resolve(res.data));

			setTimeout(() => resolve("RIGHT"), 100);
		}, 100);

		setTimeout(reject, 5000);
	});

	let response = await finished;
	t.is(response, 'RIGHT');
});