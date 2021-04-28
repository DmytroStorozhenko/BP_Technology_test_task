import {useState, useEffect, ChangeEvent, FormEvent} from 'react';
import {Validate} from "../helpers/validations_rules";

export const useForm = (
    callback: () => void,
    validate: (values: Validate) => Validate) => {

    const [values, setValues] = useState<Validate>({});
    const [errors, setErrors] = useState<Validate>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
            setValues({})
        }
    }, [errors]);

    const handleSubmit = (event: FormEvent) => {
        if (event) event.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setValues(values => ({...values, [event.target.name]: event.target.value}));
        setErrors({})
    };

    return {
        handleChange,
        handleSubmit,
        values,
        errors,
    }
};