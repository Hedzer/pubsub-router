
import Receiver from './Receiver';
import Store from './Store';
import Router from '..';
import SenderHandle from './SenderHandle';

class Sender {

	constructor(router: Router) {
		this.router = router;
		this.store = router.store;
		this.receiver = router.receive;
	}

	private router: Router;
	private store: Store;
	private receiver: Receiver;

	get(path: string, data: any): SenderHandle {
		let handle = new SenderHandle(this.store.retrieve('GET', path), path);
		if (arguments.length > 1) { handle.request(data); }
		return handle;
	}

	post(path: string, data: any): SenderHandle {
		let handle = new SenderHandle(this.store.retrieve('POST', path), path);
		if (arguments.length > 1) { handle.request(data); }
		return handle;
	}

	put(path: string, data: any): SenderHandle {
		let handle = new SenderHandle(this.store.retrieve('PUT', path), path);
		if (arguments.length > 1) { handle.request(data); }
		return handle;
	}

	patch(path: string, data: any): SenderHandle {
		let handle = new SenderHandle(this.store.retrieve('PATCH', path), path);
		if (arguments.length > 1) { handle.request(data); }
		return handle;
	}

	delete(path: string, data: any): SenderHandle {
		let handle = new SenderHandle(this.store.retrieve('DELETE', path), path);
		if (arguments.length > 1) { handle.request(data); }
		return handle;
	}
}

export default Sender;
