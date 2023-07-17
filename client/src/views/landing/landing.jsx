
import { Link } from "react-router-dom";

import style from './landing.module.css'

export default function Landing (){

    return(
    <div className={style.landing}>
        <h1 className={style.title}>BIENVENIDOS</h1>
        <Link to='/home'>
        <button className={style.btnIngresar} type="button" >INGRESAR</button>
        </Link>
        
    </div>
    );

};