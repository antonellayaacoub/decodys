import { CLEAR_CREATE_MiniTest_STATE, 
    CREATE_MiniTest_LOADING, 
    CREATE_MiniTest_SUCCESS, 
    CREATE_MiniTest_ERROR, 
    CLEAR_GET_MiniTest_STATE,
    GET_MiniTestS_LOADING,
    GET_MiniTestS_SUCCESS,
    GET_MiniTestS_ERROR, 
    CLEAR_GET_SINGLE_MiniTest_STATE,
    GET_SINGLE_MiniTestS_LOADING,
    GET_SINGLE_MiniTestS_SUCCESS,
    GET_SINGLE_MiniTestS_ERROR,
    CLEAR_SEARCH_MiniTest_STATE,
    GET_SEARCH_MiniTestS_LOADING,
    GET_SEARCH_MiniTestS_SUCCESS,
    GET_SEARCH_MiniTestS_ERROR,
   UPDATE_MiniTest_LOADING,
   UPDATE_MiniTest_ERROR,
   UPDATE_MiniTest_SUCCESS,
   CLEAR_UPDATE_MiniTest_STATE,
   DELETE_MiniTest_ERROR,
   DELETE_MiniTest_SUCCESS,
   DELETE_MiniTest_LOADING,
   CLEAR_DELETE_MiniTest_STATE
} from "../actiontypes/MiniTests"


const initState = {
    createMiniTestState:"",
    getMiniTestState:"",
    getSingleMiniTestState:"",
    searchMiniTestState:"",
    editMiniTestState:"",
    deleteMiniTestResponse:""
}


const MiniTestReducer = (state=initState, action) =>
{
    switch(action.type){
    

        case CLEAR_CREATE_MiniTest_STATE:
            return{
                ...state,
                createMiniTestState:""
            }
            case CREATE_MiniTest_LOADING:
                return{
                    ...state,
                createMiniTestState:"loading"
                }
        case CREATE_MiniTest_SUCCESS:
            return{
            ...state,
            createMiniTestState:action.res
        }

        case CREATE_MiniTest_ERROR:
            return {
           ...state,
           getMiniTestState:action.res
            }
        
        case CLEAR_GET_MiniTest_STATE:
            return{
                ...state,
                getMiniTestState:""
            }
            case GET_MiniTestS_LOADING:
                return{
                    ...state,
                getMiniTestState:"loading"
                }
        case GET_MiniTestS_SUCCESS:
            return{
            ...state,
            getMiniTestState:action.res
        }

        case GET_MiniTestS_ERROR:
            return {
           ...state,
           getMiniTestState:action.res
            }
       case CLEAR_GET_SINGLE_MiniTest_STATE:
            return{
                ...state,
                getSingleMiniTestState:""
            }
            case GET_SINGLE_MiniTestS_LOADING:
                return{
                ...state,
                getSingleMiniTestState:"loading"
                }
        case GET_SINGLE_MiniTestS_SUCCESS:
            return{
            ...state,
            getSingleMiniTestState:action.res
        }

        case GET_SINGLE_MiniTestS_ERROR:
            return {
           ...state,
           getSingleMiniTestState:action.res
            }

          case CLEAR_SEARCH_MiniTest_STATE:
            return{
                ...state,
                searchMiniTestState:""
            } 
            case GET_SEARCH_MiniTestS_LOADING:
                return{
                ...state,
                searchMiniTestState:"loading"
                }
        case GET_SEARCH_MiniTestS_SUCCESS:
            return{
            ...state,
            searchMiniTestState:action.res
        }

        case GET_SEARCH_MiniTestS_ERROR:
            return {
           ...state,
           searchMiniTestState:action.res
            }
        
            case CLEAR_UPDATE_MiniTest_STATE:
                return{
                    ...state,
                    editMiniTestState:""
                }
                case UPDATE_MiniTest_LOADING:
                    return{
                        ...state,
                    editMiniTestState:"loading"
                    }
            case UPDATE_MiniTest_SUCCESS:
                return{
                ...state,
                editMiniTestState:action.res
            }
    
            case UPDATE_MiniTest_ERROR:
                return {
               ...state,
               editMiniTestState:action.res
                }
            
             case CLEAR_DELETE_MiniTest_STATE:
                return{
                    ...state,
                    deleteMiniTestResponse:""
                }
                case DELETE_MiniTest_LOADING:
                    return{
                        ...state,
                    deleteMiniTestResponse:"loading"
                    }
            case DELETE_MiniTest_SUCCESS: 
              
                return{
                ...state,
                deleteMiniTestResponse:action.res,
            }
    
            case DELETE_MiniTest_ERROR:
                return {
               ...state,
               deleteMiniTestResponse:action.res
                }
            

        default:
            return state

    }
}


export default MiniTestReducer;