import { useNavigate } from "react-router-dom";
//import { useContext } from "react";
//import { AppContext } from "../../../Context/AppContext";
import { useForm } from "../../../Hooks/useForm";
import {  postData } from "../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { getCountries, getStates } from "../../../Hooks/useFetchLocation";
import Succesfull from "../../Succesfull";

function CreateStudent () {
    const navigate = useNavigate();
    const [notFilled, setNotFilled] = useState(false);
    const [isSent, setIsSent] = useState(false);
   
    //Form logic
    const { fullName,  
         onInputChange, onResetForm, password, formState, email,
        genre, location, documentNo } = useForm({
        fullName: '',
        password: '',
        email: '',
        documentNo: '',
        genre: '',
        location: '',
        RoleId: 3
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

    

    //For the countries and cities dropdown list using thrid-party api
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
   
    //To bring the countries
    useEffect(() => {
        (async function () {
            const countries = await getCountries();
            setCountries(countries);
        })();
      }, []);
    //To bring the states of the selected country
    useEffect(() => {
        (async function () {
            const states = await getStates(selectedCountry);
            setStates(states);
        })();
      }, [selectedCountry]);


    return (
        <div className="comps-btw-lists">
            {isSent && <Succesfull text={'Creado'}/>}
            <button className="back-button clickable" onClick={() => navigate(-1)}>&lt;</button>
            <div className="title">
                <h1>Nuevo Estudiante</h1>
            </div>
        
            <form onSubmit={handleSubmit} className="create-form" method="post">
                <h2>Nombre:</h2>
                    <input
                        placeholder="Nombre completo"
                        className={fullName === '' ? 'empty' : ''}
                        type="text" name='fullName' value={fullName} onChange={onInputChange} />
                <h2>Ubicación </h2>
                    <select 
                        className={location === '' ? 'empty' : ''}
                        name="" value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)} >
                        <option value="">Selecciona tu pais</option>
                        {
                            countries.map(country => (
                                <option 
                                key={country.country_name}
                                value={country.country_name}>
                                    {country.country_name}
                                </option>
                            ))
                        }
                    </select>
                        {(selectedCountry && states != null) && (
                            <select name='location' value={location} onChange={onInputChange}>
                                <option value="">Selecciona tu estado</option>
                                    {
                                    states.map(state => (
                                        <option 
                                        key={state.state_name}
                                        value={state.state_name}
                                        >
                                        {state.state_name}
                                        </option>
                                    ))
                                    }
                            </select>
                        )}
                    <p>{location}</p>
                    
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
                        type="email" name='email' value={email} onChange={onInputChange} />
                    <h2>Numero de documento</h2>
                    <input
                        className={documentNo === '' ? 'empty' : ''}
                        type="number" name='documentNo' value={documentNo} onChange={onInputChange} />
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
export {CreateStudent}