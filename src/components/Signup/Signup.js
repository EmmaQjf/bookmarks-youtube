export default function Signup({
        signup,
        credentials,
        handleChangeAuth
}){
    return (
        <>
        <h2>SignUp</h2>
        <form onSubmit = {(e) => {
            e.preventDefault()
            signup()
        }}>
        <input type="text" placeholder="email" value={credentials.email} name="email" onChange = {handleChangeAuth}></input>
            <input type="text"  placeholder="name" value={credentials.name} name="name" onChange = {handleChangeAuth}></input>
            <input type="text" placeholder="password" value={credentials.password} name="password" onChange = {handleChangeAuth}></input>
            <input type="submit" value ="Sign up as an New User"/>
        </form>

        
        </>
    )
}