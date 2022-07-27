import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Card, CardBody, CardTitle, CardImg, CardText, Col, Collapse, Progress, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faPenToSquare, faStarHalfStroke, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../games/GameCard.css"

export const GameCard = ({game}) => {
    const [expand, setExpand] = useState(false)

    const toggleDetails = () => {
        if(expand == false){
            setExpand(true)
        } else {
            setExpand(false)
        }
    }
    return (
        <Col sm="6">
            <Card>
                <CardImg top width="100%" src={game.image} alt="cover image"/>
                <CardBody>
                    <CardTitle>{game.name}</CardTitle>
                    <Progress value={game.percentComplete}/>
                    <FontAwesomeIcon icon={faAngleDown} onClick={() => toggleDetails()} />
                    <Collapse isOpen={expand}>
                        <CardText>Average Playtime: {game.playtime} hours</CardText>
                        <CardText>Released: {game.released}</CardText>
                        <CardText>Metacritic: {game.metacritic}</CardText>
                        <CardText>ESRB: {game.esrb}</CardText>
                        <div className="gameCard--icons">
                            <FontAwesomeIcon icon={faPenToSquare}/>
                            <FontAwesomeIcon icon={faStarHalfStroke}/>
                            <FontAwesomeIcon icon={faTrash}/>
                        </div>
                    </Collapse>
                </CardBody>
            </Card>        
        </Col>
    )
}