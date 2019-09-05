import Request from "./Request";
import Response from "./Response";
import EmitterHub from "./EmitterHub";
import Handle from './Handle';
declare class ReceiverHandle extends Handle {
    constructor(emitters: EmitterHub[], route: string);
    listeners: Map<number, (request: Request) => Response | void>;
    respond(responder: (request: Request) => any, count?: number): this;
    respondOnce(responder: (request: Request) => Response): this;
    protected send(response: Response): this;
}
export default ReceiverHandle;
