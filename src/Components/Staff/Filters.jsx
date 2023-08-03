import { useDispatch, useSelector } from "react-redux";
import  { getFilters, setFilters } from "../../Slices/filtersSlice.js";
import './Filters.css'
import { useEffect, useState } from "react";
import { ShowFilters } from './ShowFilters.jsx'
import { getCountries, getStates } from "../../Hooks/useFetchLocation.js";
function Filters () {
  const dispatch = useDispatch();
  const genders = useSelector((state) => state.filters.genders);

   
  const filters = useSelector((state) => state.filters.filters);
  //Estado para creacion de un modal
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  //Funcion para cerrar los filtros
  const closeFilters = () => {
    setModal(!modal);
  }

  //This is to filter according to a location:
   //For the countries dropdown list using thrid-party api
   const [countries, setCountries] = useState([]);
  
   //To bring the countries
   useEffect(() => {
       (async function () {
           const countries = await getCountries();
           setCountries(countries);
       })();
     }, []);


    // Función para manejar el cambio en los filtros
      const handleFilterChange = (category, value) => {
        const newFilters = {
          ...filters,
          [category]: value,
        };
        dispatch(setFilters(newFilters));
      };
    

      //If using axios

    /**
     * 
     * // Building the query by using the filters selected
      const buildQuery = (filters) => {
        // Object to string for the query
        const queryString = Object.entries(filters)
        .filter(([key, value]) => value.length > 0)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return value.map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`).join('&');
          }
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        })
        .join('&');

        // Complete URL
        const query = `/users?${queryString}`;
        return query;
      };
    
      // Sending the query to the backend to create a new array with the  filtered students
      /*const sendQuery = (query) => {
        console.log(query)
        dispatch(getData(query)); 
      };

     *Handling the submit button
     * const handleSubmit = () => {
        console.log(filters)
        const query = buildQuery(filters);
        sendQuery(query);

        setModal(!modal);
      };
      

      */
     
      

      //To clean filters

      /*const clearFilters = () => {
        dispatch(setFilters({
          locations: [],
          courses: [],
          genders: [],
          ages: [],
          programs: [],
        }))
        dispatch(getData('/users'));
      }*/

      const handleSubmit =  (e) => {
        e.preventDefault();
        console.log(filters)
      }

      
    
      return (
        <>  
          <div className="comps-btw-lists">
            <header className="filters-header">

              <h2 onClick={toggle} className="clickable">Filtros  &gt;</h2> 
              <button className="clear-filters clickable" >Limpiar filtros</button>
            </header>
            {/*Modal ? seleccionar filtros : Mostrar filtros seleccionados*/}
            {modal ? (
              <>
              <div className="upper-show-filters">
                <span style={{fontSize: '0.8rem'}}>*No es necesario llenar todos los filtros</span>
                <button className="close-filters clickable" onClick={closeFilters}>Cerrar filtros</button>
              </div>
              
              <div>

              <h4>Ubicacion</h4>
                    <select 
                          onChange={(e) => {
                            const { value } = e.target; 
                            handleFilterChange('locations', value);
                          }
                        } >
                        <option value="">Select country</option>
                        {
                            countries.map(country => (
                                <option 
                                key={country.country_name}
                                value={country.country_name}>
                                    {country.country_name}
                                </option>
                            ))
                        }
                    </select>
                  <p>{filters.locations}</p>
                    
                      


              
            </div>
            <div>
                  <h4>Género</h4>
                  <ul className="filters-list">
                    {genders.map((gender) => (
                      <label  className="filters-label" key={gender}>
                        <input
                          className="filter-inputs"
                          type="checkbox"
                          value={gender}
                          checked={filters.genders.includes(gender)}
                          onChange={(e) => {
                            const { checked, value } = e.target; 
                            handleFilterChange('genders', checked ? [...filters.genders, value] : filters.genders.filter((item) => item !== value));
                          }}
                          />
                          {gender === 'M' ? 'Masculino' : 'Femenino'}
                      </label>
                    ))}
                  </ul>
            </div>
               
            <div>
              <button className='filters-btn clickable' onClick={handleSubmit}>Enviar</button>
            </div> 
              </>
            ):
            <section className="upper-list">
                <h3
                    style={{ marginBottom: '1rem' }}
                >Filtros aplicados:</h3>
                <ul>
                    {
                      /*Show the locations selected */
                        filters.locations.length > 0 && (
                            <ShowFilters
                                filters={filters.locations}
                                title={'Ubicación(es)'}
                            />
                        )
                    } 
                    {   
                        /*Show the genders selected */
                        filters.genders.length > 0 && (
                            <ShowFilters
                                filters={filters.genders}
                                title={'Género'}
                            /> 
                        )
                    } 
                    {/**If you have any filter that is instead of a string, an array of elements
                     * For example, courses or programs
                      {
                      filters.courses.length > 0 && (
                         <ShowFilters 
                          filters={filters.courses}
                          title={'Curso(s)'}
                          list={courses}
                          iterable={true}
                         />
                        )
                      }
                    
                      {
                        filters.programs.length > 0 && (
                        <ShowFilters
                          filters={filters.programs}
                          title={'Programa(s)'}
                          list={programs}
                          iterable={true} 
                        />
                      )
                      }
                      
                    
                      */
                    }
                    
                </ul>
            </section>
            }
          </div>
        </>
      );
}

export {Filters}