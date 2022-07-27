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

export const getGameById = (id) => {
    return fetch(`${baseUrl}/Details/${id}`)
        .then(res=> res.json())
}

export const updateProgress = (gameObj) => {
    return fetch(`${baseUrl}/${gameObj.id}`,{
        method: "PUT",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(gameObj)
    }).then(res => res.json())
} 