import Request from './Request';
import Response from './Response';
import EmitterHub from './EmitterHub';
import Handle from './Handle';
declare class SenderHandle extends Handle<Response, Request> {
    constructor(emitters: EmitterHub[], path: string);
    listeners: Map<string, (request: Response) => Request | void>;
    request(data: any): this;
    receive(receiver: (response: Response) => Request | void, count?: number): this;
    receiveOnce(receiver: (response: Response) => Request | void): this;
    remove(): this;
    protected createListener(receiver: (response: Response) => Request | void, requester: (data: any) => any, count?: number): (res: Response) => void | Request;
    protected send(data: any): this;
}
export default SenderHandle;
