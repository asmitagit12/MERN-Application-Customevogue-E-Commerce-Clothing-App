import { useAtom } from "jotai/react";
import { atomWithStorage } from "jotai/utils"

type UseConfig = {
    isAuth: boolean
}

const loggedUser = atomWithStorage<UseConfig>("isAuth", {isAuth:false});

export function useConfig(){
    return useAtom(loggedUser)
}