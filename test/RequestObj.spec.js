/// <reference types="mocha" />
const { expect } = require("chai")

const { RequestObj: Subject } = require("../lib/RequestObj")

describe("RequestObj", () => {
	describe("obj", () => {
		it("returns plain source object", () => {
			const sourceObj = { a: 1, b: 2 }
			const subject = new Subject(sourceObj)

			expect(subject.obj).to.be.instanceOf(Object).and
				.that.has.keys("a", "b").and
				.is.deep.equal(sourceObj)
		})
	})

	describe("with", () => {
		it("returns a mutated object with the value specified", () => {
			const changed = new Subject({ a: 1, b: 2 })
				.with("a", 42)

			expect(changed).to.be.instanceOf(Object)
				.that.has.keys("a", "b")
				.with.property("a", 42)
		})
		it("does not change source object", () => {
			const sourceObj = { a: 1, b: 2 }

			new Subject(sourceObj).with("a", 42)

			expect(sourceObj).to.have
				.keys("a", "b")
				.with.property("a", 1)
		})
		it("allows adding new keys (unlike ts)", ()=>{
			const changed = new Subject({ a: 1, b: 2 })
				.with("z", 42)

			expect(changed).to.be.instanceOf(Object)
				.that.has.keys("a", "b", "z")
				.with.property("z", 42)
		})
	})

	describe("without", () => {
		it("returns a mutated object without the specified key as undefined", () => {
			const changed = new Subject({ a: 1, b: 2 })
				.without("a")

			expect(changed).to.be.instanceOf(Object)
				.that.has.keys("a", "b")
				.with.property("a", undefined)
		})
		it("does not change source object", () => {
			const sourceObj = { a: 1, b: 2 }

			new Subject(sourceObj).without("a")

			expect(sourceObj).to.have
				.keys("a", "b").and
				.deep.equal(sourceObj)
		})
		it("allows adding new keys (unlike ts)", ()=>{
			const changed = new Subject({ a: 1, b: 2 })
				.without("z", 42)

			expect(changed).to.be.instanceOf(Object)
				.that.has.keys("a", "b", "z")
				.with.property("z", undefined)
		})
	})
})
