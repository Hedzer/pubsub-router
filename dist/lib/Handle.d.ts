import EmitterHub from "./EmitterHub";
declare class Handle {
    constructor(emitters: EmitterHub[], route: string);
    route: string;
    emitters: EmitterHub[];
    isDisabled: boolean;
    private currentId;
    disable(): this;
    enable(): this;
    disabled(disabled: boolean): this;
    remove(listeners: Map<number, any>, listenerId: number): this;
    protected getId(): number;
    protected defer(method: (...params: any) => any): this;
}
export default Handle;
