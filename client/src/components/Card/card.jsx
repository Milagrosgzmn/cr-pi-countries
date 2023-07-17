import {Link} from 'react-router-dom';

import style from './card.module.css';

export default function Card (props){

    const {country} = props;
    let [continent] = country.continents;
    
    return(
    <div className={style.cardContainer} >
        <Link to={`/detail/${country.id}`}>
        <div className={style.imgC}>
        <img src={country.flags} alt={country.name} />
        </div>
        <div className={style.datosC} >
            <h1>{country.name.slice(0,1).toUpperCase()+country.name.slice(1)}</h1>
            <h2>{continent}</h2>
        </div>
        </Link>
    </div>
    );

};