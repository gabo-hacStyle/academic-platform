import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { editData, getItemById } from "../../../Hooks/useAxios";
import Succesfull from "../../Succesfull";

function EditUser() {
  //Navigate
  const navigate = useNavigate()
  //To get the course as an object

    const [item, setItem] = useState({});
    const [editedData, setEditedData] = useState({})
    const [fullName, setFullName] = useState('')
    const [roleId, setRoleId] = useState(0)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [notFilled, setNotFilled] = useState(false);
    const [isSent, setIsSent] = useState(false);
    
    //Selecting the course id 
    const {id} = useParams();

    //Getting the user
    useEffect(() => {
        const fetchItem = async () => {
            const res = await getItemById('/users/' + id);
            setItem(res.data)
        };
        fetchItem();
    
}, [id]);
useEffect(() => {
    setFullName(item.fullName);
    setEmail(item.email);
    setRoleId(item.roleId);
    setPassword(item.password);

  }, [item]);
  useEffect(() => {
    setEditedData({
        fullName,
        email,
        roleId,
        password
    })
  }, [fullName, email, roleId, password])

      const onRoleChange = ({target}) => {
        const {value} = target;
        const valueInt = parseInt(value);
        setRoleId(valueInt)
      }
      
      const handleSubmit = (e) => {
        e.preventDefault();
        //if in the formState there is an empty value, it will not be sent to the database
        if (Object.values(editedData).some(value => value === '' || value === 0)) {
          setNotFilled(true);
          return

      } else {
          setNotFilled(false);
          editData(editedData, '/users/' + id)
          setIsSent(true);
        }
      } 
    
    return (
        <>
          <div className="comps-btw-lists"> 
          <button className='back-button' onClick={() => navigate(-1)}>&lt;</button>

            {isSent && <Succesfull text={'Editado'}/>}
            <h1>Editando el usuario: {item.fullName}</h1>
            <form onSubmit={handleSubmit} className='create-form'>
                <h2>Editar nombre del Usuario: </h2>
                      
                          <>
                              <input 
                                className={fullName == '' ? 'empty': ''}  
                                type="text"
                                name='fullName'
                                value={editedData.fullName}
                                onChange={({target}) => setFullName(target.value)}
                              />
                              <span>Nuevo nombre: {fullName} </span>
                          </>
                          
                        
                <h2>Editar email del estudiante: </h2>
                     
                    
                          <>
                              <input 
                                className={email == '' ? 'empty': ''}
                                type="text"
                                name='email'
                                value={editedData.email}
                                onChange={({target}) => setEmail(target.value)}
                              />
                              <span>Nuevo email: {email} </span>
                          </>
                          

                
                      <h2>Editar rol</h2>
                      <select className={roleId == 0 ? 'empty': ''}  value={roleId} onChange={onRoleChange}>
                        <option value="0">Selecciona una opcion</option>
                        <option value={2}>Profesor</option>    
                        <option value={4}>Personal</option>
                    </select>
                    {
                      notFilled && <p className="error">Por favor, rellena todos los campos</p>
                    }
                    <button type="submit">Guardar cambios </button>                        

            </form>
          </div>
        </>
    )   
}

export {EditUser}