import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Card, Col, Row, Container, Dropdown } from 'react-bootstrap';
import SideBar from '../../components/sideBar/sideBar';
import MaterialTable from "material-table";
import AddIcon from '@material-ui/icons/Send';
import AlertDialog from "./popup";
import Tooltip from '@mui/material/Tooltip';
import Interview from "../interview/interview"
import InterviewModal from "../../modal/interviewModal";




function InterviewGrid() {
    const [interview, setInterview] = useState([]);
    const [status, setStatus] = useState(["Active", "In Active", "All"]);
    const [statusName, setStatusName] = useState(status[2]);
    const [openDialogue, setOpenDialogue] = useState(false)
    const [interviewTitle, setInterviewTitle] = useState("")
    const [interviewId, setInterviewId] = useState()
    const [oldId, setOldId] = useState(Array())
    const [show, setShow] = useState(false);
    const [allQuestions, setAllQuestions] = useState(Array())
    const [selectedQuestions, setSelectedQuestions] = useState(Array())
    const [isInitialMount, setInitialMount] = useState(true);
    const [isInitialMount1, setInitialMount1] = useState(true);
    const [propMount, setPropMount] = useState(false);


    var interview_id;

    const handleCloseModal = () => {
        setShow(false)
        window.location.reload()
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (statusName == "All") {
            axios
                .get("http://localhost:4000/admin/interview")
                .then((response: any) => {
                    setInterview(response.data.Interviews);
                })
                .catch(() => {
                    alert("Interview doesn't exist");
                });
        }
        else if (statusName == "Active") {
            axios
                .get("http://localhost:4000/admin/interview/status/active")
                .then((response: any) => {
                    setInterview(response.data);
                })
                .catch(() => {
                    alert("Interview doesn't exist");
                });
        }
        else {
            axios
                .get("http://localhost:4000/admin/interview/status/in active")
                .then((response: any) => {
                    setInterview(response.data);
                    console.log(response.data);
                })
                .catch(() => {
                    alert("Interview doesn't exist");
                });
        }
    }, [statusName]);
    function handleClickOpen() {
        setOpenDialogue(true)
    }
    function handleClose() {
        setOpenDialogue(false)
    }
    useEffect(() => {
        if (isInitialMount1) {
            setInitialMount1(false);
        } else {
            console.log(selectedQuestions)
            compareOldAndNew()
        }
    }, [allQuestions])

    function updateInterview(interview: any) {
        console.log(interview)
        interview_id = interview.id;
        setInterviewTitle(interview.interviewTitle)
        setInterviewId(interview.id)
        axios
            .get(`http://localhost:4000/admin/interview/${interview_id}`)
            .then(async (response: any) => {
                console.log(response.data)
                setOldId(response.data.map((data: any) => data.question_id))
                dataOfSelected()

            })
            .catch(() => {

            })
    }
    console.log(oldId);
    function dataOfSelected() {
        axios
            .get("http://localhost:4000/admin/allquestion")
            .then((response) => {
                setAllQuestions(response.data)
                compareOldAndNew()
            })
            .catch((error) => {
                console.log(error)
            })
    }
    function compareOldAndNew() {
        // var selected = allQuestions.filter(n => (oldId.includes(n.id))).map((data, index) => {
        //     data.tableData = {
        //         id: index,
        //         checked: true
        //     }
        //     return data;
        // })

        var selected = allQuestions.map((data, index) => {
            if (oldId.includes(data.id)) {
                data.tableData = {
                    id: index,
                    checked: true
                }

            }
            else {
                data.tableData = {
                    id: index,
                    checked: false
                }
            }
            return data;
        })

        setSelectedQuestions(selected)
        console.log(selected)

    }
    console.log(selectedQuestions)

    useEffect(() => {
        if (isInitialMount) {
            setInitialMount(false);
        } else {
            console.log(selectedQuestions)
            setPropMount(true)
            handleShow()
        }
    }, [selectedQuestions])

    return (
        <>
            <SideBar />

            {openDialogue && <AlertDialog interviewId={interview} handleClose={() => setOpenDialogue(false)} />}
            <Container >
                <Row style={{ marginLeft: "170px" }}>
                    <Row>
                        <Col md={10}>
                            <Dropdown style={{ marginLeft: "-13px", marginTop: "10px" }}>
                                <Dropdown.Toggle className="dropdownHeader">
                                    {statusName}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {status.map((data, key) => (
                                        <Dropdown.Item
                                            onClick={(e) => {
                                                setStatusName(data);
                                            }}
                                        >
                                            {data}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col md={1}>
                            <Interview oldQuestion={oldId} />
                            <InterviewModal show={show} interviewTitle={interviewTitle} handleShow={handleShow} handleClose={handleCloseModal} question={selectedQuestions} propMount={propMount} flag={false} oldQuestion={oldId} interview_id={interviewId}/>
                        </Col >
                    </Row>
                    <Row>
                        <br></br>
                        <br></br>

                    </Row>


                    <MaterialTable
                        style={{ width: "80%" }}
                        title="Interviews"
                        columns={[{ title: 'S/N', field: 'tableData.id', render: rowData => { return (<p>{rowData.tableData.id + 1}</p>) } }, {
                            title: "Interview", field: "interviewTitle", render: (rowData: any) => (
                                <Tooltip title="Edit interview">
                                    <a
                                        target="_blank"
                                        style={{ textDecoration: 'none', cursor: 'pointer', color: '#00BFFF' }}
                                        onClick={() => {

                                            updateInterview(rowData);
                                        }}
                                    >
                                        {rowData.interviewTitle}
                                    </a>
                                </Tooltip>
                            )
                        },
                        { title: "Status", field: "status" }
                        ]}
                        data={interview}
                        options={{
                            selection: false,
                            search: false,
                            headerStyle: {
                                background: "#3969A3",
                                color: "#fff",
                                fontFamily: "roboto",
                                fontSize: "16px"
                            },
                            actionsColumnIndex: 4
                        }}
                        actions={[
                            {
                                icon: AddIcon,
                                tooltip: 'Send',
                                onClick: ((event) => { handleClickOpen() })
                            }
                        ]}
                    />


                </Row>
            </Container>
        </>
    );
}

export default InterviewGrid;