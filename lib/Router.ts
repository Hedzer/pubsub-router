
import Sender from './Sender';
import Receiver from './Receiver';
import Store from './Store';

class Router {
	constructor() {
		this.store = new Store();
		this.receive = new Receiver(this);
		this.send = new Sender(this);
	}
	public store: Store;
	public send: Sender;
	public receive: Receiver;
}

export default Router;
