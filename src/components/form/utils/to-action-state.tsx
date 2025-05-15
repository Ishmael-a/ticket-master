import { ZodError } from "zod"


export const enum ActionStateStatus {
    SUCCESS= "SUCCESS",
    ERROR= "ERROR"
} 

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ActionState<T = any> = { 
    status? : ActionStateStatus;
    message : string;
    payload?: FormData;
    data?: T;
    fieldErrors?: Record<string, string[]|undefined>;
    timestamp: number
}

export const initialActionState: ActionState = {
    message: "",
    payload: undefined,
    fieldErrors: {},
    timestamp: Date.now()
}


export const fromErrorToActionState = (error: unknown, formData?: FormData): ActionState => {
    if(error instanceof ZodError) {
        return { 
            status: ActionStateStatus.ERROR,
            message: "", 
            fieldErrors: error.flatten().fieldErrors,
            payload: formData,
            timestamp: Date.now()
        };
    } else if(error instanceof Error){
        return { 
            status: ActionStateStatus.ERROR,
            message: error.message, 
            payload: formData,
            timestamp: Date.now()

        }
    } else {
        return { 
            status: ActionStateStatus.ERROR,
            message: "An unknown error occurred",
            payload: formData,
            timestamp: Date.now()
        }
    }
}


export const toActionState = (message: string, status: ActionStateStatus, formData?: FormData, data?: unknown): ActionState => {
    return { 
        status, 
        message: message, 
        fieldErrors: {},
        payload: formData,
        timestamp: Date.now(),
        data
    };
}
