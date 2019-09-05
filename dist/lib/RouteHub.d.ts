import RouteEntry from "./RouteEntry";
import Request from "./Request";
import Response from "./Response";
declare class RouteHub {
    constructor(receiver: RouteEntry, sender: RouteEntry);
    receiver: RouteEntry;
    sender: RouteEntry;
    send(path: string, data?: any): Request;
    respond(request: Request, data?: any): Response;
}
export default RouteHub;
