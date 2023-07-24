import { useState } from "react";

function useForm (intitialForm) {
    //Setting the login and creation formState.
    const [formState, setFormState] = useState(intitialForm);
    const onInputChange = ({ target }) => {
        const {name, value} = target;
        //If value is a number, add it in this conditional to parseInt
        if(name === 'ProgramId' || name === 'roleId') {
            const valueInt = parseInt(value);
            setFormState({
                ...formState,
                [name]: valueInt
            })
        } else {
            setFormState({
                ...formState,
                [name]: value
            });
        } 
    }
    
    const onResetForm = () => (
        setFormState(intitialForm)
    );

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,  
    }
}

export { useForm }
