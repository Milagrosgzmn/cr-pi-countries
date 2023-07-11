import { GET_COUNTRIES, SET_DISPLAYED, ADD_ACT, ORDER_ABC, ORDER_NUM, FILTER_ACT,FILTER_CONT, RESET} from "../actions/actions";

const initialState = {
    countries: [],
    respaldoC:[],
    displayedCountries: [],
    page:1,
    perPage:10,
    activities:[],
    respaldoA:[],
}

export const rootReducer = (state = initialState, {type, payload})=>{

    switch (type) {
        case GET_COUNTRIES:
            
            return {
                ...state, 
                countries: payload,
                respaldoC: payload,
            };
        case SET_DISPLAYED:
            let from = (payload * state.perPage)-state.perPage;
            let to= payload * state.perPage;
            return {
                ...state,
                displayedCountries:state.countries.slice(from, to),
                page: payload,
            };
        case ADD_ACT:
            
            return {
                ...state, 
                activities:payload,
                respaldoA:payload,
            };
        case ORDER_ABC:
            let copia;
            if (payload==='A') {
                copia = state.respaldoC.sort((a,b)=> a.name < b.name ? -1 : 1);
            }
            if (payload==='D') {
                copia = state.respaldoC.sort((a,b)=> a.name > b.name ? -1 : 1);
            }
            return {
                ...state, 
                countries: copia,
            };
        case ORDER_NUM:
            let miCopia;
            if (payload==='A') {
                miCopia = state.respaldoC.sort((a,b)=> a.population < b.population ? -1 : 1);
            }
            if (payload==='D') {
                miCopia = state.respaldoC.sort((a,b)=> a.population > b.population ? -1 : 1);
            }
            return {
                ...state, 
                countries: miCopia,
            };
        case FILTER_ACT:
            
            return {
                ...state,
                activities: state.respaldoA.filter(activity => activity.nombre === payload), 

            };
        case FILTER_CONT:
            
            return {
                ...state, 
                countries: state.respaldoC.filter(country => country.continents[0]=== payload),
            };
        case RESET:
            
            return {
                ...state, 
                countries: state.respaldoC,
            };
        /* case DELETE_ACT:
            
            return {
                ...state,
             myFavorites: payload,
            }; */
    
        default:
            return {
               ...state, 
            };
    }

};