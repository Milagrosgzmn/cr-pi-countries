import { GET_COUNTRIES, SET_DISPLAYED,GET_ACTIVITIES, ADD_ACT,DELETE_ACT, SEARCH, ORDER_ABC, ORDER_NUM, FILTER_ACT,FILTER_CONT,FILTERS, RESET} from "../actions/actions";

const initialState = {
    countries: [],
    respaldoC:[],
    displayedCountries: [],
    filters:{
        activity:'',
        continent:'',
        orderAbc:'',
        orderNum:'',
    },
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

        case DELETE_ACT:
            let filteredAct = state.activities.filter(activity=> activity.id !== payload);

            return {
                ...state,
             activities: filteredAct,
            };

        case SEARCH:
            if (payload === null) {
                return {
                    ...state,
                    countries: [],
                };
            }
            return {
                ...state, 
                countries: payload,
            };
        case ORDER_ABC:
            let copia;
            if (payload==='Ascendente') {
                copia = state.countries.slice().sort((a,b)=> a.name < b.name ? -1 : 1);
            }
            if (payload==='Descendente') {
                copia = state.countries.slice().sort((a,b)=> a.name > b.name ? -1 : 1);
            }
            return {
                ...state,
                filters:{
                    orderAbc:payload,
                    orderNum:'',
                    continent: state.filters.continent,
                    activity: state.filters.activity,
                }, 
                countries: [...copia],
            };
        case ORDER_NUM:
            let miCopia;
            if (payload==="Ascendente") {
                miCopia = state.countries.slice().sort((a,b)=> a.population < b.population ? -1 : 1);
            }
            if (payload==="Descendente") {
                miCopia = state.countries.slice().sort((a,b)=> a.population > b.population ? -1 : 1);
            }
            
            return {
                ...state, 
                filters:{
                    orderNum:payload,
                    orderAbc:'',
                    continent: state.filters.continent,
                    activity: state.filters.activity,
                },
                countries: [...miCopia],
            };

        case FILTER_ACT:
          
            return {
                ...state,
                filters:{
                    continent: state.filters.continent,
                    activity: payload,
                }
            };
        case FILTER_CONT:
            
            return {
                ...state,
                filters:{
                    continent: payload,
                    activity: state.filters.activity,
                }
            };
        case FILTERS:
            let filtered;
            //ACTIVIDAD
            if (state.filters.activity && !state.filters.continent) {
                filtered = state.countries.filter( country =>{
                    let actividades = country.TouristActivities;
                
                    if (actividades.length !== 0) {

                        for (let i = 0; i < actividades.length; i++) {

                            if (actividades[i].nombre === state.filters.activity) {
                                return true;
                            }
                        }
                    } else {
                        return false;
                    }
                });
            }
            /// CONTINENT
            if (!state.filters.activity && state.filters.continent) {
                filtered = state.respaldoC.filter(country => country.continents[0]=== state.filters.continent);

            }

            //both
            if (state.filters.activity && state.filters.continent) {
                
                filtered = state.respaldoC.filter(country => country.continents[0]=== state.filters.continent);

                let filteredByBoth = filtered.filter( country =>{
                    let actividades = country.TouristActivities;
                    return actividades.some(actividad => actividad.nombre === state.filters.activity);
                });
                filtered = filteredByBoth;
            }


        return {
            ...state,
            countries: filtered,
            filters:{
                ...state.filters,
                orderAbc: '',
                orderNum: '',
            }
        };
        
        case RESET:
            return {
                ...state, 
                countries: state.respaldoC,
                filters:{
                    continent: '',
                    activity: '',
                    orderAbc: '',
                    orderNum: '',
                }
            };
        default:
            return {
               ...state, 
            };
    }

};
export default rootReducer;