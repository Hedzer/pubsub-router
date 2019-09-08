
import Request from "./Request";
import Response from "./Response";
import EmitterHub from "./EmitterHub";
import Handle from './Handle';

class ReceiverHandle extends Handle<Request, Response> {
    constructor(emitters: EmitterHub[], route: string) {
        super(emitters, route);
    }

    public listeners: Map<string, (request: Request) => Response | void> = new Map<string, (request: Request) => Response | void>();

    respond(responder: (request: Request) => any, count: number = Infinity): this {

        let sent = 0;
        let listenerId = this.getId();

        let listener = (req: Request) => {
            if (this.isDisabled) { return; }
            
            if (sent >= count) {
                this.remove(this.listeners, listenerId);
                return;
            }

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

        return this;
    }

    respondOnce(responder: (request: Request) => Response): this {
        return this.respond(responder, 1);
    }

    protected send(response: Response): this {
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
