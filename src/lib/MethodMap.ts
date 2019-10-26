
import HttpMethod from './RouterMethod';
import EmitterHub from './EmitterHub';

class MethodMap {
	public GET: Map<string, EmitterHub> = new Map<string, EmitterHub>();
	public POST: Map<string, EmitterHub> = new Map<string, EmitterHub>();
	public PUT: Map<string, EmitterHub> = new Map<string, EmitterHub>();
	public PATCH: Map<string, EmitterHub> = new Map<string, EmitterHub>();
	public DELETE: Map<string, EmitterHub> = new Map<string, EmitterHub>();
	
	get(method: HttpMethod): Map<string, EmitterHub>{
		return this[method];
	}
}

export default MethodMap;
