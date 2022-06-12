import { CREATE_Patient_SUCCESS, CREATE_Patient_ERROR,CREATE_Patient_LOADING, 
    CLEAR_CREATE_Patient_STATE, GET_PatientS_LOADING, GET_PatientS_SUCCESS,
     GET_PatientS_ERROR, GET_SINGLE_PatientS_LOADING, GET_SINGLE_PatientS_SUCCESS,
      GET_SINGLE_PatientS_ERROR, 
      GET_SEARCH_PatientS_LOADING,
      GET_SEARCH_PatientS_SUCCESS,
      GET_SEARCH_PatientS_ERROR,
    CLEAR_SEARCH_Patient_STATE,
    CLEAR_UPDATE_Patient_STATE,
    UPDATE_Patient_SUCCESS,
    UPDATE_Patient_ERROR,
    UPDATE_Patient_LOADING,
    DELETE_Patient_ERROR,
    DELETE_Patient_SUCCESS,
    CLEAR_DELETE_Patient_STATE,
    DELETE_Patient_LOADING
    } from "../actiontypes/Patients";
import { addNewPatientService, loadPatientService, loadSinglePatientService,loadSearchPatientService, editPatientService, deletePatientService } from "../../services/PatientService";



export const CreatePatientAction = (credentials) =>
{

    return (dispatch)=>{

        dispatch({type:CREATE_Patient_LOADING});

        addNewPatientService(credentials).then((res)=>{

                console.log(res);

                if(res.hasOwnProperty('success') && res.success==true){

                    dispatch({type:CREATE_Patient_SUCCESS,res});

                }else if(res.hasOwnProperty('success') && res.success==false) {
                    dispatch({type:CREATE_Patient_ERROR,res});
                }
            },
            error=>{
                console.log(error);
            }
        )
    } 

}




export const clearCreatePatientState = () =>
{
    return (dispatch)=>{

        dispatch({type:CLEAR_CREATE_Patient_STATE});
    }

}



export const GetPatientActions = (id) =>
{

    return (dispatch)=>{

        dispatch({type:GET_PatientS_LOADING});
        
        loadPatientService(id).then((res)=>{

                console.log(res);

                if(res.hasOwnProperty('success') && res.success==true){

                    dispatch({type:GET_PatientS_SUCCESS,res});

                }else if(res.hasOwnProperty('success') && res.success==false) {
                    dispatch({type:GET_PatientS_ERROR,res});
                }
            },
            error=>{
                console.log(error);
            }
        )
    } 

}


export const GetSinglePatientAction = (id) =>
 {

    return (dispatch)=>{

        dispatch({type:GET_SINGLE_PatientS_LOADING});
        
        loadSinglePatientService(id).then((res)=>{

                console.log(res);

                if(res.hasOwnProperty('success') && res.success==true){

                    dispatch({type:GET_SINGLE_PatientS_SUCCESS,res});

                }else if(res.hasOwnProperty('success') && res.success==false) {
                    dispatch({type:GET_SINGLE_PatientS_ERROR,res});
                }
            },
            error=>{
                console.log(error);
            }
        )
    } 

 } 



 export const GetSearchPatientAction = (searchData,page) =>
 {

    return (dispatch)=>{

        dispatch({type:GET_SEARCH_PatientS_LOADING});
        
        loadSearchPatientService(searchData,page).then((res)=>{

                console.log(res);

                if(res.hasOwnProperty('success') && res.success==true){

                    dispatch({type:GET_SEARCH_PatientS_SUCCESS,res});

                }else if(res.hasOwnProperty('success') && res.success==false) {
                    dispatch({type:GET_SEARCH_PatientS_ERROR,res});
                }
            },
            error=>{
                console.log(error);
            }
        )
    } 

 } 


 

export const clearSearchPatientState = () =>
{
    return (dispatch)=>{

        dispatch({type:CLEAR_SEARCH_Patient_STATE});
    }

}



export const EditPatientAction = (credentials,id) =>
{

    return (dispatch)=>{

        dispatch({type:UPDATE_Patient_LOADING});

        editPatientService(credentials,id).then((res)=>{

                console.log(res);

                if(res.hasOwnProperty('success') && res.success==true){

                    dispatch({type:UPDATE_Patient_SUCCESS,res});

                }else if(res.hasOwnProperty('success') && res.success==false) {
                    dispatch({type:UPDATE_Patient_ERROR,res});
                }
            },
            error=>{
                console.log(error);
            }
        )
    } 

}

export const clearEditPatientState = () =>
{
    return (dispatch)=>{

        dispatch({type:CLEAR_UPDATE_Patient_STATE});
    }

}

  

export const DeletePatientAction = (id)=>
{
    return (dispatch)=>
    {

        dispatch({type:DELETE_Patient_LOADING});
        
        deletePatientService(id).then((res)=>{

                console.log(res);

                if(res.hasOwnProperty('success') && res.success==true){

                    res.id = id;

                    dispatch({type:DELETE_Patient_SUCCESS,res});

                }else if(res.hasOwnProperty('success') && res.success==false) {
                    dispatch({type:DELETE_Patient_ERROR,res});
                }
            },
            error=>{
                console.log(error);
            }
        )
    } 
}




