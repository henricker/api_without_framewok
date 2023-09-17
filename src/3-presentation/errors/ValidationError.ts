import { BaseError } from "../../shared/errors/BaseError";

type ValidationErrorDetails = {
    field: string
    error: string
}

export class ValidationError extends BaseError {
    constructor(public readonly details: ValidationErrorDetails[]) {
        super({ statusCode: 422, message: 'Some fields are invalid' })
    }
}