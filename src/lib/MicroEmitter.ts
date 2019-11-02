import uid from 'yield-uid';

const functionId = Symbol.for('functionId');
const generator = uid.generator();

class MicroEmitter {
	private events: Map<string, Map<Symbol, Function>> = new Map<string, Map<Symbol, Function>>();

	on(eventName: string, listener: Function): this {
		if (!this.events.has(eventName)) { this.events.set(eventName, new Map<Symbol, Function>()); }
		const events = this.getEvents(eventName);
		let fn = <any>listener;
		let id = fn[functionId] || generator.next().value;
		fn[functionId] = id;
		events.set(id, listener);
		return this;
	}

	eventNames() {
		return [ ...this.events.keys() ];
	}

	emit(eventName: string, ...data: any): this {
		if (!this.events.has(eventName)) { return this; }

		this.getEvents(eventName).forEach(fn => fn(...data))
		return this;
	}

	removeListener(eventName: string, listener: Function): this {
		let fn = <any>listener;
		if (!fn[functionId] || !this.events.has(eventName)) { return this; }
		
		this.getEvents(eventName).delete(fn[functionId]);
		return this;
	}

	private getEvents(eventName: string): Map<Symbol, Function> {
		return (<Map<Symbol, Function>>this.events.get(eventName));
	}
}

export default MicroEmitter;
