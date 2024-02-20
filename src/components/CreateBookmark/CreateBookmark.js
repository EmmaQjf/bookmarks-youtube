export default function CreateBookmark(
    {
        createBookmark,
        bookmark,
        handleChange
    }
){
    return(
        <>
        <h2> Create a bookmark</h2>
        <form onSubmit = {(e) => {
            e.preventDefault()
            createBookmark()
            }}>
            <input type="text"  placeholder="title" value={bookmark.title} name="title" onChange={handleChange}></input>
            <input type="text" placeholder="url" value={bookmark.url} name="url" onChange={handleChange}></input>
           
            <input type="submit" value="create Bookmark"/>
        </form>
        </>
    )
}