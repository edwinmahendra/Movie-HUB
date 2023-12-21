import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [justRegistered, setJustRegistered] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      // Reset justRegistered if the user is logged out
      if (!user && justRegistered) {
        setJustRegistered(false);
      }
    });

    return unsubscribe;
  }, [justRegistered]);

  // Function to manually set justRegistered (used in the registration process)
  const resetJustRegistered = () => setJustRegistered(false);

  return {
    currentUser,
    justRegistered,
    setJustRegistered,
    resetJustRegistered,
  };
};

export default useAuth;
