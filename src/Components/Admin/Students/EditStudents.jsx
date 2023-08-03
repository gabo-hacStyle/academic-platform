import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { getCountries } from "../../../Hooks/useFetchLocation";
import Succesfull from "../../Succesfull";
import useLocalStorage from "../../../Hooks/useLocalStorage";
import { useSelector } from "react-redux";
import { useForm } from "../../../Hooks/useForm";
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

    const {editItem} = useLocalStorage('users');

    

 
    //Selecting the user id from the URL
    const {id} = useParams();
    //Parsing id to number (with databases, you might delete this line)
    //Cuz the endpoint must be a string and the id's are mostly strings
    const parsedId = parseInt(id)


    const users = useSelector((state) => state.data.users)
    const userToEdit = users.find((user) => user.id === parsedId);

    //Using the useForm hook 
  const {formState, onInputChange} = useForm(userToEdit);
  //States to check the form
  const [notFilled, setNotFilled] = useState(false);
  const [isSent, setIsSent] = useState(false);
 
    
    //if using axios
    /**
      //To get the course as an object
    const [item, setItem] = useState({});
     * useEffect(() => {
        const fetchItem = async () => {
            const res = await getItemById('/users/' + id);
            setItem(res.data)
        };
        fetchItem();
    }, [id]);


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
     */

    
  

  //Using external api to get all locations arrount the world
  //Api accessable through axios, configure it in the 'Hooks/useAxios.js' file

  //For the countries and cities dropdown list
     const [countries, setCountries] = useState([]);
     
     
   //To bring the countries
   useEffect(() => {
      (async function () {
          const countries = await getCountries();
          setCountries(countries);
        })()
  }, []);
  

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
        
            const handleSubmit = (e) => {
              e.preventDefault()
              console.log('Submit')
              //If in the formState there is an empty value, it will not be sent to the database
              if (Object.values(formState).some(value => value === '' || value === 0)) {
                setNotFilled(true);
                return
              } else {
                setNotFilled(false);
                //Sending the new object to localStorage
                editItem(parsedId, formState)
                setIsSent(true);
              }
            
  
          }
    
    return (
        <>
          <div className="comps-btw-lists">
            {isSent && <Succesfull text={'Edited'} /> }

            <button className='back-button' onClick={() => navigate(-1)}>&lt;</button>

            <h1>Editing the student: {formState.fullName} </h1>
              <form onSubmit={handleSubmit } className="create-form">
                <h2>Name </h2>
                  <>
                        <input 
                          className={formState.fullName === '' ? 'empty' : ''}
                          type="text"
                          name='fullName'
                          value={formState.fullName}
                          onChange={onInputChange}
                        />
                        <span>New name: {formState.fullName} </span>       
                  </>

                    <h2>Email: </h2>          
                        <>
                          <input 
                              className={formState.email === '' ? 'empty' : ''}
                              type="text"
                              name='email'
                              value={formState.email}
                              onChange={onInputChange}
                          />
                          <span>New email: {formState.email}</span>  
                        </>
                        
                      
                    <h2>Location: </h2>       
                      <select name="location" value={formState.location} onChange={onInputChange} >
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

                        <p style={{marginBottom: '16px'}}>Location: {formState.location}</p>
                      
                      {notFilled && <p className="error">Fill all the fields</p>}

                <button  type="submit">Save changes</button>           
            </form>
            </div>
        </>
    )   
}

export {EditStudent}