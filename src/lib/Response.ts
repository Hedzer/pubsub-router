import HttpMethod from "./RouterMethod";
import Request from "./Request";
import ID from "./ID";

let id = ID.generate();

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

	public id: string = id.next().value;
	public request: Request;
	public method: HttpMethod;
	public route: string;
	public timestamp: Date;
	public path: string;
	public params: object;
	public data: any;
	public error: Error | undefined;

	copy(): Response {
		let response = new Response(this.request, this.data);
		response.request = this.request;
		response.method = this.method;
		response.path = this.path;
		response.route = this.route;
		response.timestamp = this.timestamp;
		response.params = this.params;
		response.data = this.data;
		response.error = this.error;
		return response;
	}
}

export default Response;
