import EventEmitter from 'eventemitter3';
import HttpMethod from './HttpMethod';
import Matcher from 'route-parser';
import ID from "./ID";

let id = ID.generate();

class EmitterHub {
    constructor(method: HttpMethod, route: string) {
        this.method = method;
        this.route = route;
        this.matcher = new Matcher(route);
    }
    
    public id: string = id.next().value;
    public method: HttpMethod;
    public route: string;
    public matcher: Matcher;
    public sender: EventEmitter = new EventEmitter();
    public receiver: EventEmitter = new EventEmitter();
}

export default EmitterHub;
