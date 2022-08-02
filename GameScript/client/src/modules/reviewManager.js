const baseUrl = "/api/Review"

export const getReviewByGameId = (gameId) => {
    return fetch(`${baseUrl}/${gameId}`)
        .then(res => res.json())
}

export const addReview = (reviewObj) => {
    return fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(reviewObj)
    })
}

export const updateReview = (reviewObj) => {
    return fetch(`${baseUrl}/${reviewObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(reviewObj)
    })
}