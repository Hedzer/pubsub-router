
import test from 'ava';

import Router from '../dist/index';


test('add receiver after', async t => {
	const router = new Router();
	let finished = new Promise((resolve, reject) => {

		let sender = router
			.send
			.post('/YOLOOOO/echo')
			.request('TEST')
			.receive((response) => resolve(response.data));

		setTimeout(() => {
			let receiver = router
				.receive
				.post('/YOLOOOO/:YOLO')
				.respond((request) => 'RIGHT');
			
			sender.request("TEST2");
		}, 100);

		setTimeout(reject, 5000);
	});

	let received = await finished;
	t.is(received, 'RIGHT');
});