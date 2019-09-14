import Response from "./Response";
import Request from "./Request";


class ReceiveParams {
	constructor(receiver: (response: Response) => Request | void, count: number, listener: (response: Response) => Request | void) {
		this.receiver = receiver;
		this.count = count;
		this.listener = listener;
	}
	public receiver: (response: Response) => Request | void;
	public count: number;
	public listener: (response: Response) => Request | void; 
}

export default ReceiveParams;
