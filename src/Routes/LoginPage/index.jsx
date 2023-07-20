import { useState } from "react";
import './LoginPage.css'
import { useNavigate } from 'react-router-dom'
import { useForm } from "../../Hooks/useForm";
import { useAuth } from "../../Hooks/auth";

function LoginPage () {
    const   auth = useAuth();
    //Para que nos lleve a la pagina correspondiente
    const navigate = useNavigate();
    //State para mostrar error
    const [error, setError] = useState(false);
    
    //Función para guardar el valor del input en user
    //const onChange = (event) => setUser(event.target.value);
    const { email, password, onInputChange, onResetForm } = useForm({
        email:'',
        password: '',
    });
    
    //función  para hacer login
    const loginEvent = (event) => {
        event.preventDefault();
        const user = {
            email: email,
            password: password,
        }
        //Sending user to auth, if it returns true, redirect to admin or staff. If false, show error
        auth.login(user)
        onResetForm();

    }

    return (
        <> 
            <div id="welcome">
                <h1 id="welcome-text">Bienvenido!</h1>
            </div>
            
            
            {
                error && (
                    <div className='modal-container'>
                        <div>
                            <div className="modal-content error">
                                
                                    <h1>Datos incorrectos</h1>
                                    <button onClick={() => setError(false)}>Volver</button>
                            </div>
                            
                        </div>  
    
                    </div>
                )
                

            }
            
               
                    <div className="form-login--container">
                        <form onSubmit={loginEvent}>
                            <h2>Login</h2>
                            <input 
                                placeholder="Usuario"
                                name="email" 
                                type="email"
                                value={email}
                                onChange={onInputChange} 
                            />
                            
                            <input 
                                placeholder="Contraseña" 
                                type="password" 
                                name='password' 
                                value={password} 
                                onChange={onInputChange} 
                            />
                            
                            <button className="login-button">Entrar</button>
                            
                        </form>
                    </div> 
                
            
                       
        </>
    )
}

export {LoginPage}