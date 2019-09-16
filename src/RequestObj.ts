export class RequestObj<T extends object> {
	private readonly _obj: T
	constructor(obj: T) {
		this._obj = obj
	}

	public without(key: keyof T): object {
		return this.with(key, undefined)
	}

	// tslint:disable-next-line: no-any
	public with(key: keyof T, value: any): object {
		const k: string = String(key)
		return Object.assign({}, this._obj, { [k]: value })
	}

	public get obj(): T {
		return this._obj
	}
}
