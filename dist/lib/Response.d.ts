import HttpMethod from "./HttpMethod";
import Request from "./Request";
declare class Response {
    constructor(request: Request, data: any);
    id: string;
    request: Request;
    method: HttpMethod;
    route: string;
    timestamp: Date;
    path: string;
    params: object;
    data: any;
    error: Error | undefined;
    copy(): Response;
}
export default Response;
