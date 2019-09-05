import HttpMethod from "./HttpMethod";
import EmitterHub from "./EmitterHub";

class Request {
    constructor(hub: EmitterHub, path: string, data: any) {
        this.hub = hub;
        this.path = path;
        this.params = hub.matcher.match(path) || {};
        this.data = data;
    }
    public method: HttpMethod = 'GET';
    public route: string = '';
    public timestamp: Date = new Date();
    public path: string = '';
    public params: object;
    public data: any;
    public hub: EmitterHub;

    copy(): Request {
        let request = new Request(this.hub, this.path, this.data);
        request.method = this.method;
        request.route = this.route;
        request.timestamp = this.timestamp;
        request.path = this.path;
        request.params = this.params;
        request.data = this.data;
        request.hub = this.hub;
        return request;
    }
}

export default Request;
