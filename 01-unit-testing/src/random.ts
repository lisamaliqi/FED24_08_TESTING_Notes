// random number between 1-10
/* export const getRandomNumber = ( max = 10, arrayLength: number) => { //default value for max is 10
    return Array.from({ length: arrayLength }, () => Math.floor(Math.random() * max) + 1);
}; */


//johans example
export const getRandomNumber = ( max = 10) => { //default value for max is 10
    return Math.floor(Math.random() * max) + 1;
};