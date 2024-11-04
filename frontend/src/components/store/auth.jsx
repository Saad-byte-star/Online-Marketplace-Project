import { useState ,useEffect} from "react";
import { useContext,createContext } from "react";
import { getAdvertisements } from "../ApiData";
export const AuthContext = createContext()


export const AuthProvider = ({children}) => {

    // Storing Json Web Token in local Storage
    const [token, setToken] = useState(localStorage.getItem('token')) 
    const [user, setUser] = useState()

    const storeTokenInLocalStorage = (serverToken) => {
        setToken(serverToken)
        localStorage.setItem( "token", serverToken)
    }

    // Checking if the user is loggedIn   
    let isLoggedIn = !!token
    console.log(isLoggedIn);

    // Posting the advertisements 

    const addAdvertisement = async function (newPost) {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/advertisements`, {
                method: "POST",
                // headers: {
                //      "Content-Type": "multipart/form-data",
                // },
                body: newPost,
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            // console.log("Advertisement added successfully:", data);
            getAdvertisements().then((item) => console.log(`done`))
        } catch (error) {
            console.error("Error adding advertisement:", error);
            throw error; 
        }
    };

    // Logout User

    const LogoutUser = async function () {
        setToken("")
        localStorage.removeItem("token")
    }
    

    // Getting current logged in user

    const LoggedinUser = async function () {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/users/user`,{
                method:"GET",
                headers: {
                    "X-Auth-Token" : token
                }
            })
            if (response.status === 200) {
                const data = await response.json()
                setUser(data)
            }
        } catch (error) {
            console.log(`unauthrized request`);
        }
    }
    console.log(user);

    useEffect(() => {
        LoggedinUser()
    }, [isLoggedIn])
    

    return(
        <AuthContext.Provider value={{addAdvertisement,storeTokenInLocalStorage,isLoggedIn,user,LogoutUser}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    return useContext(AuthContext)
}