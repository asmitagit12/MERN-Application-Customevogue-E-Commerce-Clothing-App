import { apiRequest } from "../../http-common/apiRequest"
import { UserFormData } from "../../types/types"


export const getUserProfile = async (userId: string) => {
    return apiRequest({
        route: `/profile/${userId}`,
        method: 'GET'
    })
}

export const updateUserProfile = async (userId: string, data: UserFormData) => {
    return apiRequest({ route: `/profile/${userId}`, method: 'POST', data })
}