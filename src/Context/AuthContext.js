import { createContext, useContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    signOut ,onAuthStateChanged , GoogleAuthProvider , signInWithPopup
} from 'firebase/auth'

import { auth } from '../init-firebase'


const AuthContext = createContext({
    currentUser: null,
    register: () => Promise,
    login: ()=>Promise,
    logout: () => Promise,
    signInWithGoogle: ()=>Promise,
})

export const useAuth = () => useContext(AuthContext) 

export default function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    function register(email, password) {
        return createUserWithEmailAndPassword(auth,email,password) 
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth , email, password)
    }

    function logout() {
        return signOut(auth)
    }

    function signInWithGoogle() {
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth,provider)
    }

    const value = {
        currentUser,
        register,
        login,
        logout,
        signInWithGoogle
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
} 