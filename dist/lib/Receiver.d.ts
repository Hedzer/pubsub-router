import Router from '..';
import ReceiverHandle from "./ReceiverHandle";
declare class Receiver {
    constructor(router: Router);
    private router;
    private store;
    private sender;
    get(route: string): ReceiverHandle;
    post(route: string): ReceiverHandle;
    put(route: string): ReceiverHandle;
    patch(route: string): ReceiverHandle;
    delete(route: string): ReceiverHandle;
}
export default Receiver;
