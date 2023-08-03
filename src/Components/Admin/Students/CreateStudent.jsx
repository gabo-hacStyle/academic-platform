import { useNavigate } from "react-router-dom";
import { useState } from "react";
//File to manage a creation form
import { useForm } from "../../../Hooks/useForm";
import Succesfull from "../../Succesfull";
import { useEffect } from "react";
import { getCountries } from "../../../Hooks/useFetchLocation";
import '../Styles/creation.css'
import useLocalStorage from "../../../Hooks/useLocalStorage";

//Uncomment next line if using axios and comment the following 
//import { postData, getAnything } from "../../../Hooks/useAxios";

//If you need to create one more field or fix your fields to your needs:
//Manage them where the useForm is being manipulated:
    //-Add the fields' name in the destructuration
    //-Inside the function´s argument ({}) set the field and the type of variable
    //Eg: preferences: [],
    //If the value is a number, go to Hooks/useForm.js and add it in the conditional 
//Copy and paste the sample jsx code of any field (like email)
//And fix it according to the field you need

function CreateStudent () {
    const navigate = useNavigate();
    //States to check the form   
    const [notFilled, setNotFilled] = useState(false);
    const [isSent, setIsSent] = useState(false);

    //using localStorage, function addItem
    const {addItem} = useLocalStorage('users', [])

    //useForm object being manipulated
    //In the destructuration we bring the new state of the form and of all its fields
    //In the args we set the initial state
    //If wanna see how useForm is being used, go to Hooks/useForm.js
    const { fullName,  
            onInputChange, password, email,
            gender, location, documentNo, onResetForm, formState} 
            = useForm({
                fullName: '',
                password: '',
                email: '',
                documentNo: '',
                gender: '',
                location: '',
                //Student's role = 3
                roleId: 3
            });

    //State for the initial password 
    //in order to confirm if the user types the same pwd in both inputs
    const [initPsswd, setInitPsswd] = useState('');
        
    
    //For the countries dropdown list using thrid-party api
    const [countries, setCountries] = useState([]);
   
    //To bring the countries
    useEffect(() => {
        (async function () {
            const countries = await getCountries();
            setCountries(countries);
        })();
      }, []);
    

      //If using axios
    /**
     * 
     const handleSubmit = (e) => {
        e.preventDefault();

        //if in the formState there is an empty value, it will not be sent to the database
        //Also if you added another type of value, and you dont want it empty, 
        //add it to the conditional: Eg. || value === []      
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
     */
    
    //Comment this func if using axios
    const handleSubmit = (e) => {
            e.preventDefault(); 
            //if in the formState there is an empty value, it will not be sent to localStorage
           //Also if you added another type of value, and you dont want it empty, 
           //add it to the conditional: Eg. || value === []    
           if (Object.values(formState).some(value => value === '')) {
                setNotFilled(true);
                return 
            } else {  
                setNotFilled(false);
                addItem(formState)
                onResetForm();
                setIsSent(true);  
             }
        }



    return (
        <div className="comps-btw-lists">

            { isSent && <Succesfull text={'Created'} /> }
            
            <button className="back-button clickable" onClick={() => navigate(-1)}>&lt;</button>
            
            <div className="title">
                <h1>New Student </h1>
            </div>
        
            <form onSubmit={handleSubmit} className="create-form" method="post">
                <h2>Name:</h2>
                    <input
                        placeholder="Full name"
                        className={fullName === '' ? 'empty' : ''}
                        type="text" name='fullName' value={fullName} onChange={onInputChange} />
                <h2>Location: </h2>
                    <select 
                        className={location === '' ? 'empty' : ''}
                        name="location" value={location} onChange={onInputChange} >
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
                    
                        <p>{location}</p>
                    
                    <h2>Password:</h2>
                        <input
                            placeholder="Password"
                            className={initPsswd !== password ? 'error' : initPsswd === '' ? 'empty' : ''}
                            type="password" name='init-psswdd' onChange={
                                (e) => setInitPsswd(e.target.value)
                            } 
                        />

                    <h2>Confirm password:</h2>
                        {
                            password != '' ? (
                                initPsswd == password ? 
                                    <p>Passwords match</p> : <p>Passwords don't match</p>
                                ) 
                                : null 
                        }
                        <input 
                            placeholder="Confirm password"
                            className={initPsswd !== password ? 'error' : initPsswd === '' ? 'empty' : ''}
                            type="password" name='password' value={password} onChange={onInputChange} 
                        />
                    
                    <h2>Email</h2>
                        <input 
                            placeholder="Email"
                            className={email === '' ? 'empty' : ''}
                            type="email" name="email" onChange={onInputChange} value={email}
                        />                    
                    <h2>Document Number</h2>
                        <input
                            className={documentNo === '' ? 'empty' : ''}
                            type="number" name='documentNo' value={documentNo} onChange={onInputChange} />
                    <h2>Gender</h2>

                        <select
                            className={gender === '' ? 'empty' : ''}
                            name="gender" value={gender} onChange={onInputChange}>
                            <option value="">Select an option</option>
                            <option value="F">Female</option>
                            <option value="M">Male</option>
                        </select>

                { notFilled && <p className="error">Fill all the fields</p> }
                
                <button className='clickable' type="submit">Create </button>
            </form>


        </div>
    )
}
export {CreateStudent}