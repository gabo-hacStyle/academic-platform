import { useEffect } from 'react'
import './ShowStudent.css'
import { getEnrollments } from '../../Hooks/useAxios';
import { useState } from 'react';
//import { useEffect, useState } from "react";
//import { getItemById } from "../../Hooks/useAxios";

function ShowStudent (props) {
    //State: enrrollments
    const [enrollments, setEnrollments] = useState([]); 
    const id = props.id;   
    //Effect to bring an enpoint
    useEffect(() => {
        const fetchItem = async () => {
            const res = await getEnrollments(id);
            setEnrollments(res.data)
        };
        fetchItem();
    }, []);
    
    return( 
        <div className="comps-btw-lists">

        <div className="student-page">
        
            <p>
                <b>Género:</b> {
                    (props.genre === 'M' ? 'Masculino' : 'Femenino')
                }
            </p>
            <p>
                <b>Correo: </b>
                  {props.email || 'No registrado'}
            </p>
            <p>
            <b>Ubicación: </b>
                  {props.location || 'No registrado'}
            </p>
            <p>
            <b>Documento: </b>
                  {props.documentNo || 'No registrado'}
            </p>
            <p>
            <b>Fecha de nacimiento: </b>
                    {props.birthDate || 'No registrado'}
            </p>
            
            <p>
            <b>Última actualización: </b>
                    {props.updatedAt || 'No registrado'}
            </p>
            
                

        </div>
            

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
        </div>
    )
}
export {ShowStudent}