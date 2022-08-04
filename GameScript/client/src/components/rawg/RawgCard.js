import React, { useState } from "react";
import {Card, CardBody, CardTitle, CardImg, CardText, Col, Collapse, Button} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export const RawgCard = ({game, handleSaveGame}) => {
    const [expand, setExpand] = useState(false)

    const toggleDetails = () => {
        if(expand == false){
            setExpand(true)
        } else {
            setExpand(false)
        }
    }
    return (
        <Col sm="4">
            <Card>
                <CardImg top width="100%" src={game.background_image} alt="cover image"/>
                <CardBody>
                    <CardTitle >{game.name}</CardTitle>
                    <FontAwesomeIcon icon={faAngleDown} onClick={() => toggleDetails()} />
                    <Collapse isOpen={expand}>
                        <CardText>Average Playtime: {game.playtime} hours</CardText>
                        <CardText>Released: {game.released}</CardText>
                        <CardText>Metacritic: {game.metacritic}</CardText>
                        <CardText>ESRB: {game.esrb_rating?.name}</CardText>
                        <Button color="success" block onClick={() => handleSaveGame(game)}>Save</Button>
                    </Collapse>
                </CardBody>
            </Card>        
        </Col>
    )
}