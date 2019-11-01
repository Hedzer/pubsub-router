import EventEmitter from './MicroEmitter';
import HttpMethod from './RouterMethod';
import Matcher from 'route-parser';
import IdGenerator from "./IdGenerator";

let idGenerator = IdGenerator.generate();

class EmitterHub {
	constructor(method: HttpMethod, route: string) {
		this.method = method;
		this.route = route;
		this.matcher = new Matcher(route);
	}
	
	public id: string = idGenerator.next().value;
	public method: HttpMethod;
	public route: string;
	public matcher: Matcher;
	public sender: EventEmitter = new EventEmitter();
	public receiver: EventEmitter = new EventEmitter();
}

export default EmitterHub;
