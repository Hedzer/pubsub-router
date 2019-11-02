
import EmitterHub from './EmitterHub';
import Message from './Message';
import uid from 'yield-uid';
import EmitterRole from './EmitterRole';
import Router from './Router';
import HttpMethod from './RouterMethod';

const generator = uid.generator();

abstract class Handle<INBOUND extends Message, OUTBOUND extends Message> {
	constructor(router: Router, method: HttpMethod, emitters: EmitterHub[], route: string) {
		this.router = router;
		this.method = method;
		this.emitters = emitters;
		this.route = route;
	}

	public router: Router;
	public method: HttpMethod;
	public route: string;
	public emitters: EmitterHub[];
	public isDisabled: boolean = false;

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
			.forEach(emitter =>  {
				emitter
					[type]
					.removeListener('*', listeners.get(listenerId));

				this
					.router
					.store
					.events
					.emit(`removed ${type} ${emitter.method} ${emitter.route}`);
			});
		listeners.delete(listenerId);
		return this;
	}

	protected getId(): string {
		return generator.next().value;
	}

	protected defer(method: (...params: any) => any): this {
		setTimeout(method, 0);
		return this;
	}
}

export default Handle;
