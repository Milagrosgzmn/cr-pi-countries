import {useSelector, useDispatch} from 'react-redux';
import { useState } from 'react';
import { addActivity } from '../../redux/actions/actions';
import validation from './validation';

import style from './form.module.css';

export default function Form (){
     const {respaldoC} = useSelector((state)=>{
        return state;
    });
    const dispatch = useDispatch();

    const [activity, setActivity] = useState({
        nombre:'',
        dificultad:'',
        duracion:'',
        temporada:'',
        CountryId:[],
    });
    const [errors, setErrors] = useState({});

    function handleChange(event){

        if (event.target.name === 'CountryId' ) {
            if (activity.CountryId.includes(event.target.value)) {
                let filtrado = activity.CountryId.filter( country => country !== event.target.value);
                setActivity({
                    ...activity,
                    [event.target.name]: [...filtrado],
                });
                setErrors(
                    validation({
                    ...activity,
                    CountryId:[...filtrado],
                }))
            }else{
                setActivity({
                ...activity,
                [event.target.name]: [...activity.CountryId,`${event.target.value}`]
            });
            setErrors(
                validation({
                ...activity,
                [event.target.name]: [...activity.CountryId, `${event.target.value}`]
            }));
            }
            
        } else {
            setActivity({
            ...activity,
            [event.target.name]: `${event.target.value}`
        });
        setErrors(
            validation({
            ...activity,
            [event.target.name]: `${event.target.value}`
        }));
        }
        
        
    }
    function submitHandler (e){
        e.preventDefault();
        if(!errors.nombre && !errors.dificultad && !errors.temporada && !errors.CountryId){
            dispatch(addActivity(activity));
            setActivity({
                nombre:'',
                dificultad:'',
                duracion:'',
                temporada:'',
                CountryId:[],
            });
        }
       
    }

    return(
    <div className={style.formCont}>
        <h1>Completa el siguiente formulario para crear una nueva actividad turística</h1>
        <form onSubmit={submitHandler}>
            <label >Nombre: </label>
            <input 
            placeholder="Ingrese la actividad" 
            onChange={handleChange}  
            name="nombre" 
            value={activity.nombre} 
            type='text'/>
            {errors.nombre && <span className={style.error} >{errors.nombre} *</span>}

            <label >Dificultad: </label>
            <input 
            placeholder="Value la difultad del 1 al 5" 
            onChange={handleChange}  
            name="dificultad" 
            value={activity.dificultad} 
            type='text'/>
           {errors.dificultad && <span className={style.error} >{errors.dificultad} *</span>}

            <label >Duración: </label>
            <input 
            placeholder="Ingrese la duracion en horas" 
            onChange={handleChange}  
            name="duracion" 
            value={activity.duracion} 
            type='number'/>
            {errors.duracion &&<span className={style.error} >{errors.duracion} *</span>}

            <label >Temporada: </label>
            <input 
            placeholder="Ingrese la temporada" 
            onChange={handleChange}  
            name="temporada" 
            value={activity.temporada} 
            type=''/>
            {errors.temporada && <span className={style.error} >{errors.temporada} *</span>}

            <label >Paises: </label>
            <div className={style.checkCont}>
                { respaldoC.slice().sort((a,b)=> a.name < b.name ? -1 : 1).map(country =>(
                    <div className={style.checkInput} key={country.id}>
                    <input type="checkbox"
                        id = {`pais-${country.id}`}
                        name='CountryId'
                        value={`${country.id}`}
                        onChange={handleChange} />
                    <label htmlFor={`pais-${country.id}`} >{country.name.slice(0,1).toUpperCase()+country.name.slice(1)}</label>
                    </div>
                ))}
            </div>
            {errors.CountryId && <span className={style.error} >{errors.CountryId} *</span>}
            <button className={style.btnAgregar} onClick={submitHandler} type="submit">AGREGAR</button>
        </form>

    </div>
    );

};