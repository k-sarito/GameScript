import React from "react";
import { Button, Card, CardBody, CardTitle, Col } from "reactstrap";


export const GroupCard = ({group, handleJoinGroup}) => {


    return (
        <Col sm="6">
            <Card>
                <CardBody>
                    <CardTitle>{group?.name}</CardTitle>
                    <Button onClick={() => handleJoinGroup(group.id)}>Join</Button>
                </CardBody>
            </Card>
        </Col>
    )
}