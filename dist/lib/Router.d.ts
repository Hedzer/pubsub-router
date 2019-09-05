import Sender from './Sender';
import Receiver from './Receiver';
import Store from './Store';
declare class Router {
    constructor();
    store: Store;
    send: Sender;
    receive: Receiver;
}
export default Router;
