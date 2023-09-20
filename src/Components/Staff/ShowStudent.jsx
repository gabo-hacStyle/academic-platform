import { useEffect, useState } from 'react'
import './ShowStudent.css'
//import { getAnything  } from '../../Hooks/useAxios';

function ShowStudent (props) {
    //State: enrrollments
    const [enrollments, setEnrollments] = useState([]);

    const id = props.id

    //If using axios 
    /**
     * 
        //Effect to bring an enpoint
        useEffect(() => {
            const fetchItem = async () => {
                const res = await getAnything(`/users/${id}/courses`);
                setEnrollments(res.data)
            };
            fetchItem();
        }, []);
     */
    
    
    return( 
        <div className="comps-btw-lists">

        <div className="student-page">
            <p>
                <b>Gender:</b> {
                    (props.genre === 'M' ? 'Masculino' : 'Femenino')
                }
            </p>
            <p>
                <b>Email: </b>
                  {props.email || 'No registrado'}
            </p>
            <p>
            <b>Location: </b>
                  {props.location || 'No registrado'}
            </p>
            <p>
            <b>Document: </b>
                  {props.documentNo || 'No registrado'}
            </p>
        

        </div>
            

        {
            /*
            If you have enrollments for eache student, you can bring them here and display their grades, for example
                <div className="list-container user-courses">
                    <h3>Cursos a los que estuvo / está registrado</h3>
                        <ul className="app-list">   
                            {
                                enrollments.map((item, index) => (
                                    <li key={index}>
                                        {item.description}:  {item.finalScore}.0
                                    </li>
                                ))
                            }

                        </ul>
                </div>
             */
        }
           
        </div>
    )
}
export {ShowStudent}