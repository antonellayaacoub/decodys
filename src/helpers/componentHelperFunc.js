import { Toast } from "native-base";
import { COLORS, SIZES } from '../constants';

 const EmailCheckRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
 
export const cleanUpData = (abortController) =>
{
    abortController.abort();
}

export const instantiateAbort = () =>
{
    const abortController = new AbortController();
    const signal = abortController.signal;
    return abortController;
}


export const setBottomColor = (itemRef,textTyped,elemType)=>
{
  if(elemType=="email")
  {
    if(EmailCheckRegex.test(textTyped)===false)
    {
      itemRef.setNativeProps({ style: { borderBottomColor: COLORS.error } })
    }else
    {
     itemRef.setNativeProps({ style: { borderBottomColor: COLORS.primary } })
    }
  }
  else if(elemType==null)
  {
    if(textTyped=="")
    {
      itemRef.setNativeProps({ style: { borderBottomColor: COLORS.error } })
    }else
    {
     itemRef.setNativeProps({ style: { borderBottomColor: COLORS.primary } })
    }
  }
  
}


export const ResponseToast = (position,buttonText,type,text,duration)=>
{
 let color="#fff";
  if(type=='success'){
    color=COLORS.success;
  }else{
    color=COLORS.error;
  }
  return Toast.show({
    position:position,
    buttonText:buttonText,
    text:text,
    type:type,
    duration:duration,
    style: {
      position: 'absolute',
      top:0,
      backgroundColor: color
     }
  });
}

export const LoadingToast = (position,text,type)=>
{
 let color ='#fff';
  if(type=='success'){
    color=COLORS.success;
  }else{
    color =COLORS.error;
  }
  return Toast.show({
    position:position,
    text:text,
    type:type,
    style: {
      position: 'absolute',
      top:0,
      backgroundColor: color
     }
  });
}