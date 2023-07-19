import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import style from '../activities/activities.module.css';
import styleDetail from './detail.module.css';

export default function Detail (){

    const {id}= useParams();
    const [country, setCountry] = useState({});
    const [error, setError] = useState('');

    useEffect(()=>{
        const getDetail = async () => {
             try {
                const {data} = await axios(`http://localhost:3001/countries/${id}`);
             if (data) {
                 setCountry(data);
             } 
             } catch (error) {
                setError('No se ha encontrado un país con ese ID');
             }
         }
         getDetail();
 
         return setCountry({});
      }, [id]);

      let paisNombre = country.name ? country.name.slice(0,1).toUpperCase()+country.name.slice(1) : '';

      let hasActivities = false;

      if (country.TouristActivities) {
            if (country.TouristActivities.length>0 ) {
                hasActivities = true;
            }
      }

    return(
    <div className={styleDetail.detailCont}>
        {
         (error && <div><h1>{error}</h1></div>) || 
         <article className={styleDetail.detail} >
         <span><h1>{paisNombre}</h1> <p>({country.id})</p></span>
         <div className={styleDetail.datosCont} >
             <div className={styleDetail.datos} >
                 <h3>CONTINENTE:</h3>
                 <p>{country.continents}</p>
             </div>
             <div className={styleDetail.datos} >
                 <h3>CAPITAL:</h3>
                 <p>{country.capital}</p>
             </div>
             <div className={styleDetail.datos} >
                 <h3>SUBREGION:</h3>
                 <p>{country.subregion}</p>
             </div>
             <div className={styleDetail.datos} >
                 <h3>AREA:</h3>
                 <p>{country.area} km2</p>
             </div>
             <div className={styleDetail.datos} >
                 <h3>POBLACION:</h3>
                 <p>{country.population}</p>
             </div>

         </div>
         <div  className={styleDetail.imgCont} >
             <img src={country.flags} alt={country.name} />
         </div>
     </article>
        }
        { hasActivities &&
            <div className={styleDetail.act} >
            <h3>Actividades que puede realizar aquí: </h3>
            {  country.TouristActivities.map(actividad =>(
                <div key={actividad.id} >{actividad.nombre.slice(0,1).toUpperCase()+actividad.nombre.slice(1)}</div>
            ))}
        </div>}
    </div>
    );

};