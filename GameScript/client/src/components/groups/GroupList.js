import React, {useState, useEffect} from "react";
import { getUnjoinedUserGroups, getCurrentUserGroups, AddGroup, JoinGroup } from "../../modules/groupManager";
import { GroupCard } from "./GroupCard";
import { JoinedCard } from "./JoinedCard";
import { Row, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { TextField } from "@mui/material";


export const GroupList = () => {
    const [joined, setJoined] = useState([])
    const [unjoined, setUnjoined] = useState([])
    const [isModal, setIsModal] = useState(false)
    const [newName, setNewName] = useState('')

    

    

    useEffect(() => {
        getCurrentUserGroups()
            .then(res => setJoined(res))
            
    }, [])

    // useEffect(() => {
    //     let uniqueArr = []
    //     getUnjoinedUserGroups().then(res => {
    //         for(let item of res){
    //             if(!joined.some(element => element.id == item.id)){
                    
    //                 uniqueArr.push(item)
                    
    //             }
    //         }
    //         setUnjoined(uniqueArr)
    //     })
    // }, [isLoaded])
    useEffect(() => {
        getUnjoinedUserGroups().then(res => setUnjoined(res))
    }, [])

    const handleJoinGroup = (groupId) => {
        JoinGroup(groupId)
            .then(() => {
                getCurrentUserGroups().then(res => setJoined(res))
                getUnjoinedUserGroups().then(res => setUnjoined(res))
            })
    }

    const handleToggle = () => {
        if(isModal == false){
            setIsModal(true)
        } else {
            setIsModal(false)
        }
    }

    const handleInput = (event) => {
        setNewName(event.target.value)
    }

    const handleCreateNewGroup = () => {
        const groupToCreate = {
            name : newName
        }
        AddGroup(groupToCreate)
            .then(res => {
                return JoinGroup(res.id)
            })
            .then(() => getCurrentUserGroups())
            .then(res => setJoined(res))
        setIsModal(false)
    }

    return (
        <>
            <Button onClick={handleToggle}>Create</Button>
            <div>
                <Modal isOpen={isModal} className="newGroupModal">
                <ModalHeader>Create New Group</ModalHeader>
                <ModalBody>
                    <TextField
                        id="groupName"
                        value={newName}
                        label="Name"
                        onChange={handleInput}
                    />                    
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleCreateNewGroup}>Post</Button>{' '}
                    <Button color="secondary" onClick={() => setIsModal(false)}>Cancel</Button>
                </ModalFooter>
                </Modal>
            </div>
            <div>
                <Row>
                    <h2>Joined</h2>
                    {joined.map(group => <JoinedCard group={group} key={group.id}/>)}
                </Row>
                <Row>
                    <h2>Unjoined</h2>
                    {unjoined?.map(group => <GroupCard group={group} key={group.id} handleJoinGroup={handleJoinGroup}/>)}
                </Row>
            </div>
        </>
    )
}