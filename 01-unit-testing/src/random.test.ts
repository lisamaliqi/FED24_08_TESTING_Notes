import { expect, it } from 'vitest';
import { getRandomNumber } from './random';

it('Generates a random number between 1-10', () => {
    const randomNumber = getRandomNumber(1, 10, 1);
    expect(randomNumber).toHaveLength(1);
    randomNumber.forEach((number) => {
        expect(number).toBeGreaterThanOrEqual(1);
        expect(number).toBeLessThanOrEqual(10);
    });
});


//it.todo -> it is not implemented yet, skipped
it('Generates a random number between 1-50', () => {
    const randomNumber = getRandomNumber(1, 50, 1);
    expect(randomNumber).toHaveLength(1);
    randomNumber.forEach((number) => {
        expect(number).toBeGreaterThanOrEqual(1);
        expect(number).toBeLessThanOrEqual(50);
    });
});



it('Generates 10 random numbers between 1-20', () => {
    const randomNumber = getRandomNumber(1, 20, 10);
    expect(randomNumber).toHaveLength(10);
    randomNumber.forEach((number) => {
        expect(number).toBeGreaterThanOrEqual(1);
        expect(number).toBeLessThanOrEqual(20);
    });
});