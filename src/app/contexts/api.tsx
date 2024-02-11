/* eslint-disable @typescript-eslint/no-explicit-any */
import { http } from "@/lib/api";
import { AxiosResponse } from "axios";
import { ReactNode, createContext, useContext } from "react"
import { useToastStore } from "@/app/stores/toast";

export interface PostProps {}

type ApiContextProps = {
    callPost(url: string, payload: PostProps): Promise<AxiosResponse>
    callGet(url: string): Promise<AxiosResponse>,
    isSuccess(status: number): boolean
}

const ApiContext = createContext<ApiContextProps>({} as ApiContextProps);

type ApiProviderProps = {
    children: ReactNode
}

export const ApiProvider = ({ children }: ApiProviderProps) => {
    const { openToast } = useToastStore()

    const callPost = async (url: string, payload: PostProps) => {
        try {
            return await http.post(url, payload);
        } catch (error: any) {
            onError(error)

            return error.response;
        }
    }

    const callGet = async (url: string) => {
        try {
            return await http.get(url);
        } catch (error: any) {
            onError(error)

            return error.response;
        }
    }

    const onError = (error: any) => {
        const { data } = error.response;

        openToast('Login Failed', data.message);
    }

    const isSuccess = (status: number) => status.toString().at(0) === '2';

    return (
        <ApiContext.Provider
            value={{
                callPost,
                callGet,
                isSuccess
            }}
        >
            {children}
        </ApiContext.Provider>
    )
}

export const useApi = () => useContext(ApiContext);