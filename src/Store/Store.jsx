import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();


export const AuthProvider = ({children})=>{
const [sub,setSub] = useState("");
const [dataSearch,setDataSearch] = useState([]);
const[UserDetails,setUserDetails]= useState("");

    
    const SearchData = (item)=>{
        
        setDataSearch(item);
        return item
    }

    const UserData =(data)=>{
        setUserDetails(data);
       
        return data
    }
    const SubscriberList = (name) =>{
        setSub(name);
        return name;
    }
let authDataSearch = dataSearch;
let userdata=UserDetails;
let subData = sub;
 

    return(
      
            <AuthContext.Provider
            value={{ 
                SearchData,
                authDataSearch,
                UserData,
                userdata,
                SubscriberList,
                subData

            }}
            
            
            
            >
                {children}


            </AuthContext.Provider>
    )

        }

        export const useAuth = ()=>{
            const authcontextValue = useContext(AuthContext)
            if(!authcontextValue){
                throw new Error('not passing bhaad me jaa')
            }
            return(
                authcontextValue
            )
        }