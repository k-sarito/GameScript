import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getGameById } from "../../modules/gameManager";
import { Slider, FormControl, MenuItem, InputLabel, Select, Typography } from "@mui/material";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";

export const EditProgress = () => {
    const [game, setGame] = useState({})
    const [newProgress, setNewProgress] = useState({
        progress_slider : 0
    })
    const [newThoughts, setNewThoughts] = useState('')
    const gameId = useParams()


    useEffect(() => {
        getGameById(gameId).then(res => setGame(res))
    }, [])

    handleProgressChange = (event) => {
        const progressCopy = {...newProgress}
        progressCopy[event.target.id] = event.target.value
        setNewProgress(progressCopy)
    }

    handleThoughtsChange = (event) => {
        const thoughtsCopy = {...newThoughts}
        thoughtsCopy[event.target.id] = event.target.value
        setNewThoughts(thoughtsCopy)
    }

    return (
        <>
            <Card>
                <CardImg top width="100%" src={game.image} alt="Cover image" />
                <CardBody>
                    <CardTitle>{game.name}</CardTitle>
                    <Slider
                        id="progress_slider"
                        defaultValue={game.percentComplete}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                        onChange={handleProgressChange}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="thoughts_select">Thoughts</InputLabel>
                            <Select
                                labelId="thoughts_select"
                                id="newThoughts"
                                value={newThoughts}
                                label="Thoughts"
                                onChange={handleThoughtsChange}
                            >
                                <MenuItem value={"Not Loving It"}>Not Loving It</MenuItem>
                                <MenuItem value={"Meh"}>Meh</MenuItem>
                                <MenuItem value={"Liking It"}>Liking It</MenuItem>
                                <MenuItem value={"Loving It!"}>Loving It</MenuItem>
                            </Select>
                    </FormControl>
                </CardBody>
            </Card>            
        </>
    )
}