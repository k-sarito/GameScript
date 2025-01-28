import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getGameById, updateProgress } from "../../modules/gameManager";
import { Slider, FormControl, MenuItem, InputLabel, Select, Container} from "@mui/material";
import { Card, CardImg, CardBody, CardTitle, Button } from "reactstrap";

export const EditProgress = () => {
    const [game, setGame] = useState({})
    const [newProgress, setNewProgress] = useState('')
    const [newThoughts, setNewThoughts] = useState('')
    const {gameId} = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        getGameById(gameId).then(res => setGame(res))
    }, [])

    const handleProgressChange = (event) => {
        let gameCopy = {...game}
        gameCopy.percentComplete = event.target.value
        setGame(gameCopy)
    }

    const handleThoughtsChange = (event) => {
        let gameCopy = {...game}
        gameCopy.currentThoughts = event.target.value
        setGame(gameCopy)
    }

    const handleNavigate = () => {
        navigate("/games")
    }

    const handleUpdateGame = (gameObj) => {
        
        const gameCopy = {...gameObj}
        let gameToUpdate = {
            id : gameCopy.id,
            userId : gameCopy.userId,
            rawgGameId : gameCopy.rawgGameId,
            name : gameCopy.name,
            percentComplete : gameCopy.percentComplete,
            released : gameCopy.released,
            image : gameCopy.image,
            rating : gameCopy.rating,
            metacritic : gameCopy.metacritic,
            playtime : gameCopy.playtime,
            esrb : gameCopy.esrb,
            currentThoughts: gameCopy.currentThoughts
        }
        updateProgress(gameToUpdate)
        navigate("/games")
    }

    return (
        <>
        <Container maxWidth="md">
            <Card>
                <CardImg top width="100%" src={game.image} alt="Cover image" />
                <CardBody>
                    <CardTitle>{game.name}</CardTitle>
                        <Slider
                            id="newProgress"
                            value={parseInt(game.percentComplete)}
                            aria-label="Default"
                            valueLabelDisplay="auto"
                            onChange={handleProgressChange}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="thoughts_select">Thoughts</InputLabel>
                                <Select
                                    labelId="thoughts_select"
                                    id="newThoughts"
                                    value={game.currentThoughts}
                                    label="Thoughts"
                                    onChange={handleThoughtsChange}
                                >
                                    <MenuItem value={"Not Loving It"}>Not Loving It</MenuItem>
                                    <MenuItem value={"Meh"}>Meh</MenuItem>
                                    <MenuItem value={"Liking It"}>Liking It</MenuItem>
                                    <MenuItem value={"Loving It!"}>Loving It!</MenuItem>
                                </Select>
                        </FormControl>
                        <Button color="secondary" onClick={handleNavigate} block>Cancel</Button>
                        <Button color="success" onClick={() => handleUpdateGame(game)} block>Update</Button>
                </CardBody>
            </Card>            
        </Container>
        </>
    )
}