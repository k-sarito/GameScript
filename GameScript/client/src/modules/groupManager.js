import { getToken } from "./authManager";
const baseUrl = "/api/Group"

export const getCurrentUserGroups = () => {
    return getToken().then(token => {
        return fetch(`${baseUrl}/Joined`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json())
    })
}

export const getUnjoinedUserGroups = () => {
    return getToken().then(token => {
        return fetch(`${baseUrl}/Unjoined`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json())
    })
}

export const AddGroup = (groupObj) => {
    return getToken().then(token => {
        return fetch(`${baseUrl}/Create`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(groupObj)
        })
    })
}

export const JoinGroup = (groupId) => {
    return getToken().then(token => {
        return fetch(`${baseUrl}/Join`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(groupId)
        })
    })
}