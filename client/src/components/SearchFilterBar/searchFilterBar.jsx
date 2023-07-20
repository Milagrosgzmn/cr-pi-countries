import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {search,doesFilter , resetCountries, orderAbc, orderNum, filterByActivity, filterByContinent, setDisplayed} from '../../redux/actions/actions';
import { useOnKeyPress } from '../../hooks/useOnKeyPress';

import style from './searchFilterBar.module.css';

export default function SearchFilterBar (){
    const dispatch = useDispatch();

    const {activities, countries, respaldoC, filters} = useSelector( state =>{
        return state;
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [resultados, setResultado] = useState('');
    const [didSearch, setDidSearch] = useState(false);
    const [searchValue, setSearch] = useState('');

    function handleChange(e){
        setSearch(`${e.target.value}`);
        setErrorMessage('');
     }

  async function searchHandler (){
    let searchV = searchValue.trim();
    const endpoint = `http://localhost:3001/countries/name?name=${searchV}`;

        try {
            const {data} = await axios(endpoint);
            if (data) {
                dispatch(search(data));
                setDidSearch(true);
                setResultado(searchValue);
                setSearch('');
            }

        } catch (error) {
           setErrorMessage ('No se encontraron paises que coincidad con la busqueda');
           dispatch(search(null));
        }
    }
      
   

   useOnKeyPress(searchHandler, 'Enter');

   function handleOrderABC (event){ 
    dispatch(orderAbc(event.target.value));            
   }

   function handleOrderPopu (event){
    dispatch(orderNum(event.target.value));
    }

   function handleFilterC (event){
        dispatch(filterByContinent(event.target.value));
        dispatch(doesFilter());
    }

    function handleFilterA (event){
        dispatch(filterByActivity(event.target.value));
        dispatch(doesFilter());
    }

   function handleReset (event){
        event.preventDefault();
        dispatch(resetCountries());
        setResultado('')
        setDidSearch(false); 
        setSearch('')
        setErrorMessage('');    
   }

     return (
    <div className={style.container}>
       <div className={style.searchBar} >
            <input onChange={handleChange} value={searchValue} placeholder='Buscar...' type='search' />
            <button onClick={searchHandler}>BUSCAR</button>
      </div>
       <div className={style.filtros}>
             <div className={style.filtroHijo}>
                <h3>Filtrar por:</h3>
                    <select value={filters.continent} onChange={handleFilterC}  name="continent" id="continent">
                        <option value="" hidden="hidden">Continente</option>
                        <option value="Europe">Europe</option>
                        <option value="Africa">Africa</option>
                        <option value="Asia">Asia</option>
                        <option value="North America">América del Norte</option>
                        <option value="South America">América del Sur</option>
                        <option value="Oceania">Oceania</option>
                        <option value="Antarctica">Antarctica</option>
                    </select>

                    <select value={filters.activity} onChange={handleFilterA} name="actividades" id="activities">
                        <option value="" hidden="hidden">Actividad Turística</option>
                        {activities.map((activity)=>(
                            <option key={activity.id} value={activity.nombre}>{activity.nombre}</option>
                        ))}
                    </select>
         
            </div>
            <div className={style.filtroHijo}>
                <h3>Ordenar:</h3>
                    <select value={filters.orderAbc} onChange={handleOrderABC} name="alfabetico" id="ordenABC">
                        <option value="" hidden="hidden"> Alfabeticamente </option>
                        <option value="Ascendente">Ascendente</option>
                        <option value="Descendente">Descendente</option>
                    </select>
                    <select value={filters.orderNum} onChange={handleOrderPopu} name="poblacion" id="ordenPopulation">
                        <option value="" hidden="hidden">Por Población</option>
                        <option value="Ascendente">Ascendente</option>
                        <option value="Descendente">Descendente</option>
                    </select>
            </div>
        </div>

        <button onClick={handleReset} type='button'>Resetear Filtros</button>
          {errorMessage && <h2>{errorMessage}</h2>}
          { !errorMessage && didSearch && (countries !== respaldoC) && <h2>Resultados de busqueda para: {resultados}</h2>}
    </div>
     );

};