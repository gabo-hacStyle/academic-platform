function ShowFilters (props) {
    
    return (

        <div className="show-filters">
            {/* Condicional para validar, si es courses o programs*/}
            {props.iterable ?
                        <div>
                        <h3>{props.title ? props.title +':' : null}</h3>
                            {props.filters.map((course, index) => (
                                <>  
                                    {
                                        props.list.map((c) => {
                                            if(c.id === parseInt(course)){
                                            return <span key={index}>{c.description}, </span>
                                            }
                                        })
                                    }
                                </>
                            )) }
                        </div>

                :
                        <div>
                        <h3>{props.title ? props.title +':' : null}</h3>
                            {props.filters.map((i, index) => (
                                <>
                                    {/* Validar si es masculino o femenino u otro valor*/}
                                    {i === "M" ?
                                        <span key={index}>-Masculino </span>
                                    :
                                        i === "F" ?
                                            <span key={index}>-Femenino </span>
                                        :
                                        <span key={index}>{i}, </span>
                                    }
                                </>
                                )) 
                            }
                        </div>  
            }       
        </div>

    )
}
export {ShowFilters}