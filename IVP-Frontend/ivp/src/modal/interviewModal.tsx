import { Col, Row, Container, Dropdown, Form, Button, Modal } from 'react-bootstrap';
import MaterialTable from 'material-table';
import Switch from "@mui/material/Switch";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import React, { useState, useEffect } from "react";
import axios from "axios";


function InterviewModal(props: any) {
    const [category, setCategory] = useState([]);
    const [checked, setChecked] = useState(true);
    const [interview, setInterview] = useState("")
    const [categoryName, setCategoryName] = useState(category[0]);
    const [singleCategory, setSingleCategory] = useState(category[0]);
    const [question, setQuestion] = useState(Array());
    const [selectedQuestions, setSelectedQuestions] = useState(Array());
    const [transferQuestions, setTransferQuestions] = useState(Array());
    const [allQuestions, setAllQuestions] = useState(Array());
    const [isInitialMount, setInitialMount] = useState(true);
    const [categoryQuestions, setCategoryQuestions] = useState(Array());
    const [isEditMount, setEditMount] = useState(true);
    const [deleteArray,setDeleteArray]=useState(Array())
    const [addArray,setAddArray]=useState(Array())


    var interviewQuestions: any[] = [];


    useEffect(() => {

        if (props.propMount) {
            setAllQuestions(props.question)
            console.log(props);
            (document.querySelector("#interviewName") as HTMLInputElement).value = props.interviewTitle;
        }
    }, [props]);

    useEffect(() => {
        if (isInitialMount) {
            setInitialMount(false)
        } else {
            setCategoryQuestions([])
            allQuestions.map((n: any) => {

                if (n.category.categoryName == categoryName) {
                    setCategoryQuestions((value) => [...value, n]);
                }
            })
        }
    }, [allQuestions, categoryName])

    // useEffect(()=>{
    //     if(!(props.flag)){
    //         setQuestion(categoryQuestions)
    //     }
    // },[categoryQuestions,categoryName])


    //get catgory information
    useEffect(() => {
        axios
            .get("http://localhost:4000/admin/categories")
            .then((response: any) => {
                // console.log(response.data.data)
                setCategory(response.data);
                setCategoryName(response.data[0].categoryName);
                setSingleCategory(response.data[0].id)
            })
            .catch(() => {

            });
    }, [props]);

    //get all questions related to a category

    useEffect(() => {
        // setFlag(true)
        var id = singleCategory
        axios
            .get(`http://localhost:4000/admin/question/${singleCategory}`)
            .then((response: any) => {
                setQuestion(response.data);
            })
            .catch(() => {

            });
    }, [categoryName]);


    async function handleToggle(event: React.ChangeEvent<HTMLInputElement>) {
        setChecked(event.target.checked);

    }

    function handleChange(event: any) {
        const value = event.target.value;
        setInterview(value)
    }



    function handleSubmit(event: any) {
        if(props.flag){
        event.preventDefault();
        transferQuestions.map((data) => {
            interviewQuestions.push(data.id)
        })

        //Object to be passed for POST (interview creation)
        let submitData = {
            interviewTitle: interview,
            status: checked ? "active" : "in active",
            question_id: interviewQuestions
        }

        //POST to create an interview
        axios
            .post(`http://localhost:4000/admin/interview`, submitData)
            .then((response: any) => {
                alert("interview created successfully");
                // window.location.reload()

            })
            .catch((error) => {
                console.log(error)
            });
        }
    }

    // function editTransferArray() {
    //     var toDelete = props.oldQuestions.filter((n:any) => !(transferQuestions.includes(n))) // [1,7]
    //     var toAdd = transferQuestions.filter(n => !(props.oldQuestions.includes(n))) // [2,4]
    //     console.log(toDelete)
    //     console.log(toAdd)
    // }


    useEffect(() => {
        if (isEditMount) {
            setEditMount(false);
        } else {
            if (!(props.flag) && transferQuestions !== undefined) {
                var newArray:any[] = [];
                transferQuestions.map((data)=>{
                   newArray.push(data.id);
                })
                var toDelete = props.oldQuestion.filter((n: any) => !(newArray.includes(n))) // [1,7]
                var toAdd = newArray.filter((n:any) => !(props.oldQuestion.includes(n))) // [2,4]
                setDeleteArray(toDelete)
                setAddArray(toAdd)
            }
        }
    }, [transferQuestions])
    
    function update(){
        var interview_id = props.interview_id;
        console.log(props.interviewTitle);
        let submitData = {
            interviewTitle: (interview =="") ? props.interviewTitle : interview ,
            status: checked ? "active" : "in active",
            question_id: addArray,
            delete_question_id: deleteArray
        }
        axios
        .put(`http://localhost:4000/admin/interview/${interview_id}`,submitData)
        .then((response)=>{
            alert("Interview updated")
        })
        .catch((error)=>{
            console.log(error)
        })
    }
   
    return (
        <>
            <Modal dialogClassName="my-modal" show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Interview</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ marginLeft: "58px" }}><Container>

                    <Row >


                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Row>
                                    <Col md={10}>
                                        <Form.Control
                                            style={{ width: "100%" }}
                                            type="text"
                                            name="interviewTitle"
                                            placeholder="Title"
                                            onChange={handleChange}
                                            className="userTextFeild"
                                            id="interviewName"
                                            required
                                        />
                                    </Col>
                                    <Col md={2}>
                                        <Switch
                                            checked={checked}
                                            onChange={handleToggle}
                                        // inputProps={{ "aria-label": "active" }}
                                        />
                                    </Col>
                                </Row>
                                <br></br>
                                <Dropdown>
                                    <Dropdown.Toggle className="dropdownHeader">
                                        {categoryName}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {category.map((data: any) => (
                                            <Dropdown.Item
                                                onClick={(e) => {
                                                    setCategoryName(data["categoryName"]);
                                                    setSingleCategory(data["id"])
                                                }}
                                            >
                                                {data["categoryName"]}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <br></br>
                                <Row>

                                    {/* category question box */}
                                    <Col md={5}>
                                        <MaterialTable style={{ width: "80%" }}
                                            title="Questions"
                                            columns={[
                                                { title: 'Select all', field: 'question' },
                                            ]}
                                            data={!props.flag ? categoryQuestions : question}
                                            // data={question}
                                            onSelectionChange={(selectedRows) => {

                                                //check mechanism
                                                let newSet = [...selectedQuestions];
                                                selectedRows.map((data: any) => {
                                                    if (!newSet.some(n => n.id === data.id) && data.tableData.checked) {
                                                        newSet = [...newSet, data]
                                                    }
                                                })

                                                let newSet1 = newSet.filter((data) => data.tableData.checked)

                                                // uncheck mechanism
                                                if (props.flag) {
                                                    let newSet2 = newSet1.filter((data) => {
                                                        if (question.some((n: any) => n.id === data.id)) {
                                                            let foundElement: any = question.find((n: any) => n.id === data.id)
                                                            if (selectedRows.some((n: any) => n.id === data.id) || !foundElement.tableData.hasOwnProperty("checked")) {// if exists in current selection || if exists in previous selection

                                                                return data
                                                            }
                                                        } else {
                                                            return data
                                                        }
                                                    })
                                                    setSelectedQuestions(newSet2)
                                                } else {
                                                    let newSet2 = newSet1.filter((data) => {
                                                        if (categoryQuestions.some((n: any) => n.id === data.id)) {
                                                            let foundElement: any = categoryQuestions.find((n: any) => n.id === data.id)
                                                            if (selectedRows.some((n: any) => n.id === data.id) || !foundElement.tableData.hasOwnProperty("checked")) {// if exists in current selection || if exists in previous selection

                                                                return data
                                                            }
                                                        } else {
                                                            return data
                                                        }
                                                    })
                                                    setSelectedQuestions(newSet2)
                                                }

                                            }
                                            }
                                            options={{
                                                selection: true,
                                                search: false,
                                                paging: false,
                                                headerStyle: { background: "#3969A3", color: "#fff", fontFamily: "roboto", fontSize: "16px" },
                                                doubleHorizontalScroll: true,
                                                selectionProps: (rowData: any) => ({
                                                    checked: (selectedQuestions.some((n: any) => n.id === rowData.id) || (rowData.tableData.hasOwnProperty("checked") && rowData.tableData.checked)),
                                                }),
                                                maxBodyHeight: 281
                                            }}

                                        />
                                    </Col>

                                    {/* select question button */}
                                    <Col md={2} >
                                        <ArrowCircleRightOutlinedIcon fontSize="large" style={{ marginTop: "150%", marginLeft: "15%", cursor: "pointer" }} onClick={(event: any) => {
                                            setTransferQuestions(selectedQuestions)
                                        }} />
                                    </Col>

                                    {/* selected question box */}
                                    <Col md={5}>
                                        <MaterialTable style={{ width: "80%" }}
                                            title="Primary Questions"
                                            columns={[
                                                { title: 'Selected', field: 'question' },
                                            ]}
                                            data={transferQuestions}
                                            options={{
                                                selection: false,
                                                search: false,
                                                paging: false,
                                                headerStyle: { background: "#3969A3", color: "#fff", fontFamily: "roboto", fontSize: "16px" },
                                                doubleHorizontalScroll: true,
                                                maxBodyHeight: 400
                                            }}
                                        />
                                    </Col>

                                </Row>
                                <br></br>
                                { props.flag ? <button className="btn" id="save" style={{ backgroundColor: "#3969A3", color: "white" }} type="submit">Save</button> : <button className="btn" id="update" style={{ backgroundColor: "#3969A3", color: "white" }}  onClick={update}>Update</button>}
                            </Form.Group>
                        </Form>
                        <Row><br></br><br></br></Row>

                    </Row>

                </Container>
                </Modal.Body>

            </Modal>
        </>
    )
}
export default InterviewModal;