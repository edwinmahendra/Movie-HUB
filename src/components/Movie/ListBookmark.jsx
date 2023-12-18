import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { collection, getDocs, doc, getDoc, setDoc,deleteDoc,updateDoc, getFirestore } from "firebase/firestore";
import { useNavigate } from 'react-router';
import bookmarkon from '../../assets/bookmark.svg';
import bookmarkoff from '../../assets/bookmark-off.svg';
import "./listBookmark.css";
import { getAuth } from "firebase/auth";

const ListBookmark = ({ sorting, userId }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const db = getFirestore();
  const navigate = useNavigate();
  const auth = getAuth(); 

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.log("No user is currently signed in.");
          return;
        }
    
        const userId = user.uid;
        console.log("Current User ID:", userId);
    
        // Get the user document
        const db = getFirestore();
        const userDocRef = doc(db, 'Users', userId);
        const userDocSnapshot = await getDoc(userDocRef);
    
        if (userDocSnapshot.exists()) {
          const bookmarksCollection = await getDocs(collection(db, 'Users', userId, 'Bookmarks'));
    
          const bookmarksData = bookmarksCollection.docs.map((bookmarkDoc) => {
            const data = bookmarkDoc.data();
            data.releaseDate = parseDateString(data.releaseDate);
            data.dateAdded = parseDateString(data.dateAdded);
            // console.log("Bookmark Data:", data); // Log the data
            return data;
          });
          setBookmarks(bookmarksData);
        } else {
          console.log("User document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };
  
    fetchBookmarks();
  }, [db, auth]);


  
  const parseDateString = (dateString) => {
    return new Date(dateString);
  };
  const toggleBookmark = async (index) => {
    const user = auth.currentUser;
    if (!user) {
      console.log("No user is currently signed in.");
      return;
    }
  
    const userId = user.uid;
    const movieId = bookmarks[index].idMovie;
  
    try {
      const bookmarkRef = doc(db, 'Users', userId, 'Bookmarks', movieId);
      const bookmarkDocSnapshot = await getDoc(bookmarkRef);
  
      if (bookmarkDocSnapshot.exists()) {
        await deleteDoc(bookmarkRef);
        console.log('Movie removed from bookmarks');
        // Remove the bookmark from the local state
        setBookmarks(currentBookmarks => currentBookmarks.filter((_, i) => i !== index));
      } else {
        // Add bookmark logic (if needed)
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };
  
  const sortBookmarks = (sortingType) => {
    const sortedBookmarks = [...bookmarks];
  
    if (sortingType === "alphabet") {
      sortedBookmarks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortingType === "date") {
      sortedBookmarks.sort((a, b) => a.releaseDate - b.releaseDate);
    } else if (sortingType === "dateAdded") {
      sortedBookmarks.sort((a, b) => parseDateString(b.dateAdded) - parseDateString(a.dateAdded));
    }
  
    return sortedBookmarks;
  };
  const handleClick = (idMovie) => {
    navigate(`/detail/${idMovie}`);
}

  const sortedBookmarks = sortBookmarks(sorting || "dateAdded");
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (index) => {
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
    );
  };

  return (
    <>
      {sortedBookmarks.map((bookmark, index) => (
        <Card className="image">
        <Card.Img className="posterImg" variant="top" src={bookmark.posterPath} alt="Poster"  onClick={() => handleClick(bookmark.idMovie)}/>
        <Card.Body id="body">
          <Card.Title id="title">
            <span  onClick={() => handleClick(bookmark.idMovie)}>
              {bookmark.title }
            </span>
            <img
              className="bookmark"
              src={bookmark.isBookmarked ? bookmarkoff : bookmarkon}
              onClick={() => toggleBookmark(index)}
            />
            </Card.Title>

            <Card.Text id="movie-date"  onClick={() => handleClick(bookmark.idMovie)}>
              {bookmark.releaseDate.toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" })}
            </Card.Text>
            <Card.Text id="genre" onClick={() => handleClick(bookmark.idMovie)}>{bookmark.genre}</Card.Text>
            <Card.Text id="sinopsis" onClick={toggleExpand}>
            {isExpanded ? (
              bookmark.sinopsis
            ) : (
              <div className="sinopsis-container">
            {bookmark.sinopsis.length > 200 && !expandedIndexes.includes(index) ? (
              <>
                <p className="sinopsis-text">
                {`${bookmark.sinopsis.substring(0, 150)} ... `}
                <span className="see-more" onClick={() => toggleExpand(index)}>
                    See more
                </span>
                </p>

              </>
            ) : (
              <div className="sinopsis-text-expanded">
                {bookmark.sinopsis}
              </div>
            )}
          </div>
            )}
          </Card.Text>       
          <Card.Text id="date-added"  onClick={() => handleClick(bookmark.idMovie)}>
              <b>Date Added:</b> {bookmark.dateAdded.toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" })}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default ListBookmark;
