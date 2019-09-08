import EmitterHub from './EmitterHub';
import Message from './Message';
import EmitterRole from './EmitterRole';
declare abstract class Handle<INBOUND extends Message, OUTBOUND extends Message> {
    constructor(emitters: EmitterHub[], route: string);
    route: string;
    emitters: EmitterHub[];
    isDisabled: boolean;
    disable(): this;
    enable(): this;
    disabled(disabled: boolean): this;
    protected removeAll(listeners: Map<string, any>, type: EmitterRole): this;
    protected removeListener(listeners: Map<string, any>, type: EmitterRole, listenerId: string): this;
    protected getId(): string;
    protected defer(method: (...params: any) => any): this;
}
export default Handle;
