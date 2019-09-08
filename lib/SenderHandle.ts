
import Request from "./Request";
import Response from "./Response";
import EmitterHub from "./EmitterHub";
import Handle from "./Handle";

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

        let received = 0;
        let listenerId = this.getId();

        let listener = (res: Response) => {
            
            if (this.isDisabled) { return; }
            
            if (received >= count) {
                this.remove(this.listeners, listenerId);
                return;
            }

            received++;
            let request: Request | void;
            try {
                request = receiver(res);
                if (request) { this.send(request); }
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

        this
            .emitters
            .forEach(emitter => emitter
                .sender
                .on(this.route, listener)
            );
        
        return this;
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
                .receiver
                .emit('*', pair.request)
            );
        return this;
    }

}

export default SenderHandle;
