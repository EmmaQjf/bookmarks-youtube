
import Bookmark from '../Bookmark/Bookmark'

export default function BookmarkList(
    {
        bookmarks,
        updateBookmark,
        deleteBookmark
    }
) {
    return (
        <ul>
        {
            bookmarks.length? bookmarks.map(bookmark=> (
                <Bookmark 
                bookmark = {bookmark}
                key = {bookmark._id}
                updateBookmark = {updateBookmark}
                deleteBookmark = {deleteBookmark}/>

            ) ) : 
            <>
             <h2>No bookmarks yet... Add one in the form above</h2>
            </>
        }
        </ul>
    )
}