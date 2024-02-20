
import {useState, useEffect} from 'react'

export default function App() {

    /*
    Login, SignUp, CreateBookmark, ListBookmarksByUser, DeleteBookmark, UpdateBookmark
    */
    const handleChangeAuth = (event) => {
        setCredentials({...credentials, [event.target.name]:event.target.value})
    }
    const handleChange = (event) => {
        setBookmark({...bookmark, [event.target.name]:event.target.value})
    }
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        name: ''
    })

    const [token, setToken] = useState('')

    const [bookmark, setBookmark] = useState({
        title: '',
        url: ''
    })
    const [bookmarks, setBookmarks] = useState([])

    const login = async() => {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: credentials.email, password: credentials.password})
            })

            const tokenResponse = await response.json()
            setToken(tokenResponse)
            localStorage.setItem('token', JSON.stringify(tokenResponse)) //store the token

        } catch(error) {
             console.error(error)
        }
    }


    const signup = async() => {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...credentials})
            })

            const tokenResponse = await response.json()
            setToken(tokenResponse)
            localStorage.setItem('token', JSON.stringify(tokenResponse)) //store the token

        } catch(error) {
             console.error(error)
        }
    }

    const createBookmark = async() => {
        try {
            const response = await fetch('/api/bookmarks', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({...bookmark})
            })

            const newBookmark = await response.json()

            const bookmarksCopy = [newBookmark, ...bookmarks]
            setBookmarks(bookmarksCopy)
            setBookmark({
                title: '',
                url: ''
            })  // clear out the state

        } catch (error) {
            console.error(error)
        }
    }

    const listBookmarksByUser = async () => {
        try {
          const response = await fetch('/api/users/bookmarks', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
          })
          const data = await response.json()
          setBookmarks(data)
        } catch (error) {
          console.error(error)
        }
      }

    // const listBookmarksByUser = async() => {
    //     try {
    //         const response = await fetch('/api/users/bookmarks')
    //         const foundBookmarks = await response.json()
    //         setBookmarks(foundBookmarks)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }


    const deleteBookmark = async(id) => {
        try {
            const response = await fetch(`/api/bookmarks/${id}`, {
                method: "DELETE",
                header: {
                    "Content-Type" : "Application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            
            const foundBookmark = await response.json()
            const bookmarksCopy = [...bookmarks]
            const index = bookmarksCopy.findIndex((bookmark) => bookmark._id === id)
            bookmarksCopy.splice(index, 1)
            setBookmarks(bookmarksCopy)
        } catch (error) {
            console.error(error)
        }
    }

    // READ this part again
    const updateBookmark = async(id, updatedData) => {
        try {
            const response = await fetch(`/api/bookmarks/${id}`, {
                method: "POST",
                header: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            })
            
            const updatedBookmark = await response.json()
            const bookmarksCopy = [...bookmarks]
            const index = bookmarksCopy.findIndex((bookmark) => bookmark._id === id)
            // important 
            bookmarksCopy[index] = {...bookmarksCopy[index], ...updatedData}
            setBookmarks(bookmarksCopy)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const tokenData = localStorage.getItem('token')
        if(tokenData && tokenData!== 'null' && tokenData !=='undefined'){listBookmarksByUser()}
    }, [])

    useEffect(() => {
        const tokenData = localStorage.getItem('token')
        if(tokenData && tokenData!== 'null' && tokenData !=='undefined'){setToken(JSON.parse(tokenData))}
    }, [])


    //target="_blank", it's used to specify that a link should open in a new browser window or tab when clicked. 
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


        <h2> Create a bookmark</h2>
        <form onSubmit = {(e) => {
            e.preventDefault()
            createBookmark()
            }}>
            <input type="text"  placeholder="title" value={bookmark.title} name="title" onChange={handleChange}></input>
            <input type="text" placeholder="url" value={bookmark.url} name="url" onChange={handleChange}></input>
           
            <input type="submit" value="create Bookmark"/>
        </form>
        <ul>
            {bookmarks.length ? bookmarks.map(bookmark => (
                <li key = {bookmark._id}>
                       <h4>{bookmark.title}</h4>
                       <a href= {bookmark.url} target = "_blank">{bookmark.url}</a>
                </li>
            )) : <>No Bookmark added</>}
        </ul>
        
        </>
    )
}