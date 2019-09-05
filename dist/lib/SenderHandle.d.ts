import Request from "./Request";
import Response from "./Response";
import EmitterHub from "./EmitterHub";
import Handle from "./Handle";
declare class SenderHandle extends Handle {
    constructor(emitters: EmitterHub[], path: string);
    listeners: Map<number, (request: Response) => Request | void>;
    request(data: any): this;
    receive(receiver: (request: Response) => Request | void, count?: number): this;
    protected send(request: Request): this;
}
export default SenderHandle;