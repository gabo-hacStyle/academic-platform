import { useNavigate } from "react-router-dom";
import { useState } from "react";
//File to manage a creation form
import { useForm } from "../../../Hooks/useForm";
import Succesfull from "../../Succesfull";
import { useEffect } from "react";
import useLocalStorage from "../../../Hooks/useLocalStorage";
//Uncomment next line if using axios
//import { postData, getAnything } from "../../../Hooks/useAxios";

//If you need to create one more field or fix your fields to your needs:
//Manage them where the useForm is being manipulated:
    //-Add the fields' name in the destructuration
    //-Inside the function´s argument ({}) set the field and the type of variable
    //Eg: preferences: [],
    //If the value is a number, go to Hooks/useForm.js and add it in the conditional 
//Copy and paste the sample jsx code of any field (like email)
//And fix it according to the field you need

function CreateUser () {
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
    const { 
            fullName, 
            password, 
            onInputChange,
            roleId, 
            gender, email,
            onResetForm, 
            formState, 
        } = useForm({
            fullName: '',
            email: '',
            password: '',
            gender: '',
            roleId: 0  
        });

       //State for the initial password 
       //in order to confirm if the user types the same pwd in both inputs
       const [initPsswd, setInitPsswd] = useState('');
    
       //If using axios
       /**
        * const handleSubmit = (e) => {
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

            <button className="back-button clickable" onClick={() => navigate('/admin')}>&lt;</button>
            
            <div>
                <h1>New User</h1>
            </div>
            
            <form onSubmit={handleSubmit} method="post" className="create-form">
                <h2>Name:</h2>
                    <input 
                        placeholder="Full name"
                        className={fullName === '' ? 'empty' : ''}
                        type="text" name="fullName" onChange={onInputChange} value={fullName}
                    />

                
                <h2>Password:</h2>
                    <input
                        placeholder="Contraseña"
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


                <h2>Rol</h2>
                    <select
                        className={roleId === 0 ? 'empty' : ''}
                        name="roleId" value={roleId} onChange={onInputChange}
                    >
                        {
                            //If you have set more user roles, you can add em manually as an opt 
                            //with their respective id

                            //If you have set other id to the roles, fix the code to your needs
                        }
                        <option value="">Select an option</option>
                        <option value={2}>Teacher</option>    
                        <option value={4}>Staff</option>
                    </select>

                <h2>Gender</h2>
                    <select 
                        className={gender === '' ? 'empty' : ''}
                        name="gender" value={gender} onChange={onInputChange}
                    >
                        <option value="">Select an option</option>
                        <option value="F">Female</option>
                        <option value="M">Male</option>
                    </select>              
                
                
                { notFilled && <p className="error">Fill all the fields</p> }

                <button className="clickable" type="submit">Create </button>

            </form>
        </div>
    )
}
export {CreateUser}