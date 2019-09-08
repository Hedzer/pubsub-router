import Request from "./Request";
import Response from "./Response";
import EmitterHub from "./EmitterHub";
import Handle from "./Handle";
declare class SenderHandle extends Handle<Response, Request> {
    constructor(emitters: EmitterHub[], path: string);
    listeners: Map<string, (request: Response) => Request | void>;
    request(data: any): this;
    receive(receiver: (response: Response) => Request | void, count?: number): this;
    protected send(data: any): this;
}
export default SenderHandle;
