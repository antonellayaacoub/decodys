import {combineReducers} from 'redux'
import AuthReducer from './AuthReducer';
import PatientReducer from './PatientReducer';


const RootReducer = combineReducers({
authReducer:AuthReducer,
patientReducer:PatientReducer
});





export default RootReducer