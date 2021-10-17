import * as caesar from "./caesar"
// @ponicode
describe("caesar.caesar", () => {
    test("0", () => {
        let object: any = [{ key0: "foo bar" }, { key0: "foo bar", key1: "This is a Text" }, { key0: "This is a Text", key1: "Foo bar" }, { key0: "Foo bar" }]
        let callFunction: any = () => {
            caesar.caesar("bed-free@tutanota.de", -1, { tables: object, maxShift: -100 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let object: any = [{ key0: "This is a Text", key1: "This is a Text", key2: "This is a Text", key3: "This is a Text" }, { key0: "foo bar", key1: "This is a Text", key2: "foo bar" }, { key0: "Foo bar" }]
        let callFunction: any = () => {
            caesar.caesar("something.example.com", 1, { tables: object, maxShift: 0 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            caesar.caesar("", NaN, { tables: [], maxShift: NaN })
        }
    
        expect(callFunction).not.toThrow()
    })
})
