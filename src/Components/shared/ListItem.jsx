import React from 'react'
import { useNavigate } from "react-router-dom";

const ListItem = ({key , item, route}) => {
    const navigate = useNavigate();
    return (
        <>
            <li key={key} className="flex items-center justify-between">
                
                <span>{item.fullName}</span>
                <div className="w-3/12 gap-3 flex">
                <span>
                    Ver
                </span>
                <span>
                    <button
                    className="clickable"
                    onClick={() => {
                        navigate(route + item.id, {
                        state: {
                            id: item.id,
                        },
                        });
                    }}
                    >
                    Editar
                    </button>
                </span>
                </div>
                
                
                </li>
        </>
    )
}

export default ListItem