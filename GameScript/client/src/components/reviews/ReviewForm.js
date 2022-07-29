import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addReview } from "../../modules/reviewManager";
import { getGameById } from "../../modules/gameManager";
import { Container, Grid, TextField, OutlinedInput, InputAdornment, FormGroup, FormControlLabel, Switch, Typography, Slider, InputLabel } from "@mui/material";
import { Card, CardImg, CardBody, CardTitle, Button } from "reactstrap";



export const ReviewForm = () => {
    const [game, setGame] = useState({})
    const {gameId} = useParams()
    const [checked, setChecked] = useState(false)
    const [price, setPrice] = useState('')
    const [platform, setPlatform] = useState('')
    const [playtime, setPlaytime] = useState('')
    const [graphics, setGraphics] = useState('')
    const [story, setStory] = useState('')
    const [content, setContent] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        getGameById(gameId).then(res => setGame(res))
    }, [])

    const handleSwitch = (event) => {
        setChecked(event.target.checked)
    }

    const handlePrice = (event) => {
        setPrice(event.target.value)
    }

    const handlePlatform = (event) => {
        setPlatform(event.target.value)
    }

    const handlePlaytime = (event) => {
        setPlaytime(event.target.value)
    }

    const handleGraphics = (event) => {
        setGraphics(event.target.value)
    }

    const handleStory = (event) => {
        setStory(event.target.value)
    }

    const handleContent = (event) => {
        setContent(event.target.value)
    }

    const handlePostReview = (gameObj) => {
        const gameCopy = {...gameObj}
        let reviewToAdd = {
            gameId : gameCopy.id,
            userPurchasePrice : price,
            userPlatform : platform,
            userPlaytime : playtime,
            completed : checked,
            graphics : graphics, 
            story : story,
            content : content
        }
        addReview(reviewToAdd)
        navigate("/games")
    }

    return (
        <>
            <Container maxWidth="md">
                <Card>
                    <CardImg top width="100%" src={game.image} alt="Cover image"/>
                    <CardBody>
                        <CardTitle>{game.name} Review</CardTitle>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <OutlinedInput
                                    required
                                    label="Price"
                                    id="price"
                                    value={price}
                                    onChange={handlePrice}
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    required
                                    label="Platform"
                                    id="platform"
                                    value={platform}
                                    onChange={handlePlatform}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    required
                                    label="Hours"
                                    id="playtime"
                                    value={playtime}
                                    onChange={handlePlaytime}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <div>
                                    <Typography id="graphics_slider" gutterBottom>
                                        Graphics
                                    </Typography>
                                    <Slider 
                                        aria-labelledby="graphics_slider"
                                        valueLabelDisplay="auto"
                                        value={graphics}
                                        size="small"
                                        id="graphics"
                                        step={1}
                                        marks
                                        min={0}
                                        max={10}
                                        onChange={handleGraphics}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <FormGroup>
                                    <FormControlLabel id="switch" control={<Switch checked={checked} onChange={handleSwitch} inputProps={{'aria-label': 'controlled'}} />} label="Completed"/>
                                </FormGroup>
                            </Grid>
                            <Grid item xs={4}>
                                <div>
                                    <Typography id="story_slider" gutterBottom>
                                        Story
                                    </Typography>
                                    <Slider 
                                        aria-labelledby="story_slider"
                                        valueLabelDisplay="auto"
                                        value={story}
                                        size="small"
                                        id="story"
                                        step={1}
                                        marks
                                        min={0}
                                        max={10}
                                        onChange={handleStory}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    id="content"
                                    fullWidth
                                    label="Additional Thoughts"
                                    multiline
                                    rows={5}
                                    value={content}
                                    onChange={handleContent}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Button onClick={() => handlePostReview(game)}>Post</Button>
                            </Grid>

                        </Grid>
                    </CardBody>
                </Card>
            </Container>
        </>
    )


}