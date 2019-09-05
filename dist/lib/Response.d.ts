import HttpMethod from "./HttpMethod";
import Request from "./Request";
declare class Response {
    constructor(request: Request, data: any);
    request: Request;
    method: HttpMethod;
    route: string;
    timestamp: Date;
    path: string;
    params: object;
    data: any;
    copy(): Response;
}
export default Response;
