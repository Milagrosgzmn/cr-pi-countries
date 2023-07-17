import { useSelector } from 'react-redux';

import style from './activities.module.css';

export default function Activities (){

    let {activities} = useSelector((state)=>{
        return state;
    });
    

    return(
    <div className={style.activitiesCont}>
        <h1>Lista de Actividades: </h1>
        <div>
        {
          activities.map(activity =>(
            <div key={activity.id}>
                <div><img src="" alt="" /></div>
                <div>
                    <h2>{activity.nombre}</h2>

                    <p>Dificultad: {activity.dificultad}</p>

                    {activity.duracion && <p>Duracion: {activity.duracion}</p>}

                    <p>Temporada: {activity.temporada}</p>

                    <p>Paises en los que puedes realizar esta actividad: 
                        {activity.Countries.map( (country, i) =>(
                            <span key={i} > {country.name.slice(0,1).toUpperCase()+country.name.slice(1)} </span>
                        ))}
                    </p>
                </div>
            </div>
          ))  
        }
        </div>
    </div>
    );

};