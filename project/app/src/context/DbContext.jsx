import { createContext, useContext, useEffect, useState } from "react";
import { updateUserRequest } from "../api/db"
import { useAuth } from "./AuthContext";

export const DbContext = createContext()

export const useDb = () => {
    const context = useContext(DbContext)
    if (!context) {
        throw new Error("useDb must be used within an DbProvider")
    } else {
        return context
    }
}

export const DbProvider = ({ children }) => {
    const [errors, setErrors] = useState({
        status: null,
        error: null,
        message: null
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isOk, setIsOk] = useState(false)
    const [operation, setOperation] = useState("")

    const { user, setUser } = useAuth()

    const clearErrors = () => {
        setErrors({
            status: null,
            error: null,
            message: null
        })
        setOperation("")
        setIsOk(false)
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

    const updateUser = async (obj) => {
        setOperation("updateUser")
        const jwtTokenString=window.localStorage.getItem("jwtToken")
        if (jwtTokenString) {
            const jwtToken=JSON.parse(jwtTokenString)
            setIsLoading(true)
            setIsOk(false)
            try {
                const res = await updateUserRequest(obj, jwtToken)
                const data = res.data
                setErrors({
                    status: 200,
                    error: "",
                    message: data.message,
                })
                setIsOk(true)
                setUser(data.user)
            } catch (error) {
                setErrorsRequest(error, "updateUser")
                setIsOk(false)
            } 
            setIsLoading(false)
        } else {
            setErrors({
                status: 401,
                error: "",
                message: "No se cuenta con autorizacion. Favor de volver a iniciar sesion en la aplicacion.",
            })
        }
    }

    return (
        <DbContext.Provider value={{
            clearErrors,
            updateUser,
            errors,
            isLoading,
            isOk,
            operation,
        }}>
            {children}
        </DbContext.Provider>
    )
}