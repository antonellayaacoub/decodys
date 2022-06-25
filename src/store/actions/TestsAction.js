import {
  CREATE_Test_SUCCESS,
  CREATE_Test_ERROR,
  CREATE_Test_LOADING,
  CLEAR_CREATE_Test_STATE,
  GET_TestS_LOADING,
  GET_TestS_SUCCESS,
  GET_TestS_ERROR,
  GET_SINGLE_TestS_LOADING,
  GET_SINGLE_TestS_SUCCESS,
  GET_SINGLE_TestS_ERROR,
  GET_SEARCH_TestS_LOADING,
  GET_SEARCH_TestS_SUCCESS,
  GET_SEARCH_TestS_ERROR,
  CLEAR_SEARCH_Test_STATE,
  CLEAR_UPDATE_Test_STATE,
  UPDATE_Test_SUCCESS,
  UPDATE_Test_ERROR,
  UPDATE_Test_LOADING,
  DELETE_Test_ERROR,
  DELETE_Test_SUCCESS,
  CLEAR_DELETE_Test_STATE,
  DELETE_Test_LOADING,
} from '../actiontypes/Tests';
import {
  addNewTestService,
  loadTestService,
  loadSingleTestService,
  loadSearchTestService,
  editTestService,
  deleteTestService,
} from '../../services/TestService';
import {
  CreateMiniTestAction,
  GetMiniTestActions,
  DeleteMiniTestAction,
} from '../actions/MiniTestsAction';

const numberOfMeniTests=4;
export const CreateTestAction = credentials => {
  return dispatch => {
    dispatch({type: CREATE_Test_LOADING});

    addNewTestService(credentials).then(
      res => {
        console.log(res);

        if (res.hasOwnProperty('success') && res.success == true) {
          dispatch({type: CREATE_Test_SUCCESS, res});
          console.log('res: ',res.test_id)
          for(var i=1; i<=numberOfMeniTests;i++){
            let name ="test"+i;
          let data =  {
            test_id: res.test_id,
            name:name,
            grade:0,
          };
           dispatch(CreateMiniTestAction(data));
        }
        } else if (res.hasOwnProperty('success') && res.success == false) {
          dispatch({type: CREATE_Test_ERROR, res});
        }
      },
      error => {
        console.log(error);
      },
    );
  };
};

export const clearCreateTestState = () => {
  return dispatch => {
    dispatch({type: CLEAR_CREATE_Test_STATE});
  };
};

export const GetTestActions = (id, patientId) => {
  return dispatch => {
    dispatch({type: GET_TestS_LOADING});

    loadTestService(id, patientId).then(
      res => {
        console.log(res);

        if (res.hasOwnProperty('success') && res.success == true) {
          dispatch({type: GET_TestS_SUCCESS, res});
        } else if (res.hasOwnProperty('success') && res.success == false) {
          dispatch({type: GET_TestS_ERROR, res});
        }
      },
      error => {
        console.log(error);
      },
    );
  };
};

export const GetSingleTestAction = id => {
  return dispatch => {
    dispatch({type: GET_SINGLE_TestS_LOADING});

    loadSingleTestService(id).then(
      res => {
        console.log(res);

        if (res.hasOwnProperty('success') && res.success == true) {
          dispatch({type: GET_SINGLE_TestS_SUCCESS, res});
        } else if (res.hasOwnProperty('success') && res.success == false) {
          dispatch({type: GET_SINGLE_TestS_ERROR, res});
        }
      },
      error => {
        console.log(error);
      },
    );
  };
};

export const GetSearchTestAction = (searchData, page) => {
  return dispatch => {
    dispatch({type: GET_SEARCH_TestS_LOADING});

    loadSearchTestService(searchData, page).then(
      res => {
        console.log(res);

        if (res.hasOwnProperty('success') && res.success == true) {
          dispatch({type: GET_SEARCH_TestS_SUCCESS, res});
        } else if (res.hasOwnProperty('success') && res.success == false) {
          dispatch({type: GET_SEARCH_TestS_ERROR, res});
        }
      },
      error => {
        console.log(error);
      },
    );
  };
};

export const clearSearchTestState = () => {
  return dispatch => {
    dispatch({type: CLEAR_SEARCH_Test_STATE});
  };
};

export const EditTestAction = (credentials, id) => {
  return dispatch => {
    dispatch({type: UPDATE_Test_LOADING});

    editTestService(credentials, id).then(
      res => {
        console.log(res);

        if (res.hasOwnProperty('success') && res.success == true) {
          dispatch({type: UPDATE_Test_SUCCESS, res});
        } else if (res.hasOwnProperty('success') && res.success == false) {
          dispatch({type: UPDATE_Test_ERROR, res});
        }
      },
      error => {
        console.log(error);
      },
    );
  };
};

export const clearEditTestState = () => {
  return dispatch => {
    dispatch({type: CLEAR_UPDATE_Test_STATE});
  };
};

export const DeleteTestAction = id => {
  return dispatch => {
    dispatch({type: DELETE_Test_LOADING});

    deleteTestService(id).then(
      res => {
        console.log(res);

        if (res.hasOwnProperty('success') && res.success == true) {
          res.id = id;

          dispatch({type: DELETE_Test_SUCCESS, res});
        } else if (res.hasOwnProperty('success') && res.success == false) {
          dispatch({type: DELETE_Test_ERROR, res});
        }
      },
      error => {
        console.log(error);
      },
    );
  };
};
