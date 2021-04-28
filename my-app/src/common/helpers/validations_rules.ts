export function Validate(values: Validate) {
    let errors: Validate = {};
    if (!values.name) errors.name = 'Name is required'
    else if (values.name.length > 100) errors.name = 'Name length must not exceed 100 characters'
    if (!values.description) errors.description = 'Description is required'
    return errors;
}

// types
export type Validate = {
    name?: string | undefined
    description?: string | undefined
}