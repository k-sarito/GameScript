import React, {useState, useEffect} from "react";
import { GameCard } from "./GameCard";
import { useParams } from "react-router-dom";
import { Row, CardColumns } from "reactstrap";
import { getAllGamesByUserId } from "../../modules/gameManager";

export const FriendGameList = ({getLoggedInUser}) => {
    const [games, setGames] = useState([])
    const currentUser = getLoggedInUser()
    const profileId = useParams()

    useEffect(() => {
        getAllGamesByUserId(profileId)
            .then(res => setGames(res))
    }, [])
}