import { Dimensions } from "react-native";
const {width, height} = Dimensions.get('window');

export const COLORS = {
    primary: "#0ACBC5",
    secondary: '#6C7594',
    accent: '#078E8E',
    
    success: '#0ACBC5',
    error: '#ff4444',

    black: "#171717",
    white: "#FFFFFF",
    background:'#FFFFFF',
    backgroundDark: "#252C4A"
}


export const SIZES = {
    base: 10,
    width,
    height
}