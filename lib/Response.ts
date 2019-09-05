import HttpMethod from "./HttpMethod";
import Request from "./Request";

class Response {
    constructor(request: Request, data: any) {
        this.request = request;
        this.method = request.method;
        this.path = request.path;
        this.route = request.route;
        this.timestamp = new Date();
        this.params = request.params;
        this.data = data;
    }

    public request: Request;
    public method: HttpMethod;
    public route: string;
    public timestamp: Date;
    public path: string;
    public params: object;
    public data: any;

    copy(): Response {
        let response = new Response(this.request, this.data);
        response.request = this.request;
        response.method = this.method;
        response.path = this.path;
        response.route = this.route;
        response.timestamp = this.timestamp;
        response.params = this.params;
        response.data = this.data;
        return response;
    }
}

export default Response;
