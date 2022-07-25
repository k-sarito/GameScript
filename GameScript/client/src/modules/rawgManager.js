import { rawgAPI } from "../settings";
const connURL = "https://api.rawg.io/api";

export const getAllRawgGames = () => {
    return fetch (`${connURL}/games?page_size=200&key=${rawgAPI}`)
        .then(res => res.json())
}

export const getRawgByPlatform = (platforms) => {
    return fetch (`${connURL}/games?platforms=${platforms}&key=${rawgAPI}`)
        .then(res => res.json())
}

export const getRawgByGenre = (genre) => {
    return fetch (`${connURL}/games?genres=${genre}&key=${rawgAPI}`)
        .then(res => res.json())
}

export const getRawgUpcoming = () => {
    return fetch (`${connURL}/games?dates=2022-01-01,2023-01-01&ordering=-released&page_size=200&key=${rawgAPI}`)
        .then(res => res.json())
}

export const getRawgTopRated = () => {
    return fetch (`${connURL}/games?metacritic=80,100&ordering=-metacritic&page_size=200&key=${rawgAPI}`)
        .then(res => res.json())
}

export const rawgSearch = (query) => {
    return fetch (`${connURL}/games?page_size=200&search=${query}&page=1&key=${rawgAPI}`)
        .then(res => res.json())
}
