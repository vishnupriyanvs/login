import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { Col, Row, Container, Dropdown } from 'react-bootstrap';
import SideBar from '../../components/sideBar/sideBar';
import MaterialTable from 'material-table';
import axios from "axios";
import AddIcon from '@material-ui/icons/Send';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import "./interviewSchedule.css"


function InterviewSchedule() {

    const [schedule, setSchedule] = useState(Array());
    const status: string[] = ["Completed", "In progress", "Not started"]
    const [interviewStatus, setInterviewStatus] = useState("Completed")

    useEffect(() => {
        axios
            .get(`http://localhost:4000/admin/interviewschedule/${interviewStatus}`)
            .then((response: any) => {
                setSchedule(response.data)

            })
            .catch(() => {
                alert("Interview doesn't exist");
            });

    }, [interviewStatus])

    console.log(schedule)

    return (
        <>

            <SideBar/>

            <Container>
                {/* 1 */}
                <Row style={{ marginLeft: "160px" ,width:"97%"}}>
                    <h1>Schedule Interview</h1>
                    <Dropdown>
                        <Dropdown.Toggle className="dropdownHeader">
                            {interviewStatus}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {status.map((data: string) => (
                                <Dropdown.Item
                                    onClick={(e) => {
                                        setInterviewStatus(data);
                                    }}
                                >
                                    {data}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <br></br>
                    <br></br>
                    <br></br>
                    <MaterialTable
                        style={{ marginLeft: "12px" ,width: "95%" }}
                        title="Basic Selection Preview"
                        columns={[
                            { title: 'Interview', field: 'interviewTitle' },
                            {
                                title: 'Candidate',
                                render: (interview) => {
                                    return `${interview["interview_candidate"]['candidate']['firstName']} ${interview["interview_candidate"]['candidate']['lastName']}`;
                                    return console.log(interview)
                                }
                            },
                            { title: 'Date', field: 'interview_candidate.interviewDate', type: 'date' },
                            { title: 'Status', field: 'interview_candidate.interviewCandidateStatus' },
                            {
                                title: 'Request for Evaluation', render: (rowData: any) => (
                                    <div>
                                        <Tooltip title="Send">
                                            <IconButton>
                                            <AddIcon color="primary" />
                                            </IconButton>
                                        </Tooltip>
                                       
                                        <span className="dot1"></span>
                                        &nbsp;
                                        <span className="dot2"></span>
                                    </div>
                                ),
                            },
                            {
                                title: 'Result', render: (rowData: any) => (
                                    <div>
                                        <Tooltip title="View Result">
                                            <IconButton>
                                                <VisibilityIcon color="primary" />
                                            </IconButton>
                                        </Tooltip>

                                        &nbsp;
                                        &nbsp;
                                        <Tooltip title="Share Result">
                                            <IconButton>
                                                <ShareIcon color="primary" />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                ),
                            },
                        ]}
                        data={schedule}
                        options={{
                            search:true,
                            selection: false,
                            headerStyle: { background: "#3969A3", color: "#fff", fontFamily: "roboto", fontSize: "16px"},
                        }}

                    />




                </Row>
            </Container>


            <br></br>
        </>
    );
}

export default InterviewSchedule;