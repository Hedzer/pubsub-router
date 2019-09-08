import Request from './Request';
import Response from './Response';
import EmitterHub from './EmitterHub';
import Handle from './Handle';
declare class ReceiverHandle extends Handle<Request, Response> {
    constructor(emitters: EmitterHub[], route: string);
    listeners: Map<string, (request: Request) => Response | void>;
    respond(responder: (request: Request) => any, count?: number): this;
    respondOnce(responder: (request: Request) => Response): this;
    subscribe(subscriber: (request: Request) => void, count?: number): this;
    subscribeOnce(subscriber: (request: Request) => void): this;
    remove(): this;
    protected createListener(responder: (request: Request) => any, sender: (response: Response) => any, count?: number): (req: Request) => void | Response;
    protected send(response: Response): this;
}
export default ReceiverHandle;
