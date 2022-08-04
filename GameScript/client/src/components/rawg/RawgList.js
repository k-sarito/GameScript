import React, {useState, useEffect} from "react";
import { getAllRawgGames, getRawgByGenre, getRawgByPlatform, getRawgTopRated, getRawgUpcoming, rawgSearch } from "../../modules/rawgManager";
import { addGame } from "../../modules/gameManager";
import { RawgCard } from "./RawgCard";
import {Container, Row, Col, Button} from "reactstrap";
import {CardColumns} from "reactstrap";
import Sidebar from "./Sidebar";
import "../../stylesheets/RawgList.css"


export const RawgList = ({getLoggedInUser}) => {
    const [games, setGames] = useState([])
    const [search, setSearch] = useState({
        searchField : ''
    })
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        getLoggedInUser().then(res => setCurrentUser(res))
    }, [])

    const getGames = () => {
        getAllRawgGames().then(res => setGames(res.results));
    }

    const gamesByGenre = (genre) => {
        getRawgByGenre(genre).then(res => setGames(res.results));
    }

    const gamesByPlatform = (platform) => {
        getRawgByPlatform(platform).then(res => setGames(res.results));
    }

    const gamesTopRated = () => {
        getRawgTopRated().then(res => setGames(res.results));
    }

    const gamesUpcoming = () => {
        getRawgUpcoming().then(res => setGames(res.results));
    }

    const searchGames = (query) => {
        rawgSearch(query).then(res => setGames(res.results));
    }

    const handleSearchInput = (event) => {
        const searchCopy = {...search}
        searchCopy[event.target.id] = event.target.value
        setSearch(searchCopy)
    }

    const handleSaveGame = (gameObj) => {
        const gameCopy = {...gameObj}
        let gameToAdd = {
            userId : currentUser.id,
            rawgGameId : gameCopy.id,
            name : gameCopy.name,
            percentComplete : 0,
            released : gameCopy.released,
            image : gameCopy.background_image,
            rating : gameCopy.rating,
            metacritic : gameCopy.metacritic,
            playtime : gameCopy.playtime,
            esrb : gameCopy.esrb_rating?.name,
            currentThoughts: 'Nothing yet'
        }
        addGame(gameToAdd)
    }

    

    useEffect(() => {
        getGames();
    }, []);

    return (
        <>
            <div className="game--display--full">
                <Sidebar gamesByGenre={gamesByGenre} gamesByPlatform={gamesByPlatform} gamesTopRated={gamesTopRated} gamesUpcoming={gamesUpcoming}/>
                <div className="search--bar">
                    <input type="text" id="searchField" placeholder="Search Games" onChange={handleSearchInput}/>
                    <Button onClick={() => searchGames(search.searchField)}>Go</Button>
                    <CardColumns style={{height: "100vh", overflow: "auto"}}>
                        <Row>                    
                            {games.map(game => <RawgCard game={game} key={game.id} currentUser={currentUser} handleSaveGame={handleSaveGame}/>)}                    
                        </Row>
                    </CardColumns>
                </div>

            </div>

            
        </>
    )
}