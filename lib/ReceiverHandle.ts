
import Request from "./Request";
import Response from "./Response";
import EmitterHub from "./EmitterHub";
import Handle from './Handle';

class ReceiverHandle extends Handle<Request, Response> {
    constructor(emitters: EmitterHub[], route: string) {
        super(emitters, route);
        console.log("ReceiverHandle", emitters, route);
    }

    public listeners: Map<number, (request: Request) => Response | void> = new Map<number, (request: Request) => Response | void>();

    respond(responder: (request: Request) => any, count: number = Infinity): this {

        console.log("CREATING RESPONDER");
        let sent = 0;
        let listenerId = this.getId();

        let listener = (req: Request) => {
            console.log("RESPONDING");
            if (this.isDisabled) { return; }
            console.log("RESPOND NOT DISABLED");
            
            if (sent >= count) {
                this.remove(this.listeners, listenerId);
                return;
            }

            console.log("GETTING TO SEND");
            sent++;

            let response: Response | void;
            try {
                response = new Response(req, responder(req));
                this.send(response);
            } catch (error) {
                if (response) {
                    response.error = error;
                }

                this
                    .catchers
                    .forEach(catcher => { try { catcher(req, response, error) } catch(err) { console.log(err); }});
            }

            return response;
        };

        this.listeners.set(listenerId, listener);

        this
            .emitters
            .forEach(emitter => emitter
                .receiver
                .on('*', listener)
            );

        this.emitters.forEach(e => console.log("EMITTER ROUTE", e.receiver.eventNames()));
        console.log("EMITTER COUNT", this.emitters.length);
        
        return this;
    }

    respondOnce(responder: (request: Request) => Response): this {
        return this.respond(responder, 1);
    }

    protected send(response: Response): this {
        console.log("SENDING RESPONSE", response);
        this
            .emitters
            .forEach(emitter => emitter
                .sender
                .emit(response.request.path, response)
            );
        return this;
    }
}

export default ReceiverHandle;
