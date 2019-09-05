import eventemitter from 'eventemitter3';
import HttpMethod from './HttpMethod';
import Matcher from 'route-parser';
declare class EmitterHub {
    constructor(method: HttpMethod, route: string);
    method: HttpMethod;
    route: string;
    matcher: Matcher;
    sender: eventemitter;
    receiver: eventemitter;
}
export default EmitterHub;
