import React from "react";
import styles from './FormsControls.module.css'
import {Field} from "redux-form";

const FormControl = ({meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>

    )
}

// создаём контейнер над обычной textarea.
export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><textarea {...restProps} {...input}></textarea></FormControl>
} // meta создаёт redux-form и кидает в props.

// создаём контейнер над обычной textarea.
export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><input {...restProps} {...input} /></FormControl>
} // meta создаёт redux-form и кидает в props.

export const createField = (placeholder, name, validators, component, props = {}, text = '') => (
    <div>
        <Field placeholder={placeholder} name={name} validate={validators} component={component} {...props} />
        {text}
    </div>
)