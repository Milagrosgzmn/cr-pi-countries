import { GET_COUNTRIES, SET_DISPLAYED,GET_ACTIVITIES, ADD_ACT, SEARCH, ORDER_ABC, ORDER_NUM, FILTER_ACT,FILTER_CONT, RESET} from "../actions/actions";

const initialState = {
    countries: [],
    respaldoC:[],
    displayedCountries: [],
    page:1,
    perPage:10,
    activities:[],
}

 const rootReducer = (state = initialState, {type, payload})=>{

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
                displayedCountries: state.countries.slice(from, to),
                page: payload,
            };
        case GET_ACTIVITIES:
            
            return {
                ...state, 
                activities: payload,
            };
        case ADD_ACT:
            
            return {
                ...state, 
                activities:[...state.activities, payload],
            };
        case SEARCH:
            return {
                ...state, 
                countries: payload,
            };
        case ORDER_ABC:
            let copia;
            if (payload==='A') {
                copia = state.countries.slice().sort((a,b)=> a.name < b.name ? -1 : 1);
            }
            if (payload==='D') {
                copia = state.countries.slice().sort((a,b)=> a.name > b.name ? -1 : 1);
            }
            return {
                ...state, 
                countries: [...copia],
            };
        case ORDER_NUM:
            let miCopia;
            if (payload==="1") {
                miCopia = state.countries.slice().sort((a,b)=> a.population < b.population ? -1 : 1);
            }
            if (payload==="2") {
                miCopia = state.countries.slice().sort((a,b)=> a.population > b.population ? -1 : 1);
            }
            
            return {
                ...state, 
                countries: [...miCopia],
            };
        case FILTER_ACT:
          
            let filteredA = state.respaldoC.filter( country =>{
                let actividades = country.TouristActivities;
               
                if (actividades.length !== 0) {

                    for (let i = 0; i < actividades.length; i++) {

                        if (actividades[i].nombre === payload) {
                            return true;
                        }
                    }
                } else {
                    return false;
                }
            });

            return {
                ...state,
                countries: filteredA, 
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
export default rootReducer;