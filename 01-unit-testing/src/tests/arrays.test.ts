import { describe, expect, it, beforeEach } from "vitest";
import { clone } from "../utils/arrays";

describe('clones an array', () => {
    const a = ['i', 'like', 'unit', 'testing'];
    let b: any[] = []; 

    beforeEach(() => { //do this function before every it in this describe block
        b = clone(a);
    });
    


    it('contains the same numbers of items', () => {
        // expect(b.length).toBe(a.length);
        expect(b).toHaveLength(a.length);
    });


    it('contains the same items', () => {
        expect(b).toStrictEqual(a);
    });


    it('is a different array', () => {
        expect(b).not.toBe(a);
    });
}); 


describe('clone an array successfully', () => {
    const a = ['i', 'like', 'unit', 'testing'];
    const b = clone(a);

    it('successfully clones an array', () => {
        expect(b).toHaveLength(a.length);
        expect(b).toStrictEqual(a);
        expect(b).not.toBe(a);
    });
});