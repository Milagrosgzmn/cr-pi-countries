import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {search, resetCountries, orderAbc, orderNum, filterByActivity, filterByContinent} from '../../redux/actions/actions';

import style from './searchFilterBar.module.css';

export default function SearchFilterBar (){
    const dispatch = useDispatch();

    const {activities} = useSelector( state =>{
        return state;
    });
    const [searchValue, setSearch] = useState('');
    const [orderFilter, setOrderFilter] = useState({
        orderAbcValue: '',
        orderPopuValue:'',
        continentValue:'',
        activitiesValue: '',
        });

    function handleChange(e){
        setSearch(`${e.target.value}`);
     }

   function searchHandler (event){
      event.preventDefault();
      dispatch(search(searchValue));

   }

   function handleReset (event){
    event.preventDefault();
    
    setOrderFilter({
        orderAbcValue: '',
        orderPopuValue:'',
        continentValue:'',
        activitiesValue: '',
    });
    setSearch('');
    dispatch(resetCountries());
   }

   function handleOrderABC (event){ 
    setOrderFilter((prevOrderFilter) => ({
        ...prevOrderFilter,
        orderAbcValue: event.target.value,
    }));   
    dispatch(orderAbc(event.target.value));
           
            
   }
   function handleOrderPopu (event){
    dispatch(orderNum(event.target.value));
    setOrderFilter({
        ...orderFilter,
        orderPopuValue: event.target.value,
    });
}

   function handleFilterC (event){
        dispatch(filterByContinent(event.target.value));
        setOrderFilter({
            ...orderFilter,
            continentValue: event.target.value,
        });
    }
    function handleFilterA (event){
        setOrderFilter({
            ...orderFilter,
            activitiesValue: event.target.value,
        });
        dispatch(filterByActivity(event.target.value));
    }

     return (
    <div className={style.container}>
       <div className={style.searchBar} >
            <input onChange={handleChange} value={searchValue} placeholder='Buscar...' type='search' />
            <button onClick={searchHandler}>BUSCAR</button>
      </div>
       <div className={style.filtros}>
            <div className={style.filtroHijo}>
                <h3>Ordenar:</h3>
                <div>
                    <select value={orderFilter.orderAbcValue} onChange={handleOrderABC} name="alfabetico" id="ordenABC">
                        <option value="" hidden="hidden"> Alfabeticamente </option>
                        <option value="A">Ascendente</option>
                        <option value="D">Descendente</option>
                    </select>
                </div>
                <div>
                    <select value={orderFilter.orderPopuValue} onChange={handleOrderPopu} name="poblacion" id="ordenPopulation">
                        <option value="" hidden="hidden">Por Población</option>
                        <option value="1">Ascendente</option>
                        <option value="2">Descendente</option>
                    </select>
                </div>
            </div>
            <div /* className={style.filtroHijo} */>
                <h3>Filtrar por:</h3>
                <div>
                    <select value={orderFilter.continentValue} onChange={handleFilterC}  name="continent" id="continent">
                        <option value="" hidden="hidden">Continente</option>
                        <option value="Europe">Europe</option>
                        <option value="Africa">Africa</option>
                        <option value="Asia">Asia</option>
                        <option value="America">America</option>
                        <option value="Oceania">Oceania</option>
                        <option value="Antarctica">Antarctica</option>
                    </select>
                </div>
                <div>
                    <select value={orderFilter.activitiesValue} onChange={handleFilterA} name="actividades" id="activities">
                        <option value="" hidden="hidden">Actividad Turística</option>
                        {activities.map((activity)=>(
                            <option key={activity.id} value={activity.nombre}>{activity.nombre}</option>
                        ))}
                    </select>
                </div>
            </div>
            <button onClick={handleReset} type='button'>Resetear Filtros</button>
        </div>
          { searchValue && <h2>Resultados de busqueda para: {searchValue}</h2>}
    </div>
     );

};