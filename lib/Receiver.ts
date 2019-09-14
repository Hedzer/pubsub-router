
import Store from './Store';
import Router from './Router';
import Sender from './Sender';
import ReceiverHandle from "./ReceiverHandle";
import HttpMethod from './HttpMethod';

class Receiver {

	constructor(router: Router) {
		this.router = router;
		this.store = router.store;
		this.sender = router.send;
	}

	private router: Router;
	private store: Store;
	private sender: Sender;

	get(route: string): ReceiverHandle {	
		let method: HttpMethod = 'GET';
		let emitters = this.store.retrieve(method, route);
		return new ReceiverHandle(this.router, method, emitters, route);
	}

	post(route: string): ReceiverHandle {
		let method: HttpMethod = 'POST';
		let emitters = this.store.retrieve(method, route);
		return new ReceiverHandle(this.router, method, emitters, route);
	}

	put(route: string): ReceiverHandle {
		let method: HttpMethod = 'PUT';
		let emitters = this.store.retrieve(method, route);
		return new ReceiverHandle(this.router, method, emitters, route);
	}

	patch(route: string): ReceiverHandle {
		let method: HttpMethod = 'PATCH';
		let emitters = this.store.retrieve(method, route);
		return new ReceiverHandle(this.router, method, emitters, route);
	}

	delete(route: string): ReceiverHandle {
		let method: HttpMethod = 'DELETE';
		let emitters = this.store.retrieve(method, route);
		return new ReceiverHandle(this.router, method, emitters, route);
	}
}

export default Receiver;
