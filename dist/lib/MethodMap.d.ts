import HttpMethod from './HttpMethod';
import EmitterHub from './EmitterHub';
declare class MethodMap {
    GET: Map<string, EmitterHub>;
    POST: Map<string, EmitterHub>;
    PUT: Map<string, EmitterHub>;
    PATCH: Map<string, EmitterHub>;
    DELETE: Map<string, EmitterHub>;
    get(method: HttpMethod): Map<string, EmitterHub>;
}
export default MethodMap;
