
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

	get = (route: string): ReceiverHandle => this.getHandle(HttpMethod.GET, route);
	post = (route: string): ReceiverHandle => this.getHandle(HttpMethod.POST, route);
	put = (route: string): ReceiverHandle => this.getHandle(HttpMethod.PUT, route);
	patch = (route: string): ReceiverHandle => this.getHandle(HttpMethod.PATCH, route);
	delete = (route: string): ReceiverHandle => this.getHandle(HttpMethod.DELETE, route);

	private getHandle(method: HttpMethod, route: string): ReceiverHandle {
		let emitters = this.store.retrieve(method, route);
		return new ReceiverHandle(this.router, method, emitters, route);
	}
}

export default Receiver;
