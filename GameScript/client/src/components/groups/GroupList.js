import React, {useState, useEffect} from "react";
import { getUnjoinedUserGroups, getCurrentUserGroups, AddGroup, JoinGroup } from "../../modules/groupManager";
import { GroupCard } from "./GroupCard";
import { JoinedCard } from "./JoinedCard";
import { Row } from "reactstrap";


export const GroupList = () => {
    const [joined, setJoined] = useState([])
    const [unjoined, setUnjoined] = useState([])

    useEffect(() => {
        getCurrentUserGroups().then(res => setJoined(res))
    }, [])

    useEffect(() => {
        getUnjoinedUserGroups().then(res => setUnjoined(res))
    }, [])

    const handleJoinGroup = (groupId) => {
        JoinGroup(groupId)
    }

    return (
        <>
            <Row>
                {joined.map(group => <JoinedCard group={group} key={group.id}/>)}
            </Row>
            <Row>
                {unjoined.map(group => <GroupCard group={group} key={group.id} handleJoinGroup={handleJoinGroup}/>)}
            </Row>
        </>
    )
}