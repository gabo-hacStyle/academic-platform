import React from 'react';
import './Modals.css'
import { useNavigate } from 'react-router-dom';
const Succesfull = ({text}) => {
    const navigate = useNavigate();
    
    return (
        <div className='modal-container'>
            <div>
                <div className="modal-content success">
                    
                        <h1>{text} con éxito!</h1>
                        <button onClick={() => navigate('/admin')}>Ok</button>
                    
                </div>
                
            </div>  

        </div>
    );
}

export default Succesfull;