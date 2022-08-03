import React from "react";
import { Button, Card, CardBody, CardTitle, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";


export const JoinedCard = ({group}) => {
    const navigate = useNavigate()

    return (
        <Col sm="6">
            <Card>
                <CardBody>
                    <CardTitle>{group?.name}</CardTitle>
                    <Button onClick={() => navigate(`members/${group?.id}`)}>View</Button>
                </CardBody>
            </Card>
        </Col>
    )
}