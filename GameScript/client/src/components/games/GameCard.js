import React, { useState } from "react";
import {Card, CardBody, CardTitle, CardImg, CardText, Col, Collapse, Progress } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

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
                    </Collapse>
                </CardBody>
            </Card>        
        </Col>
    )
}