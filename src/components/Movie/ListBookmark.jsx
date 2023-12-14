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
  const [bookmarks, setBookmarks] = useState([]);
  const db = getFirestore();
  const navigate = useNavigate();
  const auth = getAuth(); // Replace with your authentication library

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        // Check if the user is signed in
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
          // Access the bookmarks subcollection
          const bookmarksCollection = await getDocs(collection(db, 'Users', userId, 'Bookmarks'));
    
          // Extract data from each bookmark
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
      console.log(bookmarkDocSnapshot)
      console.log("IDMOVIE: ",bookmarks[index].idMovie)
  
      if (bookmarkDocSnapshot.exists()) {
        // If already bookmarked, remove the movie from bookmarks
        await deleteDoc(bookmarkRef);
        console.log('Movie removed from bookmarks');
      } else {
        // If not bookmarked, add the movie to bookmarks
        await setDoc(bookmarkRef, {
          idMovie: movieId,
          title: bookmarks[index].title,
          releaseDate: bookmarks[index].releaseDate.toISOString(),
          sinopsis: bookmarks[index].sinopsis,
          genre: bookmarks[index].genre,
          posterPath: bookmarks[index].posterPath,
          dateAdded: new Date().toISOString()
          // ...
        });
        console.log('Movie added to bookmarks');
      }
  
      // Toggle the local state to update the UI
      const updatedBookmarks = [...bookmarks];
    updatedBookmarks[index].isBookmarked = !updatedBookmarks[index].isBookmarked;
    setBookmarks(updatedBookmarks);
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
            <Card.Text id="sinopsis"  onClick={() => handleClick(bookmark.idMovie)}>{bookmark.sinopsis}</Card.Text>
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
