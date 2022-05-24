import React, { useState, useEffect } from "react";
import Icon from '@mui/material/Icon';
import "./interview.css"
import { Tooltip } from "@material-ui/core";
import InterviewModal from "../../modal/interviewModal";

//Interview creation

function Interview(props: any) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Tooltip title="Create Interview">
                <Icon color="primary" style={{ marginLeft: "-70%", cursor: "pointer", marginTop: "10px" }} fontSize="large" onClick={handleShow} >add_circle</Icon>
            </Tooltip>
            <InterviewModal
                show={show}
                handleClose={handleClose}
                flag={true} 
            />
        </>
    );
}

export default Interview;