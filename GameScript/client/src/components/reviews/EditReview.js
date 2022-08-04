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

    

    useEffect(() => {
        getGameById(gameId).then(res => setGame(res))
    }, [])

    useEffect(() => {
        getReviewByGameId(gameId).then(res => setReview(res))
    }, [game])

    // ? WHY does the update function automatically switch the state of Checked when unclicked?

    const handleSwitch = (event) => {
        let reviewCopy = {...review}
        reviewCopy.completed = event.target.value
        setReview(reviewCopy)
    }

    const handlePrice = (event) => {
        let reviewCopy = {...review}
        reviewCopy.userPurchasePrice = event.target.value
        setReview(reviewCopy)
    }

    const handlePlatform = (event) => {
        let reviewCopy = {...review}
        reviewCopy.userPlatform = event.target.value
        setReview(reviewCopy)
    }

    const handlePlaytime = (event) => {
        let reviewCopy = {...review}
        reviewCopy.userPlaytime = event.target.value
        setReview(reviewCopy)
    }

    const handleGraphics = (event) => {
        let reviewCopy = {...review}
        reviewCopy.graphics = event.target.value
        setReview(reviewCopy)
    }

    const handleStory = (event) => {
        let reviewCopy = {...review}
        reviewCopy.story = event.target.value
        setReview(reviewCopy)
    }

    const handleContent = (event) => {
        let reviewCopy = {...review}
        reviewCopy.content = event.target.value
        setReview(reviewCopy)
    }

    const handleUpdateReview = (reviewObj) => {
        const reviewCopy = {...reviewObj}
        let reviewToEdit = {
            id : reviewCopy.id,
            gameId : gameId,
            userPurchasePrice : reviewCopy.userPurchasePrice,
            userPlatform : reviewCopy.userPlatform,
            userPlaytime : reviewCopy.userPlaytime,
            completed : reviewCopy.completed,
            graphics : reviewCopy.graphics, 
            story : reviewCopy.story,
            content : reviewCopy.content
        }
        updateReview(reviewToEdit).then(
            navigate(`/review/details/${gameId}`)
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
                                    value={review.userPurchasePrice}
                                    
                                    onChange={handlePrice}
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography gutterBottom>
                                    Platform
                                </Typography>
                                <TextField
                                    value={review.userPlatform}
                                    label={null}
                                    id="platform"
                                    variant="standard"
                                    onChange={handlePlatform}
                                    
                                    
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography gutterBottom>
                                    Hours
                                </Typography>
                                <TextField
                                    label={null}
                                    value={review.userPlaytime}
                                    // label="Hours"
                                    variant="standard"
                                    id="playtime"
                                    
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
                                        value={parseInt(review.graphics)}
                                        aria-labelledby="graphics_slider"
                                        valueLabelDisplay="auto"
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
                                    <FormControlLabel id="switch" control={<Switch checked={review.completed} value={review.completed} onChange={handleSwitch}/>} label="Completed"/>
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
                                        value={parseInt(review.story)}
                                        
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
                                    value={review.content}
                                    multiline
                                    rows={5}
                                    variant="standard"
                                    onChange={handleContent}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Button onClick={() => handleUpdateReview(review)}>Update</Button>
                            </Grid>

                        </Grid>
                    </CardBody>
                </Card>
            </Container>
        </>
    )
}