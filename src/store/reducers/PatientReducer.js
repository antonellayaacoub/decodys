import { CLEAR_CREATE_Patient_STATE, 
    CREATE_Patient_LOADING, 
    CREATE_Patient_SUCCESS, 
    CREATE_Patient_ERROR, 
    CLEAR_GET_Patient_STATE,
    GET_PatientS_LOADING,
    GET_PatientS_SUCCESS,
    GET_PatientS_ERROR, 
    CLEAR_GET_SINGLE_Patient_STATE,
    GET_SINGLE_PatientS_LOADING,
    GET_SINGLE_PatientS_SUCCESS,
    GET_SINGLE_PatientS_ERROR,
    CLEAR_SEARCH_Patient_STATE,
    GET_SEARCH_PatientS_LOADING,
    GET_SEARCH_PatientS_SUCCESS,
    GET_SEARCH_PatientS_ERROR,
   UPDATE_Patient_LOADING,
   UPDATE_Patient_ERROR,
   UPDATE_Patient_SUCCESS,
   CLEAR_UPDATE_Patient_STATE,
   DELETE_Patient_ERROR,
   DELETE_Patient_SUCCESS,
   DELETE_Patient_LOADING,
   CLEAR_DELETE_Patient_STATE
} from "../actiontypes/Patients"


const initState = {
    createPatientState:"",
    getPatientState:"",
    getSinglePatientState:"",
    searchPatientState:"",
    editPatientState:"",
    deletePatientResponse:""
}


const PatientReducer = (state=initState, action) =>
{
    switch(action.type){
    

        case CLEAR_CREATE_Patient_STATE:
            return{
                ...state,
                createPatientState:""
            }
            case CREATE_Patient_LOADING:
                return{
                    ...state,
                createPatientState:"loading"
                }
        case CREATE_Patient_SUCCESS:
            return{
            ...state,
            createPatientState:action.res
        }

        case CREATE_Patient_ERROR:
            return {
           ...state,
           getPatientState:action.res
            }
        
        case CLEAR_GET_Patient_STATE:
            return{
                ...state,
                getPatientState:""
            }
            case GET_PatientS_LOADING:
                return{
                    ...state,
                getPatientState:"loading"
                }
        case GET_PatientS_SUCCESS:
            return{
            ...state,
            getPatientState:action.res
        }

        case GET_PatientS_ERROR:
            return {
           ...state,
           getPatientState:action.res
            }
       case CLEAR_GET_SINGLE_Patient_STATE:
            return{
                ...state,
                getSinglePatientState:""
            }
            case GET_SINGLE_PatientS_LOADING:
                return{
                ...state,
                getSinglePatientState:"loading"
                }
        case GET_SINGLE_PatientS_SUCCESS:
            return{
            ...state,
            getSinglePatientState:action.res
        }

        case GET_SINGLE_PatientS_ERROR:
            return {
           ...state,
           getSinglePatientState:action.res
            }

          case CLEAR_SEARCH_Patient_STATE:
            return{
                ...state,
                searchPatientState:""
            } 
            case GET_SEARCH_PatientS_LOADING:
                return{
                ...state,
                searchPatientState:"loading"
                }
        case GET_SEARCH_PatientS_SUCCESS:
            return{
            ...state,
            searchPatientState:action.res
        }

        case GET_SEARCH_PatientS_ERROR:
            return {
           ...state,
           searchPatientState:action.res
            }
        
            case CLEAR_UPDATE_Patient_STATE:
                return{
                    ...state,
                    editPatientState:""
                }
                case UPDATE_Patient_LOADING:
                    return{
                        ...state,
                    editPatientState:"loading"
                    }
            case UPDATE_Patient_SUCCESS:
                return{
                ...state,
                editPatientState:action.res
            }
    
            case UPDATE_Patient_ERROR:
                return {
               ...state,
               editPatientState:action.res
                }
            
             case CLEAR_DELETE_Patient_STATE:
                return{
                    ...state,
                    deletePatientResponse:""
                }
                case DELETE_Patient_LOADING:
                    return{
                        ...state,
                    deletePatientResponse:"loading"
                    }
            case DELETE_Patient_SUCCESS: 
              
                return{
                ...state,
                deletePatientResponse:action.res,
            }
    
            case DELETE_Patient_ERROR:
                return {
               ...state,
               deletePatientResponse:action.res
                }
            

        default:
            return state

    }
}


export default PatientReducer;