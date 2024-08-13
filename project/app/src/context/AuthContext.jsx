import { createContext, useContext, useEffect, useState } from "react";
import { signInRequest, verifyJwtTokenRequest } from "../api/auth";

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    } else {
        return context
    }
}

export const AuthProvider = ({ children }) => {
    const [errors, setErrors] = useState({
        status: null,
        error: null,
        message: null
    })
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [operation, setOperation] = useState("")
    const [user, setUser] = useState({
        username: null
    })

    // Solo se ejecute una vez después del renderizado inicial y no en renderizados posteriores
    useEffect(() => {
        async function verifyJwtToken() {
            setOperation("verifyJwtToken")
            setIsLoading(true)
            const jwtTokenString = window.localStorage.getItem("jwtToken")
            if (jwtTokenString) {
                const jwtToken = JSON.parse(jwtTokenString)
                try {
                    const res = await verifyJwtTokenRequest(jwtToken)
                    const data = res.data
                    setErrors({
                        status: 200,
                        error: "",
                        message: data.message,
                    })
                    setUser(data.user)
                    setIsAuthenticated(true)
                } catch (error) {
                    setErrorsRequest(error)
                    setUser({
                        username: null
                    })
                    setIsAuthenticated(false)
                }
            } else {
                setUser({
                    username: null
                })
                setIsAuthenticated(false)
            }
            setIsLoading(false)
        }
        verifyJwtToken()
    }, [])

    const clearErrors = () => {
        setErrors({
            status: null,
            error: null,
            message: null
        })
        setOperation("")
    }

    const setErrorsRequest = (error, op) => {
        if (error.response && error.response.data) {
            setErrors({
                status: error.response.status,
                error: error.response.data.error,
                message: error.response.data.message,
            })
        }else{
            setErrors({
                status: 400,
                error: "",
                message: `(${op}) Ha ocurrido un problema inesperado`,
            })
        }
    }

    const signIn = async (obj) => {
        setOperation("signIn")
        setIsLoading(true)
        try {
            const res = await signInRequest(obj)
            const data = res.data
            setUser(data.user)
            setIsAuthenticated(true)
            window.localStorage.setItem("jwtToken", JSON.stringify(data.jwtToken))
        } catch (error) {         
            setErrorsRequest(error, "signIn")
            setUser({
                username: null
            })
            setIsAuthenticated(false)
        } 
        setIsLoading(false)
    }

    const logOut = () => {
        setOperation("logOut")
        window.localStorage.removeItem("jwtToken")
        setUser({
            username: null
        })
        setIsAuthenticated(false)
        clearErrors()
    }

    return (
        <AuthContext.Provider value={{
            clearErrors,
            signIn,
            logOut,
            errors,
            isAuthenticated,
            isLoading,
            operation,
            user,
            setUser,
        }}>
            {children}
        </AuthContext.Provider>
    )
}