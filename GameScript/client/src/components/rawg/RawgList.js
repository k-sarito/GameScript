import React, {useState, useEffect} from "react";
import { getAllRawgGames } from "../../modules/rawgManager";
import { RawgCard } from "./RawgCard";
import {Container, Row, Col} from "reactstrap";
import {CardColumns} from "reactstrap";


export const RawgList = ({getLoggedInUser}) => {
    const [games, setGames] = useState([])

    const getGames = () => {
        getAllRawgGames().then(res => setGames(res.results));
    }

    useEffect(() => {
        getGames();
    }, []);

    return (
        <>
            <CardColumns>
                <Row>                    
                    {games.map(game => <RawgCard game={game} key={game.id}/>)}                    
                </Row>
            </CardColumns>

            
        </>
    )
}