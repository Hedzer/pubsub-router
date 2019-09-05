import Router from '..';
import SenderHandle from './SenderHandle';
declare class Sender {
    constructor(router: Router);
    private router;
    private store;
    private receiver;
    get(path: string, data: any): SenderHandle;
    post(path: string, data: any): SenderHandle;
    put(path: string, data: any): SenderHandle;
    patch(path: string, data: any): SenderHandle;
    delete(path: string, data: any): SenderHandle;
}
export default Sender;
