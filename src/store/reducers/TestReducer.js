import { CLEAR_CREATE_Test_STATE, 
    CREATE_Test_LOADING, 
    CREATE_Test_SUCCESS, 
    CREATE_Test_ERROR, 
    CLEAR_GET_Test_STATE,
    GET_TestS_LOADING,
    GET_TestS_SUCCESS,
    GET_TestS_ERROR, 
    CLEAR_GET_SINGLE_Test_STATE,
    GET_SINGLE_TestS_LOADING,
    GET_SINGLE_TestS_SUCCESS,
    GET_SINGLE_TestS_ERROR,
    CLEAR_SEARCH_Test_STATE,
    GET_SEARCH_TestS_LOADING,
    GET_SEARCH_TestS_SUCCESS,
    GET_SEARCH_TestS_ERROR,
   UPDATE_Test_LOADING,
   UPDATE_Test_ERROR,
   UPDATE_Test_SUCCESS,
   CLEAR_UPDATE_Test_STATE,
   DELETE_Test_ERROR,
   DELETE_Test_SUCCESS,
   DELETE_Test_LOADING,
   CLEAR_DELETE_Test_STATE
} from "../actiontypes/Tests"


const initState = {
    createTestState:"",
    getTestState:"",
    getSingleTestState:"",
    searchTestState:"",
    editTestState:"",
    deleteTestResponse:""
}


const TestReducer = (state=initState, action) =>
{
    switch(action.type){
    

        case CLEAR_CREATE_Test_STATE:
            return{
                ...state,
                createTestState:""
            }
            case CREATE_Test_LOADING:
                return{
                    ...state,
                createTestState:"loading"
                }
        case CREATE_Test_SUCCESS:
            return{
            ...state,
            createTestState:action.res
        }

        case CREATE_Test_ERROR:
            return {
           ...state,
           getTestState:action.res
            }
        
        case CLEAR_GET_Test_STATE:
            return{
                ...state,
                getTestState:""
            }
            case GET_TestS_LOADING:
                return{
                    ...state,
                getTestState:"loading"
                }
        case GET_TestS_SUCCESS:
            return{
            ...state,
            getTestState:action.res
        }

        case GET_TestS_ERROR:
            return {
           ...state,
           getTestState:action.res
            }
       case CLEAR_GET_SINGLE_Test_STATE:
            return{
                ...state,
                getSingleTestState:""
            }
            case GET_SINGLE_TestS_LOADING:
                return{
                ...state,
                getSingleTestState:"loading"
                }
        case GET_SINGLE_TestS_SUCCESS:
            return{
            ...state,
            getSingleTestState:action.res
        }

        case GET_SINGLE_TestS_ERROR:
            return {
           ...state,
           getSingleTestState:action.res
            }

          case CLEAR_SEARCH_Test_STATE:
            return{
                ...state,
                searchTestState:""
            } 
            case GET_SEARCH_TestS_LOADING:
                return{
                ...state,
                searchTestState:"loading"
                }
        case GET_SEARCH_TestS_SUCCESS:
            return{
            ...state,
            searchTestState:action.res
        }

        case GET_SEARCH_TestS_ERROR:
            return {
           ...state,
           searchTestState:action.res
            }
        
            case CLEAR_UPDATE_Test_STATE:
                return{
                    ...state,
                    editTestState:""
                }
                case UPDATE_Test_LOADING:
                    return{
                        ...state,
                    editTestState:"loading"
                    }
            case UPDATE_Test_SUCCESS:
                return{
                ...state,
                editTestState:action.res
            }
    
            case UPDATE_Test_ERROR:
                return {
               ...state,
               editTestState:action.res
                }
            
             case CLEAR_DELETE_Test_STATE:
                return{
                    ...state,
                    deleteTestResponse:""
                }
                case DELETE_Test_LOADING:
                    return{
                        ...state,
                    deleteTestResponse:"loading"
                    }
            case DELETE_Test_SUCCESS: 
              
                return{
                ...state,
                deleteTestResponse:action.res,
            }
    
            case DELETE_Test_ERROR:
                return {
               ...state,
               deleteTestResponse:action.res
                }
            

        default:
            return state

    }
}


export default TestReducer;