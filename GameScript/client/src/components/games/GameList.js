import React, {useState, useEffect} from "react";
import { GameCard } from "./GameCard";
import { Row } from "reactstrap";
import { getAllGamesByUserId } from "../../modules/gameManager";

export const GameList = ({getLoggedInUser}) => {
    const [games, setGames] = useState([])

    const getUserGames = (userId) => {
        getAllGamesByUserId(userId)
            .then(res => setGames(res))
    }

    

    useEffect(()=> {
        getLoggedInUser()
        .then(res => getUserGames(res.id))
    }, [])

    
}