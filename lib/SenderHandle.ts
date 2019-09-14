
import Request from './Request';
import Response from './Response';
import EmitterHub from './EmitterHub';
import Handle from './Handle';
import Router from './Router';
import HttpMethod from './HttpMethod';
import ReceiveParams from './ReceiveParams';
import EmitterRole from './EmitterRole';

class SenderHandle extends Handle<Response, Request> {
	constructor(router: Router, method: HttpMethod, emitters: EmitterHub[], path: string) {
		super(router, method, emitters, path);
		
		router
			.store
			.events
			.on(`added ${EmitterRole.RECEIVER} ${method}`, e => this.onReceiverAdded(e), this)
			.on(`removed ${EmitterRole.RECEIVER} ${method}`, e => this.onReceiverRemoved(e), this);
	}

	public listeners: Map<string, (request: Response) => Request | void> = new Map<string, (request: Response) => Request | void>();
	private receivers: Set<ReceiveParams> = new Set<ReceiveParams>();  

	request(data: any): this {
		this.defer(() => this.send(data));
		return this;
	}

	receive(receiver: (response: Response) => Request | void, count: number = Infinity): this {
		let listener = this.createListener(receiver, (req) => this.send(req), count);
		this
			.emitters
			.forEach(emitter => emitter
				[EmitterRole.SENDER]
				.on(this.route, listener)
			);
		
		this.receivers.add(new ReceiveParams(receiver, count, listener));

		return this;
	}

	receiveOnce(receiver: (response: Response) => Request | void): this {
		return this.receive(receiver, 1);
	}

	remove(): this {
		this.removeAll(this.listeners, EmitterRole.SENDER);
		
		this
			.router
			.store
			.events
			.removeListener(`added ${EmitterRole.RECEIVER} ${this.method}`, e => this.onReceiverAdded(e), this)
			.removeListener(`removed ${EmitterRole.RECEIVER} ${this.method}`, e => this.onReceiverRemoved(e), this);
		return this;
	}

	protected createListener(receiver: (response: Response) => Request | void, requester: (data: any) => any, count: number = Infinity) {
		let received = 0;
		let listenerId = this.getId();

		let listener = (res: Response) => {
			
			if (this.isDisabled) { return; }
			
			if (received >= count) {
				this.removeListener(this.listeners, EmitterRole.SENDER, listenerId);
				return;
			}

			received++;
			let request: Request | void;
			try {
				request = receiver(res);
				if (request) { requester(request); }
			} catch (error) {
				if (request) {
					request.error = error;
				}
			}

			return request;
		};

		this.listeners.set(listenerId, listener);

		return listener;
	}

	protected send(data: any): this {
		this
			.emitters
			.map(emitter => {
				let req = new Request(emitter, this.route, data);
				req.hub = emitter;
				req.method = emitter.method;
				req.route = emitter.route;
				return { request: req, emitter };
			})
			.forEach(pair => pair
				.emitter
				[EmitterRole.RECEIVER]
				.emit('*', pair.request)
			);
		return this;
	}


	onReceiverAdded(emitter: EmitterHub) {
		if (!emitter || !emitter.matcher.match(this.route)) { return; }

		this
			.emitters
			.push(emitter);
		
		this
			.receivers
			.forEach(receiver => emitter
				[EmitterRole.SENDER]
				.on(this.route, receiver.listener)
			);
	}

	protected onReceiverRemoved(emitter: EmitterHub) {
		if (!emitter) { return; }

		this.emitters = this
			.emitters
			.filter(e => e.id != emitter.id);
	}
}

export default SenderHandle;
