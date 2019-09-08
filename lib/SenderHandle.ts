
import Request from './Request';
import Response from './Response';
import EmitterHub from './EmitterHub';
import Handle from './Handle';
import { SENDER, RECEIVER } from './Constants';

class SenderHandle extends Handle<Response, Request> {
    constructor(emitters: EmitterHub[], path: string) {
        super(emitters, path);
    }

    public listeners: Map<string, (request: Response) => Request | void> = new Map<string, (request: Response) => Request | void>();

    request(data: any): this {
        this.defer(() => this.send(data));
        return this;
    }

    receive(receiver: (response: Response) => Request | void, count: number = Infinity): this {
        let listener = this.createListener(receiver, (req) => this.send(req), count);
        this
            .emitters
            .forEach(emitter => emitter
                [SENDER]
                .on(this.route, listener)
            );
        
        return this;
    }

    receiveOnce(receiver: (response: Response) => Request | void): this {
        return this.receive(receiver, 1);
    }

    remove(): this {
        this.removeAll(this.listeners, SENDER);
        return this;
    }

    protected createListener(receiver: (response: Response) => Request | void, requester: (data: any) => any, count: number = Infinity) {
    
        let received = 0;
        let listenerId = this.getId();

        let listener = (res: Response) => {
            
            if (this.isDisabled) { return; }
            
            if (received >= count) {
                this.removeListener(this.listeners, SENDER, listenerId);
                return;
            }

            received++;
            let request: Request | void;
            try {
                request = receiver(res);
                if (request) { requester(request); }
            } catch (error) {
                if (request) {
                    request.error = error;
                }

                this
                    .catchers
                    .forEach(catcher => { try { catcher(res, request, error) } catch(err) { console.log(err); }});
            }

            return request;
        };

        this.listeners.set(listenerId, listener);

        return listener;
    }

    protected send(data: any): this {

        this
            .emitters
            .map(emitter => {
                let req = new Request(emitter, this.route, data);
                req.hub = emitter;
                req.method = emitter.method;
                req.route = emitter.route;
                return { request: req, emitter };
            })
            .forEach(pair => pair
                .emitter
                [RECEIVER]
                .emit('*', pair.request)
            );
        return this;
    }

}

export default SenderHandle;
