import eventemitter from 'eventemitter3';
import HttpMethod from './HttpMethod';
import Matcher from 'route-parser';

class EmitterHub {
    constructor(method: HttpMethod, route: string) {
        this.method = method;
        this.route = route;
        this.matcher = new Matcher(route);
    }
    
    public method: HttpMethod;
    public route: string;
    public matcher: Matcher;
    public sender: eventemitter = new eventemitter();
    public receiver: eventemitter = new eventemitter();
}

export default EmitterHub;
