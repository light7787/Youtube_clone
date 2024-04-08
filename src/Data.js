export const API_KEY='AIzaSyAKhYWzpFqKkmTzQL4loUWZf_ATn-5NgRw';
export const api_key='AIzaSyAn2gJOhOhvDmMQm4vDsBakkfmLiFoiRBE';
export const API_KEY2='AIzaSyCGcxFxWZshKLoT7ueVVtYjP9sCQD-md8I';
export const API_KEY3='AIzaSyBh-eT_HYybO9nPpsdXnZBfvgrx2giWaOA';
export const API_KEY4='AIzaSyCGhgrlPihjza0ndvGjkkZDYGUj0Ebwn3c';
export const API_KEY5='AIzaSyCt4uaGH-tEGnB_SJIY1krMu2hRBxj5TUg';

 export const value_converter = (value)=>{
    if(value>=1000000){
        return Math.floor(value/1000000)+"M"
    }
    else if(value>=1000){
        return Math.floor(value/1000)+"K"
    }
    else{
        return value;
    }

}