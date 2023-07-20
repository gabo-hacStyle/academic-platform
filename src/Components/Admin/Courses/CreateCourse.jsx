import { useNavigate } from "react-router-dom";
import { useForm } from "../../../Hooks/useForm";
import { postData } from "../../../Hooks/useAxios";
import { useState } from "react";
import Succesfull from "../../Succesfull";

function CreateCourse () {
    const navigate = useNavigate()
    const [notFilled, setNotFilled] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const { description, code, onInputChange, onResetForm, formState, ProgramId } = useForm({
        description: '',
        code: '',
        ProgramId: 0
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        //if in the formState there is an empty value, it will not be sent to the database
        if (Object.values(formState).some(value => value === '' || value === 0)) {
            setNotFilled(true);
            return 
        } else {  
            setNotFilled(false);
            postData(formState, '/courses')
            onResetForm();
            setIsSent(true);
        }
    }
    return (
        <div className="comps-btw-lists">
            {isSent && <Succesfull text={'Creado'}/>}
            <button className='back-button' onClick={() => navigate(-1)}>&lt;</button>
            <div className="title">
                <h1>Nuevo Curso</h1>
            </div>

            <form onSubmit={handleSubmit} className="create-form" method="post">
                <h2>Nombre:</h2>
                    <input
                    className={description === '' ? 'empty' : ''}
                    type="text" name="description" value={description} onChange={onInputChange} />
                <h2>Codigo</h2>

                    <input 
                    className={code === '' ? 'empty' : ''}
                    type="text" name='code' value={code} onChange={onInputChange}/>
                <h2>Programa </h2>
                <select className={ProgramId === 0 ? 'empty' : ''} name="ProgramId" value={ProgramId} onChange={onInputChange}>
                    <option value={0}>Seleccionar opción</option>
                    <option value={2}>Maestría en teología bíblica del NT </option>
                    <option value={3}>Maestría en Estudios Teológicos con énfasis en Pastoral Urbana - Única</option>
                    <option value={4}>Maestría en Ministerio y Liderazgo - Única</option>
                    <option value={5}>Electivas Ministerio y Liderazgo: Consejería & Liderazgo - Única</option>
                    <option value={6}>Maestría en Teologia Bíblica del NT - Única</option>
                    <option value={7}>Cursos de Pre-grado - Única</option>
                    <option value={8}>Electivas Maestría en Estudios Teológicos con énfasis en Pastoral Urbana - Única</option>
                </select>   

                {notFilled && <p className="error">Por favor llena todos los campos</p>}

                <button className='clickable' type="submit">Enviar </button>
            </form>

        
        </div>
    )
}
export {CreateCourse}