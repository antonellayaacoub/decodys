import {StyleSheet} from 'react-native'; 

import { COLORS, SIZES } from '../../constants';
 export const styles = StyleSheet.create({
    container: {
      width:'80%',
     marginLeft:'10%',
     marginRight:'10%',
    },
    submitBtn:{
      marginTop:'10%',
      marginBottom:'1%'
    },
    marginTopStyle:{
      marginTop:'2%'
    },
    labelError:{
      marginBottom:'2%',
      color:COLORS.error,fontSize:14
    },
    topSection: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '60%',
      height: '30%',
      marginLeft: '20%',
    },
    body: {
      flex: 1,
      backgroundColor: 'white',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    bottomSection: {
      width: '100%',
      marginTop:'5%',
      height: '65%',
      backgroundColor: '#fff',
    },
   
  });
 