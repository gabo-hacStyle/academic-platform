import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import Succesfull from "../../Succesfull";

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

  //To get the course as an object
    const [item, setItem] = useState({});
  //States to set the edited data in all fields
    const [editedData, setEditedData] = useState({})
    const [fullName, setFullName] = useState('')
    const [roleId, setRoleId] = useState(0)
    const [email, setEmail] = useState('')
  //States to check the form
    const [notFilled, setNotFilled] = useState(false);
    const [isSent, setIsSent] = useState(false);
    
    //Selecting the course id from the URL
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
      setEmail(item.email);
      setRoleId(item.roleId);

    }, [item]);

    //When a field is changed, editedData Obj will update
    useEffect(() => {
      setEditedData({
          fullName,
          email,
          roleId,
      })
    }, [fullName, email, roleId, ])

    //Roles are numbers, so they need to parseInt
      const onRoleChange = ({target}) => {
        const {value} = target;
        const valueInt = parseInt(value);
        setRoleId(valueInt)
      }
      
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
            <button className='back-button' onClick={() => navigate(-1)}>&lt;</button>

            {isSent && <Succesfull text={'Edited'}/>}

            <h1>Editing user: {item.fullName} </h1>
            <form onSubmit={handleSubmit} className='create-form'>
                <h2>Name:</h2>
                  <>
                    <input 
                        className={fullName == '' ? 'empty': ''}  
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
                                className={email == '' ? 'empty': ''}
                                type="text"
                                name='email'
                                value={editedData.email}
                                onChange={({target}) => setEmail(target.value)}
                              />
                              <span>New email: {email} </span>
                          </>

                <h2>Role</h2>
                        {
                            //If you have set more user roles, you can add em manually as an opt 
                            //with their respective id

                            //If you have set other id to the roles, fix the code to your needs
                        }
                    <select className={roleId == 0 ? 'empty': ''}  value={roleId} onChange={onRoleChange}>
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