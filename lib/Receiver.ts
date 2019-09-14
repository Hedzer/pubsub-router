
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
		let emitters = this.store.retrieve(HttpMethod.GET, route);
		return new ReceiverHandle(this.router, HttpMethod.GET, emitters, route);
	}

	post(route: string): ReceiverHandle {
		let emitters = this.store.retrieve(HttpMethod.POST, route);
		return new ReceiverHandle(this.router, HttpMethod.POST, emitters, route);
	}

	put(route: string): ReceiverHandle {
		let emitters = this.store.retrieve(HttpMethod.PUT, route);
		return new ReceiverHandle(this.router, HttpMethod.PUT, emitters, route);
	}

	patch(route: string): ReceiverHandle {
		let emitters = this.store.retrieve(HttpMethod.PATCH, route);
		return new ReceiverHandle(this.router, HttpMethod.PATCH, emitters, route);
	}

	delete(route: string): ReceiverHandle {
		let emitters = this.store.retrieve(HttpMethod.DELETE, route);
		return new ReceiverHandle(this.router, HttpMethod.DELETE, emitters, route);
	}
}

export default Receiver;
