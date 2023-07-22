import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { getCountries, getStates } from "../../../Hooks/useFetchLocation";
import Succesfull from "../../Succesfull";
//Uncomment next line if using axios
//import { editData, getItemById } from "../../../Hooks/useAxios";



//If you need to edit something else, for each field:
//-Add its own state
//-Update it when receiving the item 
//-Put it inside the editedData object
//Copy and paste the sample jsx code of any field (like email)
//And fix it according to the field you need


//In this component I'm just editing three fields: FullName, location and Email
function EditStudent () {
    const navigate= useNavigate();
    //To get the course as an object
    const [item, setItem] = useState({});
    //States to set the edited data in all fields
    const [editedData, setEditedData] = useState({})
    const [fullName, setFullName] = useState('')
    const [location, setLocation] = useState('');
    const [email, setEmail] = useState('');
    //States to check the form
    const [notFilled, setNotFilled] = useState(false);
    const [isSent, setIsSent] = useState(false);

 
    //Selecting the course id  from the url 
    const {id} = useParams();
    
    //if using axios
    /**
     * useEffect(() => {
        const fetchItem = async () => {
            const res = await getItemById('/users/' + id);
            setItem(res.data)
        };
        fetchItem();
    }, [id]);
     */

    //Setting the fields with the values brought from the item
    useEffect(() => {
        setFullName(item.fullName);
        setLocation(item.location);
        setEmail(item.email);
      }, [item]);
    
    //When a field is changed, editedData Obj will update
    useEffect(() => {
      setEditedData({
        fullName,
        location,
        email
      })
    }, [fullName, location,  email])
  
    //Updating the location
   const onLocationChange = ({target}) => {
        const {value} = target;
        setLocation(value)
    }

  //Using external api to get all locations arrount the world
  //Api accessable through axios, configure it in the 'Hooks/useAxios.js' file

  //For the countries and cities dropdown list
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

    //Submitting button using axios
      /**
        const handleSubmit = (e) => {
          e.preventDefault();
          //If in the formState there is an empty value, it will not be sent to the database
          if (Object.values(editedData).some(value => value === '' || value === 0)) {
            setNotFilled(true);
            return
          } else {
            setNotFilled(false);
            //Sending the new object to db
            editData(editedData, '/users/' + id)
            setIsSent(true);
          }
        }
      */ 
        const handleSubmit = () => {
          console.log('Submit')
          }
    
    return (
        <>
          <div className="comps-btw-lists">
            {isSent && <Succesfull text={'Edited'} /> }

            <button className='back-button' onClick={() => navigate(-1)}>&lt;</button>

            <h1>Editing the student: {item.fullName} </h1>
              <form onSubmit={handleSubmit } className="create-form">
                <h2>Name </h2>
                  <>
                        <input 
                          className={fullName === '' ? 'empty' : ''}
                          type="text"
                          name='fullName'
                          value={editedData.fullName}
                          onChange={({target}) => setFullName(target.value)}
                        />
                        <span>New name: {fullName} </span>       
                  </>

                    <h2>Email: </h2>          
                        <>
                          <input 
                              className={email === '' ? 'empty' : ''}
                              type="text"
                              name='email'
                              value={editedData.email}
                              onChange={({target}) => setEmail(target.value)}
                          />
                          <span>New email: {email}</span>  
                        </>
                        
                      
                    <h2>Location: </h2>       
                      <select name="" value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)} >
                          <option value="">Select country</option>
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

                          {
                            (selectedCountry && states != null) && (
                              <select name='location' value={location} onChange={onLocationChange}>
                                  <option value="">Select state</option>
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
                            )
                          }

                        <p style={{marginBottom: '16px'}}>Location: {editedData.location}</p>
                      
                      {notFilled && <p className="error">Fill all the fields</p>}

                <button  type="submit">Save changes</button>           
            </form>
            </div>
        </>
    )   
}

export {EditStudent}