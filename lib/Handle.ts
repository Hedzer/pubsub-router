
import EmitterHub from './EmitterHub';
import Message from './Message';
import ID from './ID';
import EmitterRole from './EmitterRole';

let id = ID.generate();

abstract class Handle<INBOUND extends Message, OUTBOUND extends Message> {
    constructor(emitters: EmitterHub[], route: string) {
        this.emitters = emitters;
        this.route = route;
    }

    public route: string;
    public emitters: EmitterHub[];
    public isDisabled: boolean = false;
    protected catchers: ((inbound: INBOUND | void, outbound: OUTBOUND | void, error: Error) => void)[] = [];

    disable(): this {
        this.isDisabled = true;
        return this;
    }

    enable(): this {
        this.isDisabled = false;
        return this;
    }

    disabled(disabled: boolean): this {
        this.isDisabled = disabled;
        return this;
    }

    protected removeAll(listeners: Map<string, any>, type: EmitterRole): this {
        listeners
            .forEach((listener, id) => this.removeListener(listeners, type, id));

        return this;
    }

    protected removeListener(listeners: Map<string, any>, type: EmitterRole, listenerId: string): this {
        this
            .emitters
            .forEach(emitter => emitter
                [type]
                .removeListener('*', listeners.get(listenerId))
            );
        listeners.delete(listenerId);
        this.catchers = [];
        return this;
    }

    catch(catcher: (request: INBOUND | void, response: OUTBOUND | void, error: Error) => void): this {
        this.catchers.push(catcher);
        return this;
    }

    protected getId(): string {
        return id.next().value;
    }

    protected defer(method: (...params: any) => any): this {
        setTimeout(method, 0);
        return this;
    }
}

export default Handle;
