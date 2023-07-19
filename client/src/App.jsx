import Home from './views/home/home';
import Activities from './views/activities/activities';
import Landing from './views/landing/landing';
import Error from './views/error/error';
import Detail from './views/details/detail';
import NavBar from './components/NavBar/navBar';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from "react";
import { getCountries, getActivities } from './redux/actions/actions';
import { useDispatch } from 'react-redux';

import './App.css'
import FormPage from './views/forPage/formPage';

function App() {

   const dispatch =  useDispatch();

   const rutas = ['/home', '/activities', '/activities/new'];
   
   let location = useLocation();

   useEffect(()=>{
      dispatch(getCountries());
  },[]);

  return (
    <div>
         { (location.pathname.includes('detail') || rutas.includes(location.pathname)) && <NavBar></NavBar>}
         
         <Routes>
            <Route path='/' element= {<Landing/>}/>
            <Route path='/home' element= {<Home/>}/>
            <Route path='/activities' element={<Activities/>} />
            <Route path='/activities/new' element={<FormPage/>} />
            <Route path='/detail/:id' element= {<Detail/>}/>
            <Route path='*' element= {<Error/>}/>
         </Routes>
     </div>
  )
}

export default App
