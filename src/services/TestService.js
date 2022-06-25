import HttpService from './HttpService';
import AsyncStorage from '@react-native-community/async-storage';



 export const addNewTestService = async(credentials) =>
 {  
    const http = new HttpService();
  let Url = "user/test/add";
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

//load Tests with pagination
 export  const loadTestService = async (page,patientId) =>
 {  
    const http = new HttpService();
  let tokenId="user";
  let pager =15;
  const token = await AsyncStorage.getItem(tokenId);

  let  Url = "user/test/get-all/"+patientId+"/"+pager+"?page="+page;

  return http.getData(Url,tokenId).then((data)=>{
    return data;
}).catch((error)=> {console.log(error)
    return error; 
     });

 }

 export const loadSingleTestService = (id) =>
 {
    const http = new HttpService();
   let tokenId = "user";
    let Url = "user/test/get-single/"+id;
    return http.getData( Url,tokenId).then((data)=>
    {
      return data;
  }).catch((error)=> {console.log(error)
    return error; 
     });
 }


 export const loadSearchTestService = async(searchData,page) =>
 {
  const http = new HttpService();
  let tokenId = "user";
  let pager =15;
   let Url = "user/test/search/"+searchData+"/"+pager+"?page="+page;
   console.log(Url);
   return http.getData( Url,tokenId).then((data)=>
   {
     return data;
 }).catch((error)=> {console.log(error)
   return error; 
    });
}
 

export const editTestService = (credentials,id)=>
{
  const http = new HttpService();
  let Url = "user/test/update/"+id;
  let tokenId = "user";
  
return http.postData(credentials,Url,"POST",tokenId).then((data)=>{
    return data;
}).catch((error)=> {console.log(error)
    return error; 
     });
}


export const deleteTestService = (id) =>
{
  const http = new HttpService();
  let Url = "user/test/delete/"+id;
  let tokenId = "user";
  let data = {};
  
return http.postData(data,Url,"POST",tokenId).then((data)=>{
    return data;
}).catch((error)=> {console.log(error)
    return error; 
     });
}

