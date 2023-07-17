import { useSelector} from 'react-redux';
import Card from '../Card/card';

import style from './cardList.module.css';


export default function CardList (){

    let displayedCountries = useSelector((state)=>{
        return state.displayedCountries;
    });

    return(
    <div className={style.cardsList}>
        {displayedCountries.map(country =>(
            <Card country={country} key={country.name}></Card>
        ))}

    </div>
    );

};