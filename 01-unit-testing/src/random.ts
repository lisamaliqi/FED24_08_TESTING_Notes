// random number between 1-10
export const getRandomNumber = (min: number, max: number, arrayLength: number) => {
    return Array.from({ length: arrayLength }, () => Math.floor(Math.random() * max) + min);
};