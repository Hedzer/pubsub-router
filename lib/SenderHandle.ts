
import Request from "./Request";
import Response from "./Response";
import EmitterHub from "./EmitterHub";
import Handle from "./Handle";

class SenderHandle extends Handle {
    constructor(emitters: EmitterHub[], path: string) {
        super(emitters, path);
        console.log("SenderHandle", emitters, path);
    }

    public listeners: Map<number, (request: Response) => Request | void> = new Map<number, (request: Response) => Request | void>();

    request(data: any): this {
        this.defer(() => {
            console.log("RUNNING REQUEST");
            this
                .emitters
                .map(emitter => {
                    let req = new Request(emitter, this.route, data);
                    req.hub = emitter;
                    req.method = emitter.method;
                    req.route = emitter.route;
                    return req;
                })
                .forEach((request) => this.send(request));
        });
        return this;
    }

    receive(receiver: (request: Response) => Request | void, count: number = Infinity): this {

        let received = 0;
        let listenerId = this.getId();

        let listener = (res: Response) => {
            
            if (this.isDisabled) { return; }
            
            if (received >= count) {
                this.remove(this.listeners, listenerId);
                return;
            }

            received++;
            let request = receiver(res);

            if (request) { this.send(request); }

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


    protected send(request: Request): this {
        //console.log("SENDER SENDING", request);
        console.log("SENDER EMITTER COUNT", this.emitters.length);
        this.emitters.forEach(e => console.log("SENDER EMITTER ROUTE", e.receiver.eventNames()));
        
        this
            .emitters
            .forEach(emitter => emitter
                .receiver
                .emit('*', request)
            );
        return this;
    }

}

export default SenderHandle;
