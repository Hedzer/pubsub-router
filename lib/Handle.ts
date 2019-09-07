
import EmitterHub from './EmitterHub';
import Request from './Request';
import Response from './Response';
import Message from './Message';

abstract class Handle<INBOUND extends Message, OUTBOUND extends Message> {
    constructor(emitters: EmitterHub[], route: string) {
        this.emitters = emitters;
        this.route = route;
    }

    public route: string;
    public emitters: EmitterHub[];
    public isDisabled: boolean = false;
    protected currentId: number = 0;
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

    remove(listeners: Map<number, any>, listenerId: number): this {
        this
        .emitters
        .forEach(emitter => emitter
            .sender
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

    protected getId(): number {
        this.currentId++;
        return this.currentId;
    }

    protected defer(method: (...params: any) => any): this {
        setTimeout(method, 0);
        return this;
    }
}

export default Handle;
