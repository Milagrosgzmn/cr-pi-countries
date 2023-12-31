import axios from 'axios';

export const GET_COUNTRIES='GET_COUNTRIES';
export const SET_DISPLAYED = 'SET_DISPLAYED';

export const GET_ACTIVITIES ='GET_ACTIVITIES';
export const ADD_ACT = 'ADD_ACT';
export const DELETE_ACT = 'DELETE_ACT';

export const SEARCH = 'SEARCH';
export const RESET= 'RESET';


export const FILTER_CONT ='FILTER_CONT';
export const FILTER_ACT ='FILTER_ACT';
export const FILTERS ='FILTERS';

export const ORDER_ABC ='ORDER_ABC';
export const ORDER_NUM ='ORDER_NUM';

export const getCountries = ()=>{
    const endpoint = 'http://localhost:3001/countries';

    return async (dispatch) =>{
        try {
            
            const {data} = await axios(endpoint);
            return dispatch ({
                type: GET_COUNTRIES,
                payload: data,
            })

        } catch (error) {
            console.log(error.message);
        }
    }
};

export const getActivities = ()=>{
    const endpoint = 'http://localhost:3001/activities';

    return async (dispatch) =>{
        try {
            const {data} = await axios(endpoint);
            return dispatch ({
                type: GET_ACTIVITIES,
                payload: data,
            })

        } catch (error) {
            console.log(error.message);
        }
    }
};

export const setDisplayed = (page)=>{
    return {
        type: SET_DISPLAYED,
        payload: page,
    }
};

export const addActivity = (activity)=>{
    const endpoint = 'http://localhost:3001/activities';

    return async (dispatch) =>{
        try {
            const {data} = await axios.post(endpoint, activity);

            return dispatch ({
                type: ADD_ACT,
                payload: data,
            })
        } catch (error) {
            alert('No se ha podido crear la actividad');
            console.log(error.message);
        }
    }
};
export const deleteAct = (id)=>{
    const endpoint = `http://localhost:3001/activities/${id}`;

    return async (dispatch)=>{
        try {
            await axios.delete(endpoint)
            return (dispatch) ({
                type: DELETE_ACT,
                payload: id,
            });
        } catch (error) {
            console.log(error.message);
        }
    }
    
};

export const search = (datos)=>{
   return {
    type: SEARCH,
    payload: datos
   }
};

export const resetCountries = ()=>{
     return {
        type: RESET,
     };
};
export const orderAbc = (order)=>{
    return {
        type: ORDER_ABC,
        payload: order,
    };
};
export const orderNum = (order)=>{
    return {
        type: ORDER_NUM,
        payload: order,
    };
};
export const filterByContinent = (continent)=>{
    return {
        type: FILTER_CONT,
        payload: continent,
    };
};
export const filterByActivity = (activity)=>{
    return {
        type: FILTER_ACT,
        payload: activity,
    };
};
export const doesFilter = ()=>{
    return {
        type: FILTERS,
    };
};

