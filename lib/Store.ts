
import MethodMap from './MethodMap';
import Request from './Request';
import HttpMethod from './HttpMethod';
import EmitterHub from './EmitterHub';

class Store {
	public emitters: MethodMap = new MethodMap();
	public unreceived: Map<HttpMethod, Set<Request>> = new Map<HttpMethod, Set<Request>>();

	resolve(method: HttpMethod, path: string): EmitterHub[] {
		console.log("RESOLVE", method, path)
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
		console.log(matches)
		return matches; 
	}

	create(method: HttpMethod, route: string): EmitterHub {
		console.log("CREATING ", method, route);
		return <EmitterHub>this
			.emitters
			.get(method)
			.set(route, new EmitterHub(method, route))
			.get(route);
	}

	retrieve(method: HttpMethod, route: string): EmitterHub[] {
		let resolved = this.resolve(method, route);
		return resolved.length ? resolved : [this.create(method, route)];
	}
}

export default Store;
