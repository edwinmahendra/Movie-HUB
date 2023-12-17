import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const useAuth = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setIsLoading(false);
        }, (error) => {
            console.error('Error with auth state change:', error);
            setIsLoading(false); 
        });
        return unsubscribe;
    }, []);

    return { currentUser, isLoading };
};

export default useAuth;