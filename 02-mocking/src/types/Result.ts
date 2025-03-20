export type Result = {
	success: boolean;
	error?: string;
};


/* 
export type Result = { you can also do this 
    success: true; if its true, it does not contain error
} | {
	success: false; if its false, it contains error
	error: string;
}; */