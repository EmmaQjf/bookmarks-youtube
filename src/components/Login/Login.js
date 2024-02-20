

export default function Login({
        login,
        credentials,
        handleChangeAuth
    }){
    return (
        <>
       <h2>Login</h2>
        <form onSubmit= {(e) => {
            e.preventDefault()
            login()
        }}>
            <input type="text" placeholder="email" value={credentials.email} name="email" onChange = {handleChangeAuth}></input>
            <input type="text" placeholder="password" value={credentials.password} name="password" onChange = {handleChangeAuth}></input>
            <input type="submit" value="Login as an existing User"/>
        </form>
        
        </>
    )
}