import EmitterHub from './EmitterHub';
import Message from './Message';
import EmitterRole from './EmitterRole';
declare abstract class Handle<INBOUND extends Message, OUTBOUND extends Message> {
    constructor(emitters: EmitterHub[], route: string);
    route: string;
    emitters: EmitterHub[];
    isDisabled: boolean;
    protected catchers: ((inbound: INBOUND | void, outbound: OUTBOUND | void, error: Error) => void)[];
    disable(): this;
    enable(): this;
    disabled(disabled: boolean): this;
    protected removeAll(listeners: Map<string, any>, type: EmitterRole): this;
    protected removeListener(listeners: Map<string, any>, type: EmitterRole, listenerId: string): this;
    catch(catcher: (request: INBOUND | void, response: OUTBOUND | void, error: Error) => void): this;
    protected getId(): string;
    protected defer(method: (...params: any) => any): this;
}
export default Handle;
