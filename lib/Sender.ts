
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

	get = (path: string, ...data: any[]): SenderHandle => this.getHandle(HttpMethod.GET, path, data);
	post = (path: string, ...data: any[]): SenderHandle => this.getHandle(HttpMethod.POST, path, data);
	put = (path: string, ...data: any[]): SenderHandle => this.getHandle(HttpMethod.PUT, path, data);
	patch = (path: string, ...data: any[]): SenderHandle => this.getHandle(HttpMethod.PATCH, path, data);
	delete = (path: string, ...data: any[]): SenderHandle => this.getHandle(HttpMethod.DELETE, path, data);

	private getHandle(method: HttpMethod, path: string, data: any[]): SenderHandle {
		let emitters = this.store.retrieve(method, path);
		let handle = new SenderHandle(this.router, method, emitters, path);
		if (data.length) { handle.request(data); }
		return handle;
	}
}

export default Sender;
