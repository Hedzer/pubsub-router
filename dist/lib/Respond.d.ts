import Request from "./Request";
import Response from "./Response";
import 'rxjs/Observable';
declare module 'rxjs/internal/Observable' {
    interface Observable<T> {
        respond(this: Observable<Request>, responder: () => Response): void;
    }
}
