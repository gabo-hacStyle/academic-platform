import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import '../Styles/editing.css'
import Succesfull from "../../Succesfull";
import { useSelector, useDispatch } from "react-redux";
import useLocalStorage from "../../../Hooks/useLocalStorage";
import { useForm } from "../../../Hooks/useForm";
//Uncomment next line if using axios
//import { editData, getItemById } from "../../../Hooks/useAxios";



//If you need to edit something else, for each field:
//-Add its own state
//-Update it when receiving the item 
//-Put it inside the editedData object
//Copy and paste the sample jsx code of any field (like edscription)
//And fix it according to the field you need


//In this component I'm just editing three fields: Description, programId and code

function EditCourse () {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    //Brings the programs, to edit the program which belongs the course
    const programs = useSelector((state) => state.data.programs);
    const courses = useSelector((state) => state.data.courses);
    //To get the course as an object
    //const [item, setItem] = useState({});
    
    //States to check the form
    const [notFilled, setNotFilled] = useState(false);
    const [isSent, setIsSent] = useState(false);

    //using localStorage, function editItem
    const {editItem} = useLocalStorage('courses');


    
    //Selecting the course id 
    const {id} = useParams();

    //Parsing id to number (with databases, you might delete this line)
    //Cuz the endpoint must be a string and the id's are mostly strings
    const parsedId = parseInt(id)

    const courseToEdit = courses.find((course) => course.id === parsedId);

    //Using the useForm hook 
    const {formState, onInputChange} = useForm(courseToEdit);
      
      
    
  //if using axios
  //To get the user as an object (if using databases, to bring only the object to be edited)
    //const [courseToEdit, setcourseToEdit] = useState({});
    /**
      * To bring the programs
      * useEffect(() => {
        dispatch(getData('/programs'))
      }, [])
    */
    /**
     * To bring the selected item that´ll be edited
     * useEffect(() => {
        const fetchItem = async () => {
            const res = await getItemById('/courses/' + id);
            setItem(res.data)
        };
        fetchItem();
    }, [id]);
     */

    /**
     * 
     * //Setting the fields with the values brought from the item  
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
     */
  

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
                {isSent && <Succesfull text={'Edited'} />}

                    <h1>{formState.description}</h1>
                    <form onSubmit={handleSubmit} className="create-form">
                      <h2>Name: </h2>
                      
                         
                          <>
                              <input 
                                className={formState.description === '' ? 'empty' : ''}
                                type="text"
                                name='description'
                                value={formState.description}
                                onChange={onInputChange}
                              />
                              <span style={{width: '80%'}}>Name: {formState.description} </span>
                              
                          </>
                        
                          <h2>Editar programa: </h2>       
                              <select className={formState.ProgramId == 0 ? 'empty' : ''} name='ProgramId' value={formState.ProgramId} onChange={onInputChange}>
                                <option value={0}>Select an option </option>
                                {
                                  programs.map(item => (
                                      <option 
                                        key={item.id}
                                        value={item.id}
                                      >
                                        {item.description}
                                      </option>
                                  ))
                                }
                              </select>

                      <h2>Code: </h2>
                      
                          
                            <input
                                className={formState.code === '' ? 'empty' : ''}
                                type="text"
                                name='code'
                                value={formState.code}
                                onChange={onInputChange}
                              />
                            <span style={{marginBottom: '9px'}}> Code: {formState.code}</span>
                      
                      
                              {notFilled && <p className="error">Fill all the fields</p>}

                              <button type="submit">Save changes </button>                        
                         </form>
                </div>
        </>    
    )
} 
export {EditCourse}