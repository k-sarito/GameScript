import { rawgAPI } from "../settings";
const connURL = "https://api.rawg.io/api";

export const getAllRawgGames = () => {
    return fetch (`${connURL}/games?page_size=200&key=${rawgAPI}`)
        .then(res => res.json())
}