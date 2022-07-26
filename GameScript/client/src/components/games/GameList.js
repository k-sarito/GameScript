import React, {useState, useEffect} from "react";
import { GameCard } from "./GameCard";
import { Row } from "reactstrap";
import { getAllGamesByUserId } from "../../modules/gameManager";

export const GameList = ({getLoggedInUser}) => {
    const [games, setGames] = useState([])
    const [currentUser, setCurrentUser] = useState({})

    const getUserGames = (userId) => {
        getAllGamesByUserId(userId)
            .then(res => setGames(res))
    }

    useEffect(()=> {
        setCurrentUser(getLoggedInUser)
        console.log(currentUser)
    }, [])
}