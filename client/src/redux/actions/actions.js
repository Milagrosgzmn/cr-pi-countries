export const GET_COUNTRIES='GET_COUNTRIES';export const ADD_ACT = 'ADD_ACT';
export const RESET= 'RESET';
export const FILTER_CONT ='FILTER_CONT';
export const FILTER_ACT ='FILTER_ACT';
export const ORDER_ABC ='ORDER_ABC';
export const ORDER_NUM ='ORDER_NUM';



//export const DELETE_ACT = 'DELETE_ACT';
export const getCountries = ()=>{
    const endpoint = 'http://localhost:3001/countries';

    return async dispatch =>{
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

export const addActivity = (activity)=>{
    const endpoint = 'http://localhost:3001/activities';

    return async dispatch =>{
        try {
            const {data} = await axios.post(endpoint, activity);

            return dispatch ({
                type: ADD_ACT,
                payload: data,
            })
        } catch (error) {
            console.log(error.message);
        }
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
        type: ORDER_ABC,
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
        type: FILTER_CONT,
        payload: activity,
    };
};

/* export const deleteAct = (activity)=>{

}; */

