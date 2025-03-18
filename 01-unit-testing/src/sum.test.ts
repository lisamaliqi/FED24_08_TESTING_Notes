// UNIT TESTING
import { it, expect } from 'vitest';
import { add, addInfinite } from './sum';

//1. describe what to be tested
//2. test function (callback function)
it('should add two numbers', () => {
    const sum = add(1, 2); //3. i call the add function with arguments 1 and 2 for a and b
    expect(sum).toBe(3); //4. i expect sum to be 3, if no -> fail, if yes -> pass

    expect(add(3, 4)).toBe(7); //5. i can also test multiple cases
    expect(add(1337, 420)).toBe(1757); 
    expect(add(456, 123)).toBe(579); 
});


it('should add any infinite numbers', () => {
    expect(addInfinite(1, 2, 3)).toBe(6);
    expect(addInfinite(1, 2, 3, 4)).toBe(10);
    expect(addInfinite(1, 2, 3, 4, 5)).toBe(15);
    expect(addInfinite(1, 2, 3, 4, 5)).not.toBe('15'); //test to NOT be something (unnecessary in this case, just for demo purposes)
});