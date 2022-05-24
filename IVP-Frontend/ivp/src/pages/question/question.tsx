import React, { useState, useEffect } from "react";
import { Row, Container, Dropdown, Col } from "react-bootstrap";
import SideBar from "../../components/sideBar/sideBar";
import "./question.css";
import axiosConfig from "../../helpers/axiosConfig";
import axios from "axios";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import Popup from "reactjs-popup";
import { Form} from "react-bootstrap";
import MaterialTable from "material-table";
import { Link } from "@material-ui/core";
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function Question() {
  const [category, setCategory] = useState([]);
  const [question, setQuestion] = useState({
    question: "question",
    status: "active",
  });
  const [categoryName, setCategoryName] = useState(category[0]);
  const [checked, setChecked] = useState(true);
  const [status, setStatus] = useState("");
  const [addCategory, setAddCategory] = useState("");
  const [check, setCheck] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [questionGrid, setQuestionGrid] = useState([]);
  const [updateQuestions, setUpdateQuestions] = useState([]);
  const [flag, setFlag] = useState(false);

 

  function categories() {
    axios(axiosConfig.Config("/categories", "get"))
      .then((response: any) => {
        setCategory(response.data);
        setCategoryName(response.data[0].categoryName);
      })
      .catch(() => {
        alert("Category doesn't exist");
      });
  }
console.log(category);
  //For getting all categories
  useEffect(() => {
    categories();
  }, []);

  function handleQuestionToggle(event: React.ChangeEvent<HTMLInputElement>) {
    setCheck(event.target.checked);
  }

  function handleChange(event: any) {
    // const name = event.target.name;
    const value = event.target.value;
    setQuestion(value)
  }

  useEffect(() => {
    if (check === true) {
      setStatus("active");
    } else {
      setStatus("in active");
    }
  }, [check]);

  useEffect(() => {
    if (check === true) {
      axios(axiosConfig.Config(`/question/${categoryName}`, "get"))
        .then((response: any) => {
          setQuestionGrid(response.data);
        })
        .catch(() => { });
    } else {
      axios(axiosConfig.Config(`/allquestion/${categoryName}`, "get"))
        .then((response: any) => {
          setQuestionGrid(response.data);
        })
        .catch(() => { });
    }
  }, [categoryName, check, trigger]);

  function handleSubmit(event: any) {
    event.preventDefault();
    let submitData = {
      question:question,
      categoryName:categoryName,
      status:checked ? "active" : "in active"

    }
    axios(axiosConfig.Config("/questions", "post", submitData))
      .then((response) => {
        alert("question add successfully");
        if (trigger) {
          setTrigger(false);
        } else {
          setTrigger(true);
        }
        (document.querySelector("#categoryName") as HTMLInputElement).value =
          "";
      })
      .catch((error) => {
        alert("error");
      });
  }

  function handleToggle(event: React.ChangeEvent<HTMLInputElement>) {
    setChecked(event.target.checked);
  }


  function handleChangeCategory(event: any) {
    // const name = event.target.name;
    const value = event.target.value;
    setAddCategory(value)
  }

  function handleSubmitCategory(event: any) {
    event.preventDefault();
    let submitData = {
      categoryName:addCategory,
    }

    axios
      .post(`http://localhost:4000/admin/categories`, submitData)
      .then((response) => {
        alert("category add successfully");
        categories();
      })
      .catch((error) => {
        alert("error");
      });
  }

  function updateQuestion(object: any) {
    setUpdateQuestions(object.id);
    setQuestion(object.question)
    setFlag(true);
    if (object.status === "active") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }

  function update() {
    
    let data = JSON.stringify({
      question: question,
      status: checked ? "active" : "in active"
    });

    axios(axiosConfig.Config(`/question/${updateQuestions}`, "put", data))
      .then((response) => {
        alert("question update successfully");
        if (trigger) {
          setTrigger(false);
        } else {
          setTrigger(true);
        }
        (document.querySelector("#categoryName") as HTMLInputElement).value =
          "";
        window.location.reload()
      })
      .catch((error) => {
        alert("error");
      });
  }

  return (
    <>
      <SideBar />
      <Container>
        <h1 className="questionHeading">Question</h1>
        <Row style={{ marginLeft: "150px" }}>
          <Row>
            <Col>
              <Dropdown>
                <Dropdown.Toggle className="dropdownHeader">
                  {categoryName}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {category.map((data, key) => (
                    <Dropdown.Item
                      onClick={(e) => {
                        setCategoryName(data["categoryName"]);
                        setFlag(false);
                        (
                          document.querySelector(
                            "#categoryName"
                          ) as HTMLInputElement
                        ).value = "";
                      }}
                    >
                      {data["categoryName"]}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col md={10}>
              <Box style={{ marginTop: "8px" }}>
                <Popup
                  trigger={<Icon className="icon">add_circle</Icon>}
                  position="bottom center"
                >
                  <Form
                    onSubmit={handleSubmitCategory}
                    style={{ marginTop: "25px", marginLeft: "-28px" }}
                  >
                    <Form.Group>
                      <Row>
                        <Col md={10}>
                          <Form.Control
                            style={{ width: "100%" }}
                            placeholder="categoryname"
                            type="text"
                            name="categoryName"
                            onChange={handleChangeCategory}
                          />
                        </Col>
                        <Col md={2}>
                          <button
                            type="submit"
                            className="btn"
                            style={{
                              backgroundColor: "#3969A3",
                              color: "white",
                            }}
                          >
                            submit
                          </button>
                        </Col>
                      </Row>
                    </Form.Group>
                  </Form>
                </Popup>
              </Box>
            </Col>
          </Row>
          <Row style={{ marginTop: "10%" }}>
            <Col md={10}>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Control
                    style={{ width: "100%" }}
                    id="categoryName"
                    type="text"
                    name="question"
                    placeholder="question"
                    onChange={handleChange}
                    className="userTextFeild"
                  />
                </Form.Group>
                <Row style={{ marginRight: "-70px",marginLeft:"85%"}}>
                  {flag  ? (
                    <button
                      type="submit"
                      className="btn"
                      disabled
                      style={{
                        marginTop: "10px",
                        backgroundColor: "grey",
                        color: "white",
                      }}
                    >
                      Add and Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn"
                      style={{
                        marginTop: "20px",
                        backgroundColor: "#3969A3",
                        color: "white",
                        
                      }}
                    >
                      Add and Continue
                    </button>
                  )}
                </Row>
              </Form>
            </Col>
            <Col md={2}>
              <Switch
                checked={checked}
                defaultChecked
                color="success"
                onChange={handleToggle}
                inputProps={{ "aria-label": "active" }}
              />
            </Col>
          </Row>
          <Row style={{ width: "20.5%" ,paddingBottom:"5%",marginRight: "-60px",marginLeft:"67%",marginTop:"10px"}}>
            {updateQuestions.length !== 0 ? (
              <button
                type="submit"
                className="btn"
                style={{ backgroundColor: "#3969A3", color: "white" }}
                onClick={update}
              >
                Update
              </button>
            ) : (
              <button
                type="submit"
                className="btn"
                style={{ backgroundColor: "grey", color: "white" }}
                disabled
                onClick={update}
              >
                Update
              </button>
            )}
          </Row>
          <br></br><br></br>
          <Row>
            <Col>
              <Dropdown>
                <Dropdown.Toggle className="dropdownHeader">
                  {categoryName}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {category.map((data, key) => (
                    <Dropdown.Item
                      onClick={(e) => {
                        setCategoryName(data["categoryName"]);
                      }}
                    >
                      {data["categoryName"]}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col md={10}>
              <Switch
                checked={check}
                defaultChecked
                color="success"
                onChange={handleQuestionToggle}
                inputProps={{ "aria-label": "active" }}
              />
            </Col>
          </Row>
          <br></br><br></br><br></br>       
          <Row style={{ width: "88.5%",marginLeft:"-1px" }}>
            <MaterialTable 
              title="Questions"
              columns={[
                { title: "Question", field: "question" },
                { title: "Status", field: "status" },
                {
                  title: "Action",
                  render: (rowData: any) => (
                    <Link
                      onClick={(event: any) => {
                        (
                          document.querySelector(
                            "#categoryName"
                          ) as HTMLInputElement
                        ).value = rowData.question;
                        updateQuestion(rowData);
                      }}
                    >
                      Edit
                    </Link>
                  ),
                },
              ]}
              data={questionGrid}
              options={{
                selection: false,
                search: false,
                headerStyle: {
                  background: "#3969A3",
                  color: "#fff",
                  fontFamily: "roboto",
                  fontSize: "16px",
                },
              }}
            />
          </Row>
        </Row>
      </Container>

      <br></br>
    </>
  );
}

export default Question;
