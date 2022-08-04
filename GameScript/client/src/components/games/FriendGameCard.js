import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Card, CardBody, CardTitle, CardImg, CardText, Col, Collapse, Progress, Button, Badge } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faPenToSquare, faStarHalfStroke, faTrash, faStar } from "@fortawesome/free-solid-svg-icons";
import "../games/GameCard.css"

export const FriendGameCard = ({game}) => {
    const [expand, setExpand] = useState(false)
    const navigate = useNavigate()

    const toggleDetails = () => {
        if(expand == false){
            setExpand(true)
        } else {
            setExpand(false)
        }
    }

    const badgeGenerator = (thoughts) => {
        let jsx = ''
        if(thoughts == "Nothing yet"){
            jsx = <Badge color="dark" pill>{game.currentThoughts}</Badge>
        } else if(thoughts == "Not Loving It"){
            jsx = <Badge color="warning" pill>{game.currentThoughts}</Badge>
        } else if(thoughts == "Meh"){
            jsx = <Badge color="secondary" pill>{game.currentThoughts}</Badge>
        } else if(thoughts == "Liking It"){
            jsx = <Badge color="info" pill>{game.currentThoughts}</Badge>
        } else if(thoughts == "Loving It!"){
            jsx = <Badge color="primary" pill>{game.currentThoughts}</Badge>
        }

        return jsx
    }

    const handleReviewDetailsNav = (id) => {
        navigate(`/review/details/${id}`)
    }

    const reviewButtonGenerator = (review) => {
        let jsx = ''
        if(review != null){
            jsx = 
            <Button onClick={() => handleReviewDetailsNav(game.id)}>
                <FontAwesomeIcon icon={faStar}/>
            </Button>
        } else {
            jsx = ''
        }
        return jsx
    }

    return (
        <Col sm="4">
            <Card>
                <CardImg top width="100%" src={game.image} alt="cover image"/>
                <CardBody>
                    <CardTitle>{game.name}</CardTitle>
                    <CardText>
                        {badgeGenerator(game.currentThoughts)}
                    </CardText>
                    <Progress value={game.percentComplete}/>
                    <FontAwesomeIcon icon={faAngleDown} onClick={() => toggleDetails()} />
                    <Collapse isOpen={expand}>
                        <CardText>Average Playtime: {game.playtime} hours</CardText>
                        <CardText>Released: {game.released}</CardText>
                        <CardText>Metacritic: {game.metacritic}</CardText>
                        <CardText>ESRB: {game.esrb}</CardText>
                        <div className="gameCard--icons">                            
                            {reviewButtonGenerator(game.review)}                            
                        </div>
                    </Collapse>
                </CardBody>
            </Card>        
        </Col>
    )


}