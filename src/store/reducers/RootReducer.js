import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import PatientReducer from './PatientReducer';
import TestReducer from './TestReducer';
import MiniTestReducer from './MiniTestReducer';

const RootReducer = combineReducers({
  authReducer: AuthReducer,
  patientReducer: PatientReducer,
  testReducer: TestReducer,
  miniTestReducer: MiniTestReducer,
});

export default RootReducer;
