import HttpService from './HttpService';
import AsyncStorage from '@react-native-community/async-storage';



 export const addNewMiniTestService = async(credentials) =>
 {  
    const http = new HttpService();
  let Url = "user/miniTest/add";
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

//load MiniTests with pagination
 export  const loadMiniTestService = async (page,testId) =>
 {  
    const http = new HttpService();
  let tokenId="user";
  let pager =15;
  const token = await AsyncStorage.getItem(tokenId);

  let  Url = "user/miniTest/get-all/"+testId+"/"+pager+"?page="+page;
  console.log('testIdd: ',testId)
  return http.getData(Url,tokenId).then((data)=>{
    console.log('DATAA:', data)
    return data;
}).catch((error)=> {console.log(error)
    return error; 
     });

 }

 export const loadSingleMiniTestService = (id) =>
 {
    const http = new HttpService();
   let tokenId = "user";
    let Url = "user/miniTest/get-single/"+id;
    return http.getData( Url,tokenId).then((data)=>
    {
      return data;
  }).catch((error)=> {console.log(error)
    return error; 
     });
 }


 export const loadSearchMiniTestService = async(searchData,page) =>
 {
  const http = new HttpService();
  let tokenId = "user";
  let pager =15;
   let Url = "user/miniTest/search/"+searchData+"/"+pager+"?page="+page;
   console.log(Url);
   return http.getData( Url,tokenId).then((data)=>
   {
     return data;
 }).catch((error)=> {console.log(error)
   return error; 
    });
}
 

export const editMiniTestService = (credentials,id)=>
{
  const http = new HttpService();
  let Url = "user/miniTest/update/"+id;
  let tokenId = "user";
  
return http.postData(credentials,Url,"POST",tokenId).then((data)=>{
    return data;
}).catch((error)=> {console.log(error)
    return error; 
     });
}


export const deleteMiniTestService = (id) =>
{
  const http = new HttpService();
  let Url = "user/miniTest/delete/"+id;
  let tokenId = "user";
  let data = {};
  
return http.postData(data,Url,"POST",tokenId).then((data)=>{
    return data;
}).catch((error)=> {console.log(error)
    return error; 
     });
}

