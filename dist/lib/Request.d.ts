import HttpMethod from "./HttpMethod";
import EmitterHub from "./EmitterHub";
declare class Request {
    constructor(hub: EmitterHub, path: string, data: any);
    id: string;
    method: HttpMethod;
    route: string;
    timestamp: Date;
    path: string;
    params: object;
    data: any;
    hub: EmitterHub;
    error: Error | undefined;
    copy(): Request;
}
export default Request;
