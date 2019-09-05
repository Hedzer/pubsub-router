
import EmitterHub from "./EmitterHub";

class Handle {
    constructor(emitters: EmitterHub[], route: string) {
        this.emitters = emitters;
        this.route = route;
    }

    public route: string;
    public emitters: EmitterHub[];
    public isDisabled: boolean = false;
    private currentId: number = 0;

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
