const baseUrl = "/api/Game"

export const getAllGamesByUserId = (userId) => {
    return fetch(`${baseUrl}/${userId}`)
        .then(res => res.json())
}