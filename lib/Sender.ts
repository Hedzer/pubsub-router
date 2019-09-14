
import Receiver from './Receiver';
import Store from './Store';
import Router from './Router';
import SenderHandle from './SenderHandle';
import HttpMethod from './HttpMethod';

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
		let method: HttpMethod = 'GET';
		let emitters = this.store.retrieve(method, path);
		let handle = new SenderHandle(this.router, method, emitters, path);
		if (arguments.length > 1) { handle.request(data); }
		return handle;
	}

	post(path: string, data: any): SenderHandle {
		let method: HttpMethod = 'POST';
		let emitters = this.store.retrieve(method, path);
		let handle = new SenderHandle(this.router, method, emitters, path);
		if (arguments.length > 1) { handle.request(data); }
		return handle;
	}

	put(path: string, data: any): SenderHandle {
		let method: HttpMethod = 'PUT';
		let emitters = this.store.retrieve(method, path);
		let handle = new SenderHandle(this.router, method, emitters, path);
		if (arguments.length > 1) { handle.request(data); }
		return handle;
	}

	patch(path: string, data: any): SenderHandle {
		let method: HttpMethod = 'PATCH';
		let emitters = this.store.retrieve(method, path);
		let handle = new SenderHandle(this.router, method, emitters, path);
		if (arguments.length > 1) { handle.request(data); }
		return handle;
	}

	delete(path: string, data: any): SenderHandle {
		let method: HttpMethod = 'DELETE';
		let emitters = this.store.retrieve(method, path);
		let handle = new SenderHandle(this.router, method, emitters, path);
		if (arguments.length > 1) { handle.request(data); }
		return handle;
	}
}

export default Sender;
