/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFormReturn } from "react-hook-form"
import { useGetUsers } from "@/http/get/useGetUsers"
import { useGetUserId } from "@/http/get/useGetUserId"
import { useGetUserByCPF } from "@/http/get/useGetUserByCPF"
import { useGetUserByEmail } from "@/http/get/useGetUserByEmail"
import { useGetUserByName } from "@/http/get/useGetUserByName"
import type { getUserType } from "@/http/types/get-users-type"
import type { userFullType } from "@/http/types/get-user-full-data-type"
import { useEffect, useMemo, useState } from "react"

type SearchSetters = {
    setUserId: (id: string | undefined) => void;
    setUserCPF: (cpf: string | undefined) => void;
    setUserEmail: (email: string | undefined) => void;
    setUserName: (name: string | undefined) => void;
    resetSearch: () => void;
}

type FormType = {
    setError: UseFormReturn<any>['setError'],
    clearErrors: UseFormReturn<any>['clearErrors'],
    reset: UseFormReturn<any>['reset'],
}

const useSearchDataHandler = (
    data: any,
    isDataError: boolean,
    dataError: any,
    form: FormType,
    setTableData: React.Dispatch<React.SetStateAction<getUserType | userFullType | undefined>>,
    resetQuery: (val: undefined) => void,
    fieldName: "id" | "cpf" | "email" | "name" 
) => {
    useEffect(() => {
        if (data === undefined && !isDataError) {
            return;
        }

        form.clearErrors(fieldName as any);

        if (isDataError) {
            form.setError(fieldName as any, {
                type: "manual",
                message: "Erro ao buscar usuário"
            })
            console.error(dataError)
        } else if (data === null) {
            form.setError(fieldName as any, {
                type: "manual",
                message: "Usuário não encontrado"
            })
        } else if (data) {
            setTableData(data)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, isDataError, dataError, form.setError, form.clearErrors, setTableData, resetQuery, fieldName])
}

export const useFilterUser = (form: FormType) => {
    const [userId, setUserId] = useState<string | undefined>()
    const [userCPF, setUserCPF] = useState<string | undefined>()
    const [userEmail, setUserEmail] = useState<string | undefined>()
    const [userName, setUserName] = useState<string | undefined>()

    const [tableData, setTableData] = useState<getUserType | userFullType | undefined>([])

    const { data: dataUsers } = useGetUsers();
    const { data: dataUserID, isError: isUserIDError, error: userIDError } = useGetUserId(userId);
    const { data: dataUserCPF, isError: isUserCPFError, error: userCPFError } = useGetUserByCPF(userCPF);
    const { data: dataUserEmail, isError: isUserEmailError, error: userEmailError } = useGetUserByEmail(userEmail);
    const { data: dataUserName, isError: isUserNameError, error: userNameError } = useGetUserByName(userName);

    useEffect(() => {
        if (dataUsers) {
            setTableData(dataUsers)
        }
    }, [dataUsers, userId, userCPF, userEmail, userName])


    useSearchDataHandler(
        dataUserID,
        isUserIDError,
        userIDError,
        form,
        setTableData,
        setUserId,
        "id"
    )

    useSearchDataHandler(
        dataUserCPF,
        isUserCPFError,
        userCPFError,
        form,
        setTableData,
        setUserCPF,
        "cpf"
    )

    useSearchDataHandler(
        dataUserEmail,
        isUserEmailError,
        userEmailError,
        form,
        setTableData,
        setUserEmail,
        "email"
    )

    useSearchDataHandler(
        dataUserName,
        isUserNameError,
        userNameError,
        form,
        setTableData,
        setUserName,
        "name"
    )
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const resetSearch = () => {
        setUserId(undefined)
        setUserCPF(undefined)
        setUserEmail(undefined)
        setUserName(undefined)
        form.reset() 
        form.clearErrors() 
        if (dataUsers) setTableData(dataUsers)
    }

    const setters: SearchSetters = useMemo(() => ({
        setUserId,
        setUserCPF,
        setUserEmail,
        setUserName,
        resetSearch
    }), [resetSearch])

    return { tableData, setters, dataUsers };
}