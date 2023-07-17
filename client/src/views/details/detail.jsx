import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import style from './detail.module.css';

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

    return(
    <div className={style.detailCont}>
        {
         (error && <div><h1>{error}</h1></div>) || 
         <article>
         <div>
             <span><h1>{country.name}</h1><p>{country.id}</p></span>
             <div>
                 <h3>CONTINENTE</h3>
                 <p>{country.continents}</p>
             </div>
             <div>
                 <h3>CAPITAL</h3>
                 <p>{country.capital}</p>
             </div>
             <div>
                 <h3>SUBREGION</h3>
                 <p>{country.subregion}</p>
             </div>
             <div>
                 <h3>AREA</h3>
                 <p>{country.area}</p>
             </div>
             <div>
                 <h3>POBLACION</h3>
                 <p>{country.population}</p>
             </div>

         </div>
         <div>
             <img src={country.flags} alt={country.name} />
         </div>
     </article>
        }
    </div>
    );

};