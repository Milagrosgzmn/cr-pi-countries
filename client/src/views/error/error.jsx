import fondoError from '../../assets/errorPage.png';
import { Link } from 'react-router-dom';

import style from './error.module.css';

export default function Error (){

    return(
    <div className={style.errorCont} >
        <Link className={style.btnRegresar}  to='/home' >Regresar a Home</Link>
        <img src={fondoError} alt="Pagina no encontrada" />
        
    </div>
    );

};