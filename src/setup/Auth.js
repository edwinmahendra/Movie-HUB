import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [justRegistered, setJustRegistered] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
      if (user === null && justRegistered) {
        setJustRegistered(false);
      }
    });

    return unsubscribe;
  }, [justRegistered]);

  return { currentUser, isLoading, justRegistered, setJustRegistered };
};

export default useAuth;
