import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { collection, getDocs, doc, getDoc, updateDoc, getFirestore } from "firebase/firestore";

import bookmarkon from '../../assets/bookmark.svg';
import bookmarkoff from '../../assets/bookmark-off.svg';

import "./listBookmark.css";
import { getAuth } from "firebase/auth";

const ListBookmark = ({ sorting, userId }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const db = getFirestore();
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
            console.log("Bookmark Data:", data); // Log the data
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
  

  const toggleBookmark = async (index) => {
    const selectedBookmark = bookmarks[index];

    try {
      // Update the isBookmarked field in the user's bookmark document
      const bookmarkRef = doc(collection(db, "Users", userId, "Bookmarks"), selectedBookmark.id);
      
      await updateDoc(bookmarkRef, {
        isBookmarked: !selectedBookmark.isBookmarked,
      });

      // Update local state
      const updatedBookmarks = [...bookmarks];
      updatedBookmarks[index].isBookmarked = !updatedBookmarks[index].isBookmarked;
      setBookmarks(updatedBookmarks);

      console.log("Bookmark Toggled:", updatedBookmarks[index]); // Log the updated bookmark
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  const sortBookmarks = (sortingType) => {
    const sortedBookmarks = [...bookmarks];

    if (sortingType === "alphabet") {
      sortedBookmarks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortingType === "date") {
      sortedBookmarks.sort((a, b) => a.date.localeCompare(b.date));
    } else if (sortingType === "dateAdded") {
      sortedBookmarks.sort((b, a) => a.dateAdded.localeCompare(b.dateAdded));
    }

    return sortedBookmarks;
  };

  const sortedBookmarks = sortBookmarks(sorting || "dateAdded");

  return (
    <>
      {sortedBookmarks.map((bookmark, index) => (
        <Card className="image" key={index}>
          <Card.Img className="posterImg" variant="top" src={bookmark.image} alt="Poster" />
          <Card.Body id="body">
            <Card.Title id="title">
              {bookmark.title}
              <img
                className="bookmark"
                src={bookmark.isBookmarked ? bookmarkon : bookmarkoff}
                onClick={() => toggleBookmark(index)}
              />
            </Card.Title>

            <Card.Text id="movie-date">
              {new Date(bookmark.date).toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" })}
            </Card.Text>
            <Card.Text id="sinopsis">{bookmark.sinopsis}</Card.Text>
            <Card.Text id="date-added">
              <b>Date Added:</b> {new Date(bookmark.dateAdded).toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" })}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default ListBookmark;
