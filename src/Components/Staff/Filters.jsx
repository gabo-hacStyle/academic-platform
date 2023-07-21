import { useDispatch, useSelector } from "react-redux";
import { getFilters, setFilters } from "../../Slices/filtersSlice.js";
import './Filters.css'
import {  getData } from "../../Slices/dataSlice.js";
import { useEffect, useState } from "react";
import { ShowFilters } from './ShowFilters.jsx'
function Filters () {
  const dispatch = useDispatch();
  /**
   *   const courses = useSelector((state) => state.data.courses);
    const programs = useSelector((state) => state.data.programs);

   */
  const locations = useSelector((state) => state.filters.locations);
  const courses = [4, 55, 3, ]
  const genders = useSelector((state) => state.filters.genders) ;
  const ages = useSelector((state) => state.filters.ages);
  const programs = [5, 243, 4, 5, 3]
  const filters = useSelector((state) => state.filters.filters);
  //Estado para creacion de un modal
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  /**
  //Use effect to bring the getFilters
  useEffect(() => {
    dispatch(getData('/programs'))
    dispatch(getData('/courses'))
    dispatch(getFilters())
  }, [dispatch])
   */
  
  


      // Función para manejar el cambio en los filtros
      const handleFilterChange = (category, value) => {
        const newFilters = {
          ...filters,
          [category]: value,
        };
        dispatch(setFilters(newFilters));
      };
    
      // Función para enviar el query al backend
      const handleSubmit = () => {
        // Realizar la lógica de construir el query final con los valores de los filtros
        console.log(filters)
        //const query = buildQuery(filters);
        // Enviar el query al backend
        //sendQuery(query);

        setModal(!modal);
      };
    
      // Función para construir el query final con los valores de los filtros
      const buildQuery = (filters) => {
        // Codificar el objeto en una cadena de texto para URL
        const queryString = Object.entries(filters)
        .filter(([key, value]) => value.length > 0)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return value.map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`).join('&');
          }
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        })
        .join('&');

      // Construir la URL con el query
      const query = `/users?${queryString}`;
      return query;
      };
    
      // Función para enviar el query al backend
      /*const sendQuery = (query) => {
        console.log(query)
        dispatch(getData(query)); 
      };*/

      //funcion para limpiar los filtros
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
      //Funcion para cerrar los filtros
      const closeFilters = () => {
        setModal(!modal);
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
              {/*Locations rendered in a select html tag */}
                <span style={{fontSize: '0.8rem'}}>*Si seleccionas mal, limpia filtros</span>
                <select 
                    style={{marginTop: '.8rem'}}  
                    multiple
                    className="filter-selects"
                    value={filters.locations}
                    onChange={(e) => {
                      const { value } = e.target;
                      //make the value be an array of values eg. location: ['location1', 'location2']
                      handleFilterChange('locations',  [...filters.locations, value]);
                    }}
                >
                 
                  {locations.map((location) => (
                    <option key={location.id} value={location.name}>{location.name}</option>
                  ))}

                </select>
                    {/* Show the locations selected*/}
                    <ShowFilters
                      filters={filters.locations}
                    />


              
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
                  <h4> Rango de edades</h4>
                  <ul className="filters-list">
                    {ages.map((age) => (
                      <label  className="filters-label" key={age}>
                        <input

                          className="filter-inputs"
                          type="checkbox"
                          value={age}
                          checked={filters.ages.includes(age)}
                          onChange={(e) => {
                            const { checked, value } = e.target;
                            handleFilterChange('ages', checked ? [...filters.ages, value] : filters.ages.filter((item) => item !== value));
                          }}
                          />
                          {age}
                      </label>
                    ))}
                  </ul>
            </div>
            
            <div>
                  <h4>Cursos</h4>
                    <select 
                      className="filter-selects"
                      multiple
                      value={filters.courses}
                      onChange={(e) => {
                        const { value } = e.target;
                        handleFilterChange('courses',  [...filters.courses, value]);
                      }}
                  >
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>{course.description}</option>
                    ))}
                  
                  </select>
                  {/*show the courses selected */}
                  <ShowFilters
                    filters={filters.courses}
                    iterable={true}
                    list={courses}
                  />

            </div>
            
            <div>
                  <h4>Programas</h4>
                    <select
                      className="filter-selects"
                      multiple
                      value={filters.programs}
                      onChange={(e) => {
                        const { value } = e.target;
                        handleFilterChange('programs', [...filters.programs, value]);
                      }}
                  >
                    {programs.map((program) => (
                      <option key={program.id} value={program.id}>{program.description}</option>
                    ))}
                  
                  </select>

                  {/*show the programs selected */}
                  <ShowFilters
                    filters={filters.programs}
                    iterable={true}
                    list={programs}
                  />
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
                    {
                      /*Same, for the courses filter */
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
                      /*Same, for the ages filter */
                      filters.ages.length > 0 && (
                        <ShowFilters 
                          filters={filters.ages}
                          title={'Edades'}
                        />
                      )
                    }
                    {
                      /*Same, for the programs filter */
                      filters.programs.length > 0 && (
                        <ShowFilters
                          filters={filters.programs}
                          title={'Programa(s)'}
                          list={programs}
                          iterable={true} 
                        />
                      )
                    }
                </ul>
            </section>
            }
          </div>
        </>
      );
}

export {Filters}