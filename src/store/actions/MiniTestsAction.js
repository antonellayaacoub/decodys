import {
  CREATE_MiniTest_SUCCESS,
  CREATE_MiniTest_ERROR,
  CREATE_MiniTest_LOADING,
  CLEAR_CREATE_MiniTest_STATE,
  GET_MiniTestS_LOADING,
  GET_MiniTestS_SUCCESS,
  GET_MiniTestS_ERROR,
  GET_SINGLE_MiniTestS_LOADING,
  GET_SINGLE_MiniTestS_SUCCESS,
  GET_SINGLE_MiniTestS_ERROR,
  GET_SEARCH_MiniTestS_LOADING,
  GET_SEARCH_MiniTestS_SUCCESS,
  GET_SEARCH_MiniTestS_ERROR,
  CLEAR_SEARCH_MiniTest_STATE,
  CLEAR_UPDATE_MiniTest_STATE,
  UPDATE_MiniTest_SUCCESS,
  UPDATE_MiniTest_ERROR,
  UPDATE_MiniTest_LOADING,
  DELETE_MiniTest_ERROR,
  DELETE_MiniTest_SUCCESS,
  CLEAR_DELETE_MiniTest_STATE,
  DELETE_MiniTest_LOADING,
} from '../actiontypes/MiniTests';
import {
  addNewMiniTestService,
  loadMiniTestService,
  loadSingleMiniTestService,
  loadSearchMiniTestService,
  editMiniTestService,
  deleteMiniTestService,
} from '../../services/MiniTestService';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
export const CreateMiniTestAction = credentials => {
  return dispatch => {
    dispatch({type: CREATE_MiniTest_LOADING});

    addNewMiniTestService(credentials).then(
      res => {
        console.log(res);

        if (res.hasOwnProperty('success') && res.success == true) {
          //   dispatch({type: CREATE_MiniTest_SUCCESS, res});
        } else if (res.hasOwnProperty('success') && res.success == false) {
          dispatch({type: CREATE_MiniTest_ERROR, res});
        }
      },
      error => {
        console.log(error);
      },
    );
  };
};

export const clearCreateMiniTestState = () => {
  return dispatch => {
    dispatch({type: CLEAR_CREATE_MiniTest_STATE});
  };
};

export const GetMiniTestActions = (id, testId) => {
  return dispatch => {
    dispatch({type: GET_MiniTestS_LOADING});

    loadMiniTestService(id, testId).then(
      res => {
        console.log(res);

        if (res.hasOwnProperty('success') && res.success == true) {
          dispatch({type: GET_MiniTestS_SUCCESS, res});
        } else if (res.hasOwnProperty('success') && res.success == false) {
          dispatch({type: GET_MiniTestS_ERROR, res});
        }
      },
      error => {
        console.log(error);
      },
    );
  };
};

export const GetSingleMiniTestAction = id => {
  return dispatch => {
    dispatch({type: GET_SINGLE_MiniTestS_LOADING});

    loadSingleMiniTestService(id).then(
      res => {
        console.log(res);

        if (res.hasOwnProperty('success') && res.success == true) {
          dispatch({type: GET_SINGLE_MiniTestS_SUCCESS, res});
        } else if (res.hasOwnProperty('success') && res.success == false) {
          dispatch({type: GET_SINGLE_MiniTestS_ERROR, res});
        }
      },
      error => {
        console.log(error);
      },
    );
  };
};

export const GetSearchMiniTestAction = (searchData, page) => {
  return dispatch => {
    dispatch({type: GET_SEARCH_MiniTestS_LOADING});

    loadSearchMiniTestService(searchData, page).then(
      res => {
        console.log(res);

        if (res.hasOwnProperty('success') && res.success == true) {
          dispatch({type: GET_SEARCH_MiniTestS_SUCCESS, res});
        } else if (res.hasOwnProperty('success') && res.success == false) {
          dispatch({type: GET_SEARCH_MiniTestS_ERROR, res});
        }
      },
      error => {
        console.log(error);
      },
    );
  };
};

export const clearSearchMiniTestState = () => {
  return dispatch => {
    dispatch({type: CLEAR_SEARCH_MiniTest_STATE});
  };
};

export const EditMiniTestAction = (credentials, id) => {

  return dispatch => {
    dispatch({type: UPDATE_MiniTest_LOADING});

    editMiniTestService(credentials, id).then(
      res => {
        console.log(res);

        if (res.hasOwnProperty('success') && res.success == true) {
          dispatch({type: UPDATE_MiniTest_SUCCESS, res});
        } else if (res.hasOwnProperty('success') && res.success == false) {
          dispatch({type: UPDATE_MiniTest_ERROR, res});
        }
      },
      error => {
        console.log(error);
      },
    );
  };
};

export const clearEditMiniTestState = () => {
  return dispatch => {
    dispatch({type: CLEAR_UPDATE_MiniTest_STATE});
  };
};

export const DeleteMiniTestAction = id => {
  return dispatch => {
    dispatch({type: DELETE_MiniTest_LOADING});

    deleteMiniTestService(id).then(
      res => {
        console.log(res);

        if (res.hasOwnProperty('success') && res.success == true) {
          res.id = id;

          dispatch({type: DELETE_MiniTest_SUCCESS, res});
        } else if (res.hasOwnProperty('success') && res.success == false) {
          dispatch({type: DELETE_MiniTest_ERROR, res});
        }
      },
      error => {
        console.log(error);
      },
    );
  };
};
