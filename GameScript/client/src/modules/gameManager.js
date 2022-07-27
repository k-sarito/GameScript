const baseUrl = "/api/Game"

export const getAllGamesByUserId = (userId) => {
    return fetch(`${baseUrl}/${userId}`)
        .then(res => res.json())
}

export const addGame = (gameObj) => {
    return fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(gameObj)
    })
}