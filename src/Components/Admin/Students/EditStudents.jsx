import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { editData, getItemById } from "../../../Hooks/useAxios";
import { getCountries, getStates } from "../../../Hooks/useFetchLocation";
import Succesfull from "../../Succesfull";

function EditStudent () {
    const navigate= useNavigate();
    const [item, setItem] = useState({});
    const [editedData, setEditedData] = useState({})
    const [fullName, setFullName] = useState('')
    const [location, setLocation] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [notFilled, setNotFilled] = useState(false);
    const [isSent, setIsSent] = useState(false);

 
    //Selecting the course id 
    const {id} = useParams();
    
    //Getting the course
    useEffect(() => {
            const fetchItem = async () => {
                const res = await getItemById('/users/' + id);
                setItem(res.data)
            };
            fetchItem();
        
    }, [id]);

    useEffect(() => {
        setFullName(item.fullName);
        setLocation(item.location);
        setPassword(item.password);
        setEmail(item.email);
      }, [item]);
    
    useEffect(() => {
      setEditedData({
        fullName,
        location,
        password,
        email
      })
    }, [fullName, location, password, email])

   const onLocationChange = ({target}) => {
        const {value} = target;
        setLocation(value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        
        //if in the formState there is an empty value, it will not be sent to the database
        if (Object.values(editedData).some(value => value === '' || value === 0)) {
          setNotFilled(true);
          return
      } else {
          setNotFilled(false);
          editData(editedData, '/users/' + id);
          setIsSent(true);
      }
    }

     //For the countries and cities dropdown list using thrid-party api
     const [states, setStates] = useState([]);
     const [selectedCountry, setSelectedCountry] = useState('');
     const [countries, setCountries] = useState([]);
     
     
   //To bring the countries
   useEffect(() => {
    (async function () {
        const countries = await getCountries();
        setCountries(countries);
    })()
  }, []);
  //To bring the states of the selected country
  useEffect(() => {
      (async function () {
          const states = await getStates(selectedCountry);
          setStates(states);
      })()
    }, [selectedCountry]);
    
    return (
        <>
          <div className="comps-btw-lists">
            {isSent && <Succesfull text={'Editado'} /> }
          <button className='back-button' onClick={() => navigate(-1)}>&lt;</button>

            <h1>Editando el estudiante: {item.fullName} </h1>
            <form onSubmit={handleSubmit } className="create-form">
                <h2>Editar nombre: </h2>
                
                        <>
                              <input 
                                className={fullName === '' ? 'empty' : ''}
                                type="text"
                                name='fullName'
                                value={editedData.fullName}
                                onChange={({target}) => setFullName(target.value)}
                              />
                              <span>Nuevo nombre: {fullName} </span>
                              
                          </>  
                                                  
                      <h2>Editar email: </h2>
                      
                          <>
                            <input 
                                className={email === '' ? 'empty' : ''}
                                type="text"
                                name='email'
                                value={editedData.email}
                                onChange={({target}) => setEmail(target.value)}
                              />
                            <span>Nuevo email: {email}</span>
                            
                          </>
                        
                      
                    <h2>Editar Ubicación: </h2>       
                    <select name="" value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)} >
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
                            <select name='location' value={location} onChange={onLocationChange}>
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
                        <p style={{marginBottom: '16px'}}> Ubicación: {editedData.location}</p>
                      
                      {/**Para llenar todos los campos*/
                        notFilled && <p className="error">Por favor llena todos los campos</p>
                      }
                <button  type="submit">Guardar cambios </button>           
            </form>
            </div>
        </>
    )   
}

export {EditStudent}