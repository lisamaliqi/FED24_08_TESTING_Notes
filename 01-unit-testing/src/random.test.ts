import { expect, it } from 'vitest';
import { getRandomNumber } from './random';

it('Generates a random number between 1-10', () => {
    const max = 10;
    const randomNumber = getRandomNumber(max);

    expect(randomNumber).toBeGreaterThanOrEqual(1);
    expect(randomNumber).toBeLessThanOrEqual(max);
});


//it.todo -> it is not implemented yet, skipped
it('Generates a random number between 1-50', () => {
    const max = 10;
    const randomNumber = getRandomNumber(max);

    expect(randomNumber).toBeGreaterThanOrEqual(1);
    expect(randomNumber).toBeLessThanOrEqual(max);
});



it('Generates 10 random numbers between 1-20', () => {
    const max = 10;
    
    for(let i = 0; i < max; i++) { //loop to create 10 random numbers
        const randomNumber = getRandomNumber(max);// generate the number 10 times

        expect(randomNumber).toBeGreaterThanOrEqual(1);
        expect(randomNumber).toBeLessThanOrEqual(max);
    }
});