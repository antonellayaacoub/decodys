import HttpService from './HttpService';
import AsyncStorage from '@react-native-community/async-storage';



 export const addNewPatientService = async(credentials) =>
 {  
    const http = new HttpService();
  let Url = "user/patient/add";
  let tokenId = "user";

  const token = await AsyncStorage.getItem(tokenId);
  console.log(token);
/**
 * token field is required
 */  
  credentials["token"] = token;

return http.postData(credentials,Url,"POST",tokenId).then((data)=>{
    return data;
}).catch((error)=> {console.log(error)
    return error; 
     });
 }

//load patients with pagination
 export  const loadPatientService = async (page) =>
 {  
    const http = new HttpService();
  let tokenId="user";
  let pager =15;
  const token = await AsyncStorage.getItem(tokenId);

  let  Url = "user/patient/get-all/"+token+"/"+pager+"?page="+page;

  return http.getData(Url,tokenId).then((data)=>{
    return data;
}).catch((error)=> {console.log(error)
    return error; 
     });

 }

 export const loadSinglePatientService = (id) =>
 {
    const http = new HttpService();
   let tokenId = "user";
    let Url = "user/patient/get-single/"+id;
    return http.getData( Url,tokenId).then((data)=>
    {
      return data;
  }).catch((error)=> {console.log(error)
    return error; 
     });
 }


 export const loadSearchPatientService = async(searchData,page) =>
 {
  const http = new HttpService();
  let tokenId = "user";
  let pager =15;
   let Url = "user/patient/search/"+searchData+"/"+pager+"?page="+page;
   console.log(Url);
   return http.getData( Url,tokenId).then((data)=>
   {
     return data;
 }).catch((error)=> {console.log(error)
   return error; 
    });
}
 

export const editPatientService = (credentials,id)=>
{
  const http = new HttpService();
  let Url = "user/patient/update/"+id;
  let tokenId = "user";
  
return http.postData(credentials,Url,"POST",tokenId).then((data)=>{
    return data;
}).catch((error)=> {console.log(error)
    return error; 
     });
}


export const deletePatientService = (id) =>
{
  const http = new HttpService();
  let Url = "user/patient/delete/"+id;
  let tokenId = "user";
  let data = {};
  
return http.postData(data,Url,"POST",tokenId).then((data)=>{
    return data;
}).catch((error)=> {console.log(error)
    return error; 
     });
}

