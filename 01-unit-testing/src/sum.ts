// add a and b together and return sum 🤓
export const add = (a: number, b: number) => {
    return a + b; //this will pass the test
    //return 0; //this will fail the test
};


export const addInfinite = (...numbers: number[]) => { //create rest parameter (so i dont have to write numbers in [])
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    return sum;
};


// REDUCEEEEE
export const addReducer = (...numbers: number[]) => {
    return numbers.reduce((acc, curr) => acc + curr, 0);
};