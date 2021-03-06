
import Request from './Request';
import Response from './Response';
import EmitterHub from './EmitterHub';
import Handle from './Handle';
import Router from './Router';
import HttpMethod from './RouterMethod';
import EmitterRole from './EmitterRole';


class ReceiverHandle extends Handle<Request, Response> {
	constructor(router: Router, method: HttpMethod, emitters: EmitterHub[], route: string) {
		super(router, method, emitters, route);
	}

	public listeners: Map<string, (request: Request) => Response | void> = new Map<string, (request: Request) => Response | void>();

	respond(responder: (request: Request) => any, count: number = Infinity): this {
		let listener = this.createListener(responder, (res) => this.send(res), count);
		this
			.emitters
			.forEach(emitter => emitter
				[EmitterRole.RECEIVER]
				.on('*', listener)
			);

		return this;
	}

	respondOnce(responder: (request: Request) => Response): this {
		return this.respond(responder, 1);
	}

	subscribe(subscriber: (request: Request) => void, count: number = Infinity): this {
		let listener = this.createListener(subscriber, () => {}, count);
		this
			.emitters
			.forEach(emitter => emitter
				[EmitterRole.RECEIVER]
				.on('*', listener)
			);

		return this;
	}

	subscribeOnce(subscriber: (request: Request) => void): this {
		return this.subscribe(subscriber, 1);
	}

	broadcast(data: any): this {
		this
			.emitters
			.forEach(emitter => emitter
				[EmitterRole.SENDER]
				.eventNames()
				.map(event => new Request(emitter, <string>event, null))
				.map(req => new Response(req, data))
				.forEach(res => this.send(res))
			);

		return this;
	}

	remove(): this {
		this.removeAll(this.listeners, EmitterRole.RECEIVER);
		return this;
	}

	protected createListener(responder: (request: Request) => any, sender: (response: Response) => any, count: number = Infinity) {

		let sent = 0;
		let listenerId = this.getId();
		let listener = (req: Request) => {

			if (this.isDisabled) { return; }
			
			if (sent >= count) {
				this.removeListener(this.listeners, EmitterRole.RECEIVER, listenerId);
				return;
			}

			sent++;
			let response: Response | void;
			try {
				response = new Response(req, responder(req));
				sender(response);
			} catch (error) {
				if (response) {
					response.error = error;
				}
			}

			return response;
		};

		this
			.listeners
			.set(listenerId, listener);

		return listener;
	}

	protected send(response: Response): this {
		this
			.emitters
			.forEach(emitter => emitter
				[EmitterRole.SENDER]
				.emit(response.request.path, response)
			);
			
		return this;
	}
}

export default ReceiverHandle;
