import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { editData, getItemById } from "../../../Hooks/useAxios";
import '../Styles/editing.css'
import Succesfull from "../../Succesfull";
//Uncomment next line if using axios
//import { editData, getItemById } from "../../../Hooks/useAxios";



//If you need to edit something else, for each field:
//-Add its own state
//-Update it when receiving the item 
//-Put it inside the editedData object
//Copy and paste the sample jsx code of any field (like email)
//And fix it according to the field you need


//In this component I'm just editing three fields: Description, programId and code

function EditCourse () {
  const navigate = useNavigate()
    //To get the course as an object
    const [item, setItem] = useState({});
    const [editedData, setEditedData] = useState({})
    const [description, setDescription] = useState('')
    const [code, setCode] = useState('')
    const [program, setProgram] = useState(0)
    const [notFilled, setNotFilled] = useState(false);
    const [isSent, setIsSent] = useState(false);


    
    //Selecting the course id 
    const {id} = useParams();
    
 //if using axios
    /**
     * useEffect(() => {
        const fetchItem = async () => {
            const res = await getItemById('/courses/' + id);
            setItem(res.data)
        };
        fetchItem();
    }, [id]);
     */

  //Setting the fields with the values brought from the item  
    useEffect(() => {
      setDescription(item.description);
      setCode(item.code);
      setProgram(item.ProgramId);
    }, [item]);

  //When a field is changed, editedData Obj will update
    useEffect(() => {
      setEditedData({
        description,
        code,
        ProgramId: program
      })
    }, [description, code, program])

    //Roles are numbers, so they need to parseInt
      const onProgramChange = ({target}) => {
        const {value} = target;
        const valueInt = parseInt(value);
        setProgram(valueInt)
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
            editData(editedData, '/courses/' + id)
            setIsSent(true);
          }
        }
      */ 

    return (
         <>
                <div className="comps-btw-lists">
                <button className='back-button' onClick={() => navigate(-1)}>&lt;</button>
                {isSent && <Succesfull text={'Editado'} />}

                    <h1>{item.description}</h1>
                    <form onSubmit={handleSubmit} className="create-form">
                      <h2>Editar nombre del curso: </h2>
                      
                         
                          <>
                              <input 
                                className={editedData.description === '' ? 'empty' : ''}
                                type="text"
                                name='description'
                                value={editedData.description}
                                onChange={({target}) => setDescription(target.value)}
                              />
                              <span style={{width: '80%'}}>Nuevo nombre: {description} </span>
                              
                          </>
                        
                          <h2>Editar programa: 
                      </h2>       
                              <select className={program == 0 ? 'empty' : ''} value={program} onChange={onProgramChange}>
                                <option value={0}>Seleccionar opción</option>
                                <option value={2}>Maestría en teología bíblica del NT </option>
                                <option value={3}>Maestría en Estudios Teológicos con énfasis en Pastoral Urbana - Única</option>
                                <option value={4}>Maestría en Ministerio y Liderazgo - Única</option>
                                <option value={5}>Electivas Ministerio y Liderazgo: Consejería & Liderazgo - Única</option>
                                <option value={6}>Maestría en Teologia Bíblica del NT - Única</option>
                                <option value={7}>Cursos de Pre-grado - Única</option>
                                <option value={8}>Electivas Maestría en Estudios Teológicos con énfasis en Pastoral Urbana - Única</option>
                              </select>

                      <h2>Editar código del curso: </h2>
                      
                          
                            <input
                                className={editedData.code === '' ? 'empty' : ''}
                                type="text"
                                name='code'
                                value={editedData.code}
                                onChange={({target}) => setCode(target.value)}
                              />
                            <span style={{marginBottom: '9px'}}>Nuevo código: {code}</span>
                      
                      
                              {notFilled && <p className="error">Por favor llena todos los campos</p>}

                              <button type="submit">Guardar cambios </button>                        
                         </form>
                </div>
        </>    
    )
} 
export {EditCourse}