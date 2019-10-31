
import MethodMap from './MethodMap';
import Request from './Request';
import HttpMethod from './RouterMethod';
import EmitterHub from './EmitterHub';
import EventEmitter from 'eventemitter3'
import EmitterRole from './EmitterRole';

class Store {
	public emitters: MethodMap = new MethodMap();
	public unreceived: Map<HttpMethod, Set<Request>> = new Map<HttpMethod, Set<Request>>();
	public events: EventEmitter = new EventEmitter();

	resolve(method: HttpMethod, path: string): EmitterHub[] {
		let matches: EmitterHub[] = []; 
		this
			.emitters
			.get(method)
			.forEach((value, key) => value
				.matcher
				.match(path) ?
				matches.push(value) :
				null
			);

		return matches; 
	}

	add(method: HttpMethod, route: string): EmitterHub {
		let emitter = <EmitterHub>this
			.emitters
			.get(method)
			.set(route, new EmitterHub(method, route))
			.get(route);

		this
			.events
			.emit(`added ${EmitterRole.RECEIVER} ${method}`, emitter);

		//this.events.on(`added ${RECEIVER} ${method}`, e => console.log(e));
		return emitter;
	}

	remove(method: HttpMethod, route: string) {
		let routes = this
			.emitters
			.get(method);
			
		let emitter = routes.get(route);
		routes.delete(route);

		this
			.events
			.emit(`removed ${EmitterRole.RECEIVER} ${method}`, emitter);
	}

	retrieve(method: HttpMethod, route: string): EmitterHub[] {
		let resolved = this.resolve(method, route);
		return resolved.length ? resolved : [this.add(method, route)];
	}
}

export default Store;
