
import Store from './Store';
import Router from '..';
import Sender from './Sender';
import ReceiverHandle from "./ReceiverHandle";

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
		return new ReceiverHandle(this.store.retrieve('GET', route), route);
	}

	post(route: string): ReceiverHandle {
		return new ReceiverHandle(this.store.retrieve('POST', route), route);
	}

	put(route: string): ReceiverHandle {
		return new ReceiverHandle(this.store.retrieve('PUT', route), route);
	}

	patch(route: string): ReceiverHandle {
		return new ReceiverHandle(this.store.retrieve('PATCH', route), route);
	}

	delete(route: string): ReceiverHandle {
		return new ReceiverHandle(this.store.retrieve('DELETE', route), route);
	}
}

export default Receiver;
