const baseUrl = "/api/UserProfile";

export const getUserByFirebaseId = (firebase) => {
    return fetch(`${baseUrl}/${firebase}`)
        .then(res => res.json())
}