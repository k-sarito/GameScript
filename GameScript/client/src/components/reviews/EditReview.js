import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getReviewByGameId, updateReview } from "../../modules/reviewManager";
import { getGameById } from "../../modules/gameManager";
import { Container, Grid, TextField, OutlinedInput, InputAdornment, FormGroup, FormControlLabel, Switch, Typography, Slider, InputLabel } from "@mui/material";
import { Card, CardImg, CardBody, CardTitle, Button, Placeholder } from "reactstrap";

export const ReviewEdit = () => {
    const [game, setGame] = useState({})
    const [review, setReview] = useState({})
    const {gameId} = useParams()
    const navigate = useNavigate()

    const [checked, setChecked] = useState(false)
    const [price, setPrice] = useState('')
    const [platform, setPlatform] = useState('')
    const [playtime, setPlaytime] = useState('')
    const [graphics, setGraphics] = useState('')
    const [story, setStory] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {
        getGameById(gameId).then(res => setGame(res))
    }, [])

    useEffect(() => {
        getReviewByGameId(gameId).then(res => setReview(res))
    }, [game])

    // ? WHY does the update function automatically switch the state of Checked when unclicked?

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

    const handleUpdateReview = (gameObj) => {
        const gameCopy = {...gameObj}
        let reviewToEdit = {
            id : review.id,
            gameId : gameCopy.id,
            userPurchasePrice : price,
            userPlatform : platform,
            userPlaytime : playtime,
            completed : checked,
            graphics : graphics, 
            story : story,
            content : content
        }
        updateReview(reviewToEdit).then(
            navigate(`/review/details/${gameCopy.id}`)
        )
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
                                <Typography gutterBottom>
                                    Price
                                </Typography>
                                <OutlinedInput
                                    
                                    id="price"
                                    value={price}
                                    defaultValue={review.userPurchasePrice}
                                    onChange={handlePrice}
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography gutterBottom>
                                    Platform
                                </Typography>
                                <TextField
                                    value={platform}
                                    label={null}
                                    id="platform"
                                    variant="standard"
                                    onChange={handlePlatform}
                                    defaultValue={review.userPlatform}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography gutterBottom>
                                    Hours
                                </Typography>
                                <TextField
                                    label={null}
                                    value={playtime}
                                    // label="Hours"
                                    variant="standard"
                                    id="playtime"
                                    defaultValue={review.userPlaytime}
                                    onChange={handlePlaytime}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <div>
                                    <Typography id="graphics_slider" gutterBottom>
                                        Graphics
                                    </Typography>
                                    <Slider 
                                        onChange={handleGraphics}
                                        value={graphics}
                                        aria-labelledby="graphics_slider"
                                        valueLabelDisplay="auto"
                                        defaultValue={parseInt(review.graphics)}
                                        size="small"
                                        id="graphics"
                                        step={1}
                                        marks
                                        min={0}
                                        max={10}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <FormGroup>
                                    <FormControlLabel id="switch" control={<Switch checked={review.completed} value={checked} onChange={handleSwitch}/>} label="Completed"/>
                                </FormGroup>
                            </Grid>
                            <Grid item xs={4}>
                                <div>
                                    <Typography id="story_slider" gutterBottom>
                                        Story
                                    </Typography>
                                    <Slider 
                                        onChange={handleStory}
                                        aria-labelledby="story_slider"
                                        valueLabelDisplay="auto"
                                        value={story}
                                        defaultValue={review.story}
                                        size="small"
                                        id="story"
                                        step={1}
                                        marks
                                        min={0}
                                        max={10}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom>
                                    Additional Thoughts
                                </Typography>
                                <TextField 
                                    id="content"
                                    fullWidth
                                    value={content}
                                    multiline
                                    rows={5}
                                    defaultValue={review.content}
                                    variant="standard"
                                    onChange={handleContent}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Button onClick={() => handleUpdateReview(game)}>Update</Button>
                            </Grid>

                        </Grid>
                    </CardBody>
                </Card>
            </Container>
        </>
    )
}