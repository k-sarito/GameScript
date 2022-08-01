import React from "react";
import { Button, Card, CardBody, CardTitle, Col } from "reactstrap";


export const JoinedCard = ({group}) => {


    return (
        <Col sm="6">
            <Card>
                <CardBody>
                    <CardTitle>{group?.name}</CardTitle>
                    <Button>View</Button>
                </CardBody>
            </Card>
        </Col>
    )
}