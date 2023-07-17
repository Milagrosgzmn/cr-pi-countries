import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import icono from '../../assets/icono.png';
import style from './navBar.module.css';

export default function NavBar (){
    const location = useLocation();

    return(
    <div className={style.nav} >
        <div className={style.icono}>
        <Link to='/home'> <img  src={icono} alt="icono de la pagina" /></Link>
        </div>
        <div className={style.links} >
            { location.pathname !=='/activities' && <Link to='/activities'>Actividades Turisticas</Link>}
            { location.pathname !=='/home' && <Link to='/home' >Paises</Link>}
            { location.pathname !=='/activities/new' && <Link to='/activities/new' >Nueva Actividad</Link>}
        </div>
      </div>
    );

};