import{useState, useEffect} from 'react'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
export default function Auth({
    login,
    signup,
    credentials,
    handleChangeAuth
}){
    const [showSignUp, setShowSignUp] = useState(true)
    const [user, setUser] = useState(null)


    //READ
    useEffect(() => {
        const getToken =() => {
            const token = window.localStorage.getItem('token')
          if (!token || token === 'null' || token === 'undefined') return null
          const payload = JSON.parse(window.atob(token.split('.')[1]))
          // remove the expired token
          if(payload.exp < Date.now()/1000) {
            window.localStorage.removeItem('token')
            return null
          }
          return JSON.parse(token)
        }
        const token = getToken()

        //why?
        const data = token? JSON.parse(window.atob(token.split('.')[1])).user: null
        setUser(data)  
      }, [])
  
    return (
        <>
        {
            user && user.name?
            <h1>welcome!{user.name.toUpperCase()} </h1> : 
            <>
            <button onClick = {() => {
            setShowSignUp(!showSignUp)
        }}>
            {showSignUp? 'Sign up with a new account below or click here to login as an existing user': 'welcome back! Login as an exisiting user or click here sin up with a new account'}
        </button>

        {showSignUp?
         <Signup
        signup = {signup}
        credentials = {credentials}
        handleChangeAuth ={handleChangeAuth}

         /> : 
        <Login
        login = {login}
        credentials = {credentials}
        handleChangeAuth ={handleChangeAuth}/>}
       
            </>

        }
        
        </>
    )
}