import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
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


//In this component I'm just editing three fields: FullName, Role and Email
function EditUser() {
  //Navigate
  const navigate = useNavigate()
  //using localStorage, function editItem
  const {editItem} = useLocalStorage('users');
  //Selecting the user id from the URL
  const {id} = useParams();
  //Parsing id to number (with databases, you might delete this line)
  //Cuz the endpoint must be a string and the id's are mostly strings
  const parsedId = parseInt(id)
 
  const users = useSelector((state) => state.data.users)
  const userToEdit = users.find((user) => user.id === parsedId);
 
  ////States to set the edited data in all fields
  //Using the useForm hook 
  const {formState, onInputChange} = useForm(userToEdit);
 // const [roleId, setRoleId] = useState(0)
  //States to check the form
    const [notFilled, setNotFilled] = useState(false);
    const [isSent, setIsSent] = useState(false);
    
    
    //if using axios
    //To get the user as an object (if using databases, to bring only the object to be edited)
    //const [userToEdit, setUserToEdit] = useState({});

    /**
     * useEffect(() => {
        const fetchItem = async () => {
            const res = await getItemById('/users/' + id);
            setItem(res.data)
        };
        fetchItem();
    }, [id]);
     */
    
  
    
    /**
     * 
     * //Setting the fields with the values brought from the item
    //Also setting them when editing in the inputs 
    useEffect(() => {
      setFullName(userToEdit.fullName);
      setEmail(userToEdit.email);
      setRoleId(userToEdit.roleId);

    }, [userToEdit]);

    //When a field is changed, editedData Obj will update
    useEffect(() => {
      setEditedData({
          fullName,
          email,
          roleId,
      })
    }, [fullName, email, roleId, ])
     */
    

    //Roles are numbers, so they need to parseInt
      
    /**const onRoleChange = ({target}) => {
        const {value} = target;
        const valueInt = parseInt(value);
        setRoleId(valueInt)
      }*/
      
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
            <button className='back-button' onClick={() => navigate(-1)}>&lt;</button>

            {isSent && <Succesfull text={'Edited'}/>}

            <h1>Editing user: {userToEdit.fullName} </h1>
            <form onSubmit={handleSubmit} className='create-form'>
                <h2>Name:</h2>
                  <>
                    <input 
                        className={formState.fullName == '' ? 'empty': ''}  
                        type="text"
                        name='fullName'
                        value={formState.fullName}
                        onChange={onInputChange}
                    />

                      <span>Name: {formState.fullName} </span>
                  </>    
                <h2>Email: </h2>
                          <>
                              <input 
                                className={formState.email == '' ? 'empty': ''}
                                type="text"
                                name='email'
                                value={formState.email}
                                onChange={onInputChange}
                              />
                              <span>New email: {formState.email} </span>
                          </>

                <h2>Role</h2>
                        {
                            //If you have set more user roles, you can add em manually as an opt 
                            //with their respective id

                            //If you have set other id to the roles, fix the code to your needs
                        }
                    <select className={formState.roleId == 0 ? 'empty': ''}  name='roleId' value={formState.roleId} onChange={onInputChange}>
                      <option value="0">Select an option</option>
                      <option value={2}>Teacher</option>    
                      <option value={4}>Staff</option>
                    </select>

                  {notFilled && <p className="error">Fill all the fields</p>}

                    <button type="submit">Save changes </button>
            </form>
          </div>
        </>
    )   
}

export {EditUser}

function a () {
  const users = [1, 2, 3, 4]
  const e =  users.find(user => user === 1);
  return e;
}