import React, { useState, useEffect } from "react";
import {Card, CardBody, CardTitle, CardImg, CardText, Col, Collapse, Button} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doesGameExist } from "../../modules/gameManager";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export const RawgCard = ({game, handleSaveGame, currentUser}) => {
    const [expand, setExpand] = useState(false)
    const [saved, setSaved] = useState(false)

    const toggleDetails = () => {
        if(expand == false){
            setExpand(true)
        } else {
            setExpand(false)
        }
    }

    const switcher = (gameObj) => {
        handleSaveGame(gameObj)
        setSaved(true)
    }

    const jsxArr = [
        <Button color="secondary" block disabled>Saved</Button>,
        <Button color="success" block onClick={() => switcher(game)}>Save</Button>
    ]

    

    useEffect(() => {
        doesGameExist(game.id, currentUser.id).then(res => setSaved(res))
    }, [])


    
    return (
        <Col sm="4">
            <Card style={{margin : '1rem'}}>
                <CardImg top width="100%" src={game.background_image} alt="cover image"/>
                <CardBody>
                    <CardTitle >{game.name}</CardTitle>
                    <FontAwesomeIcon icon={faAngleDown} onClick={() => toggleDetails()} />
                    <Collapse isOpen={expand}>
                        <CardText>Average Playtime: {game.playtime} hours</CardText>
                        <CardText>Released: {game.released}</CardText>
                        <CardText>Metacritic: {game.metacritic}</CardText>
                        <CardText>ESRB: {game.esrb_rating?.name}</CardText>
                        {saved ? jsxArr[0] : jsxArr[1]}
                    </Collapse>
                </CardBody>
            </Card>        
        </Col>
    )
}