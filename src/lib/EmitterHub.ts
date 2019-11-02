import EventEmitter from './MicroEmitter';
import HttpMethod from './RouterMethod';
import Matcher from 'route-parser';
import uid from 'yield-uid';

const generator = uid.generator();

class EmitterHub {
	constructor(method: HttpMethod, route: string) {
		this.method = method;
		this.route = route;
		this.matcher = new Matcher(route);
	}
	
	public id: string = generator.next().value;
	public method: HttpMethod;
	public route: string;
	public matcher: Matcher;
	public sender: EventEmitter = new EventEmitter();
	public receiver: EventEmitter = new EventEmitter();
}

export default EmitterHub;
