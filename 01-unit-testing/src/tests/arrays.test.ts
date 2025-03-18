import { describe, expect, it } from "vitest";
import { clone } from "../utils/arrays";

describe('clones an array', () => {
    const a = ['i', 'like', 'unit', 'testing'];
    const b = clone(a);

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