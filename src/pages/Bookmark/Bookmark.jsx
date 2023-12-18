import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { collection, getDocs, doc, getFirestore } from "firebase/firestore";
import "./bookmark.css";
import ListBookmark from "../../components/Movie/ListBookmark";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { PropagateLoader } from "react-spinners";

export const Bookmark = () => {
  const [sorting, setSorting] = useState("dateAdded");
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();
  const db = getFirestore();
  const userLoggedIn = !!auth.currentUser;

  useEffect(() => {
    if (userLoggedIn) {
      setIsLoading(true);
      const fetchBookmarks = async () => {
        try {
          const userDocRef = doc(db, "Users", auth.currentUser.uid);
          const bookmarksCollection = await getDocs(
            collection(userDocRef, "Bookmarks")
          );
          setBookmarks(bookmarksCollection.docs.map((doc) => doc.data()));
        } catch (error) {
          console.error("Error fetching bookmarks:", error);
        }
        setIsLoading(false);
      };
      fetchBookmarks();
    }
  }, [userLoggedIn, db]);

  const handleSorting = (type) => {
    setSorting(type);
  };

  return (
    <div>
      <div className="titlePage">My Bookmarks</div>
      <div className="sorting-dropdown">
        <DropdownButton id="sorting-dropdown" title="Sort by">
          <Dropdown.Item onClick={() => handleSorting("alphabet")}>
            Alphabetically
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSorting("date")}>
            Date
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSorting("dateAdded")}>
            Date Added
          </Dropdown.Item>
        </DropdownButton>
      </div>
      <div className="container">
        {isLoading ? (
          <div className="loading-container">
            <PropagateLoader size={30} color="#6680C0" />
          </div>
        ) : userLoggedIn ? (
          bookmarks.length > 0 ? (
            <ListBookmark bookmarks={bookmarks} sorting={sorting} />
          ) : (
            <div className="no-bookmarks-container">
              <p>Sorry, you haven't added any bookmarks here.</p>
            </div>
          )
        ) : (
          <div className="no-bookmarks-container">
            <p>Please login first.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmark;
