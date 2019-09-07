import EmitterHub from './EmitterHub';
import Message from './Message';
declare abstract class Handle<INBOUND extends Message, OUTBOUND extends Message> {
    constructor(emitters: EmitterHub[], route: string);
    route: string;
    emitters: EmitterHub[];
    isDisabled: boolean;
    protected currentId: number;
    protected catchers: ((inbound: INBOUND | void, outbound: OUTBOUND | void, error: Error) => void)[];
    disable(): this;
    enable(): this;
    disabled(disabled: boolean): this;
    remove(listeners: Map<number, any>, listenerId: number): this;
    catch(catcher: (request: INBOUND | void, response: OUTBOUND | void, error: Error) => void): this;
    protected getId(): number;
    protected defer(method: (...params: any) => any): this;
}
export default Handle;
