import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getReviewByGameId } from "../../modules/reviewManager";
import { getGameById } from "../../modules/gameManager";
import { Container, Grid, TextField, OutlinedInput, InputAdornment, FormGroup, FormControlLabel, Switch, Typography, Slider, InputLabel } from "@mui/material";
import { Card, CardImg, CardBody, CardTitle, Button, Placeholder } from "reactstrap";

export const ReviewDetials = ({getLoggedInUser}) => {
    const [game, setGame] = useState({})
    const [review, setReview] = useState({})
    const {gameId} = useParams()
    const [currentUser, setCurrentUser] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getGameById(gameId).then(res => setGame(res))
    }, [])

    useEffect(() => {
        getReviewByGameId(gameId).then(res => setReview(res))
    }, [game])

    useEffect(() => {
        getLoggedInUser().then(res => setCurrentUser(res))
    }, [game])

    const handleEditNav = (gameId) => {
        navigate(`/review/edit/${gameId}`)
    }

    const editButtonGenerator = (gameObj) => {
        let jsx = ''
        if(gameObj.userId == currentUser.id){
            jsx = <Button onClick={() => handleEditNav(game.id)}>Edit</Button>
        } else {
            jsx = ''
        }
        return jsx
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
                                    readOnly
                                    // label="Price"
                                    id="price"
                                    value={review.userPurchasePrice}
                                    defaultValue={review.userPurchasePrice}
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography gutterBottom>
                                    Platform
                                </Typography>
                                <TextField
                                    aria-readonly
                                    value={review.userPlatform}
                                    label={null}
                                    // label="Platform"
                                    id="platform"
                                    variant="standard"
                                    // defaultValue={review.userPlatform}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography gutterBottom>
                                    Hours
                                </Typography>
                                <TextField
                                    aria-readonly
                                    label={null}
                                    value={review.userPlaytime}
                                    // label="Hours"
                                    variant="standard"
                                    id="playtime"
                                    defaultValue={review.userPlaytime}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <div>
                                    <Typography id="graphics_slider" gutterBottom>
                                        Graphics
                                    </Typography>
                                    <Slider 
                                        
                                        value={parseInt(review.graphics)}
                                        aria-labelledby="graphics_slider"
                                        valueLabelDisplay="auto"
                                        // defaultValue={parseInt(review.graphics)}
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
                                    <FormControlLabel id="switch" control={<Switch checked={review.completed} value={review.completed} />} label="Completed"/>
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
                                        value={parseInt(review.story)}
                                        // disabled
                                        // defaultValue={review.story}
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
                                    // label="Additional Thoughts"
                                    multiline
                                    rows={5}
                                    defaultValue={review.content}
                                    variant="standard"
                                    aria-readonly
                                />
                            </Grid>
                            <Grid item xs={4}>
                                {editButtonGenerator(game)}
                            </Grid>

                        </Grid>
                    </CardBody>
                </Card>
            </Container>
        </>
    )

}