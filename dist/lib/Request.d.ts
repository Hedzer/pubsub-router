import HttpMethod from "./HttpMethod";
import EmitterHub from "./EmitterHub";
declare class Request {
    constructor(hub: EmitterHub, path: string, data: any);
    method: HttpMethod;
    route: string;
    timestamp: Date;
    path: string;
    params: object;
    data: any;
    hub: EmitterHub;
    copy(): Request;
}
export default Request;
