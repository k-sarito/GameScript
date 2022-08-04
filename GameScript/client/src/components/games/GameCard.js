import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Card, CardBody, CardTitle, CardImg, CardText, Col, Collapse, Progress, Button, Badge } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faPenToSquare, faStarHalfStroke, faTrash, faStar } from "@fortawesome/free-solid-svg-icons";
import "../games/GameCard.css"

export const GameCard = ({game}) => {
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

    const handleReviewCreateNav = (id) => {
        navigate(`/review/create/${id}`)
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
            jsx = 
            <Button onClick={() => handleReviewCreateNav(game.id)}>
                <FontAwesomeIcon icon={faStarHalfStroke}/>
            </Button>
        }
        return jsx
    }

    const handleDetailNavigate = (id) => {
        navigate(`details/${id}`)
    }
    return (
        <Col sm="3">
            <Card style={{margin : '1rem'}}>
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
                        <CardText>Released: {game.released.split("T")[0]}</CardText>
                        <CardText>Metacritic: {game.metacritic}</CardText>
                        <CardText>ESRB: {game.esrb}</CardText>
                        <div className="gameCard--icons">
                            <Button onClick={() => handleDetailNavigate(game.id)}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </Button>
                            {reviewButtonGenerator(game.review)}
                            <FontAwesomeIcon icon={faTrash}/>
                        </div>
                    </Collapse>
                </CardBody>
            </Card>        
        </Col>
    )
}