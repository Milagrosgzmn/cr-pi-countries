import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { setDisplayed } from '../../redux/actions/actions';
import CardList from '../../components/CardList/cardList';
import SearchFilterBar from '../../components/SearchFilterBar/searchFilterBar';

import style from './home.module.css';

export default function Home (){

    let {page, countries, perPage} = useSelector((state)=>{
        return state;
    });
    const dispatch = useDispatch();
    let pages=[];
    let numPaginas = Math.ceil(countries.length/perPage);
    for (let i = 1; i <= numPaginas; i++) {
        pages.push(i);
    }

    useEffect(()=>{
        dispatch(setDisplayed(page));
    },[countries]);

    const previousHandler = ()=>{
        page--;
        dispatch(setDisplayed(page));
    };
    const pagerHandler = (page)=>{
        dispatch(setDisplayed(page));

    };
    const nextHandler = ()=>{
        page++;
        dispatch(setDisplayed(page));
    };


    return(
    <div className={style.home}>
        <SearchFilterBar/>
        <CardList></CardList>
        <div>
            {page !== 1 && <button onClick={previousHandler}>Anterior</button>}
            {  pages.slice(page-1, page+2).map(num =>(
                <button onClick={()=>(pagerHandler(num))} key={num}>{num}</button>
            ))}
            {page < pages.length &&<button onClick={nextHandler} >Siguiente</button>}
        </div>
    </div>
    );

};