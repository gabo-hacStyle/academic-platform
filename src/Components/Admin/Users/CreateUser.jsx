import { useNavigate } from "react-router-dom"
import { postData } from "../../../Hooks/useAxios";
import { useForm } from "../../../Hooks/useForm";
import '../Styles/creation.css'
import { useState } from "react";
import Succesfull from "../../Succesfull";

function CreateUser () {
    const navigate = useNavigate();
    const [notFilled, setNotFilled] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const { 
        fullName, 
        password, 
        onInputChange,
        onResetForm, 
        formState, 
        roleId, 
        genre, email
        } = useForm({
        fullName: '',
        email: '',
        password: '',
        genre: '',
        roleId: 0  
    });
       //State for the initial password
       const [initPsswd, setInitPsswd] = useState('');

    
       //State to check if the form is filled
       const handleSubmit = (e) => {
           e.preventDefault();
   
           //if in the formState there is an empty value, it will not be sent to the database
               if (Object.values(formState).some(value => value === '')) {
                   setNotFilled(true);
                   return 
               } else {  
                setNotFilled(false);
                postData(formState, '/users')
                onResetForm();
                setIsSent(true);
               }
       }
    return (
        <div className="comps-btw-lists">
                        {isSent && <Succesfull text={'Creado'}/>}

            <button className="back-button clickable" onClick={() => navigate('/admin')}>&lt;</button>
            <div>
                <h1>Nuevo Usuario</h1>
            </div>
            <form onSubmit={handleSubmit} method="post" className="create-form">
                <h2>Nombre</h2>
                <input 
                    placeholder="Nombre completo"
                    className={fullName === '' ? 'empty' : ''}
                    type="text" name="fullName" onChange={onInputChange} value={fullName}/>

                
                        <h2>Contraseña</h2>
                            <input
                            placeholder="Contraseña"
                                className={initPsswd !== password ? 'error' : initPsswd === '' ? 'empty' : ''}
                                type="password" name='init-psswdd' onChange={
                                    (e) => setInitPsswd(e.target.value)
                                } />
                        <h2>Confirmar contraseña</h2>
                                {
                                    password != '' ? (initPsswd == password ? 
                                        <p>Las contraseñas coinciden</p> : <p>Las contraseñas no coinciden</p>) 
                                        : null 
                                }
                            <input 
                                placeholder="Confirmar contraseña"
                                className={initPsswd !== password ? 'error' : initPsswd === '' ? 'empty' : ''}
                                type="password" name='password' value={password} onChange={onInputChange} 
                            />
            

                <h2>Correo</h2>
                <input 
                    placeholder="Correo"
                    className={email === '' ? 'empty' : ''}
                    type="email" name="email" onChange={onInputChange} value={email}/>


                <h2>Rol</h2>
                    <select
                        className={roleId === 0 ? 'empty' : ''}
                        name="roleId" value={roleId} onChange={onInputChange}>
                        <option value="">Selecciona una opcion</option>
                        <option value={2}>Profesor</option>    
                        <option value={4}>Personal</option>
                    </select> 
                <h2>Género</h2>
                <select 
                    className={genre === '' ? 'empty' : ''}
                    name="genre" value={genre} onChange={onInputChange}>
                    <option value="">Selecciona una opcion</option>
                    <option value="F">Mujer</option>
                    <option value="M">Hombre</option>
                </select>              
                
                
                {notFilled && <p className="error">Por favor llena todos los campos</p>}

                <button type="submit">Enviar </button>

            </form>
        </div>
    )
}
export {CreateUser}