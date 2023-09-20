//import { useState } from "react";
import './WelcomePage.css'
import { useNavigate } from 'react-router-dom'
import { useForm } from "../../Hooks/useForm";
//import { useAuth } from "../../Hooks/auth";

function WelcomePage () {
    
    //Para que nos lleve a la pagina correspondiente
    const navigate = useNavigate();
    
    
    //Función para guardar el valor del input en user
    //const onChange = (event) => setUser(event.target.value);
    const { role, onInputChange, onResetForm, formState } = useForm({
        role: null
    });
    
    //función  para hacer login
    const enterEvent = (event) => {
        event.preventDefault();
        console.log(formState)
        if (formState.role === 'admin'){
            navigate('/admin')
        } else {
            navigate('/staff')
        }
        onResetForm();
    }

    return (
        <> 
            <div id="welcome">
                <h1 id="welcome-text">Welcome to Gabs academic Platform!</h1>
            </div>
            
            
            
            
               
                    <div className="form-login--container">
                        <form onSubmit={enterEvent}>
                            <h2>Good to have you once again here! What's your role in this platform?</h2>

                            <select name="role" value={role} onChange={onInputChange}>
                                <option value="">Choose your role</option>
                                <option value="admin">Admin</option>
                                <option value="staff">Staff</option>                     
                            </select>

                            
                            
                            <button className="login-button">Entrar</button>

                            
                            
                        </form>

                                                    
                    </div> 
        <br />
        <br />
                    This platform can display a database  of all the students registered in your Institute
                    If you are admin, you can create, edit and see all Students, Courses and Users (staff, for example)
                            , if you are a staff member, you are able to see all students registered in your Institute and their detals which you can add in the database
            
                       
        </>
    )
}

export {WelcomePage}