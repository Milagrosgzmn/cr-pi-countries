import { useDispatch, useSelector } from 'react-redux';
import {deleteAct} from '../../redux/actions/actions';

import style from './activities.module.css';
import { useEffect, useState } from 'react';
import { getActivities } from '../../redux/actions/actions';

export default function Activities (){
    const dispatch = useDispatch();

    let {activities} = useSelector((state)=>{
        return state;
    });

    useEffect(()=>{
        dispatch(getActivities());
        
    },[]);

    function deleteHandler (id){
        dispatch(deleteAct(id));

    }

    let hasActivities = activities.length < 1 ? false : true;

    return(
    <div className={style.activitiesCont}>
       { ( !hasActivities && <h1>No se encontraron actividades</h1>) ||
        <h1>Lista de Actividades: </h1>}
        <div className={style.actList}>{
          activities?.map(activity =>(
            <div className={style.activity} key={activity.id}>
                <button className={style.btnDelete} onClick={()=>(deleteHandler(activity.id))}>X</button>
                { activity.imagen && <div className={style.imgCont} ><img src="" alt="" /></div>}
                <div className={style.datosCont}>
                    <h2>{activity.nombre.slice(0,1).toUpperCase()+activity.nombre.slice(1)}</h2>
                    <div className={style.datos} >
                        <h3>Dificultad: </h3>
                        <p>{activity.dificultad}</p>
                    </div>
                    <div className={style.datos} >
                        <h3>Duracion: </h3>
                        {activity.duracion && <p>{activity.duracion} Hs</p>}
                    </div>
                    <div className={style.datos} >
                        <h3>Temporada: </h3>
                        <p>{activity.temporada.slice(0,1).toUpperCase()+activity.temporada.slice(1)}</p>
                    </div>
                    <div >
                        <h4>Paises en los que puedes realizar esta actividad: </h4>
                        <p>
                            {activity.Countries.map( (country, i) =>{
                                if(i===activity.Countries.length-1) {
                                    return <span key={i} > {`${country.name.slice(0,1).toUpperCase()+country.name.slice(1)}.`} </span>                
                                }else{
                                    return <span key={i} > {` ${country.name.slice(0,1).toUpperCase()+country.name.slice(1)},`} </span>
                                    
                                }
                            }
                            
                            )}
                        </p>
                    </div>
                </div>
            </div>
          ))  
        }
        </div>
    </div>
    );

};