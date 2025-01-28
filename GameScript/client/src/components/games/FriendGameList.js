import React, {useState, useEffect} from "react";
import { FriendGameCard } from "./FriendGameCard";
import { useParams } from "react-router-dom";
import { Row, CardColumns } from "reactstrap";
import { getAllGamesByUserId } from "../../modules/gameManager";

export const FriendGameList = ({}) => {
    const [games, setGames] = useState([])
    const {profileId} = useParams()

    useEffect(() => {
        getAllGamesByUserId(profileId)
            .then(res => setGames(res))
    }, [])

    return (
        <>
            <div className="game--display--full">
                <h2></h2>
                <CardColumns>
                    <Row>
                        {games?.map(game => <FriendGameCard game={game} key={game.id}/>)}
                    </Row>
                </CardColumns>
            </div>
        </>
    )
}