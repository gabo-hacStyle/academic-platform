import { useState } from "react";

function useForm (intitialForm = {}) {
    const [formState, setFormState] = useState(intitialForm);
    const onInputChange = ({ target }) => {
        const {name, value} = target;
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
