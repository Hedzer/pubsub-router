import MethodMap from './MethodMap';
import Request from './Request';
import HttpMethod from './HttpMethod';
import EmitterHub from './EmitterHub';
declare class Store {
    emitters: MethodMap;
    unreceived: Map<HttpMethod, Set<Request>>;
    resolve(method: HttpMethod, path: string): EmitterHub[];
    create(method: HttpMethod, route: string): EmitterHub;
    retrieve(method: HttpMethod, route: string): EmitterHub[];
}
export default Store;
