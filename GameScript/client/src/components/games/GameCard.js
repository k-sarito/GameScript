import React from "react";
import {Card, CardBody, CardTitle, CardImg, Col} from "reactstrap";

export const GameCard = ({game}) => {

    return (
        <Col sm="6">
            <Card>
                <CardImg top width="100%" src={game.image} alt="cover image"/>
                <CardBody>
                    <CardTitle>{game.name}</CardTitle>
                </CardBody>
            </Card>        
        </Col>
    )
}