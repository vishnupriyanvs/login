import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { TextField } from '@material-ui/core';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Row, Container, Dropdown, Col } from "react-bootstrap";
import axios from "axios";
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';


export default function AlertDialog(props: any) {
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState();
  const [candidate, setCandidate] = useState([]);
  const [text, setText] = useState("");
  let flag = 0;
  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/candidatecategories")
      .then((response: any) => {
        console.log(response.data.data)
        setCategory(response.data.data);
        setCategoryName(response.data.data[0].candidateCategoryName);
        setCategoryId(response.data.data[0].id)
        console.log(category)

        //console.log(response.data.data);
      })
      .catch(() => {
        alert("category doesn't exist");
      });
  }, [])



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {

    setOpen(false);
  };

  function handleChange(event: any) {
    let name: string, value: any;
    name = event.target.name
    value = event.target.value
    setCandidate(values => ({ ...values, [name]: value, candidateCategoryId: categoryId }))
    console.log(candidate)
  }

  function handleSubmit(event: any) {
    event.preventDefault();

    // let submitData={
    //     FirstName:fname,
    //     SecondName:sname,
    //     Email:email,
    //     InterviewId : Id,
    //     Category:ctaegory,
    //     Date:date,
    //     Time:time
    // }
    console.log(candidate)
    axios
      .post(`http://localhost:4000/admin/candidate`, candidate)
      .then((response: any) => {
        alert("candidate created successfully");

      })
      .catch((error) => {
        console.log(error)
      });

    // axios
    // .post(`http://localhost:4000/admin/candidate`,candidate)
    // .then((response: any) => {
    //     alert("candidate created successfully");

    // })
    // .catch((error) => {
    //     console.log(error)
    // });
  }

  return (
    <div>
      {/* {<Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> } */}
      <Dialog
        onSubmit={handleSubmit}
        open={true}
        onClose={handleClose}
      // aria-labelledby="alert-dialog-title"
      // aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Request for Interview"}
          <IconButton onClick={handleClose}>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <br></br>
          <TextField id="fname" label="First Name" variant="outlined" onChange={handleChange} name="firstName" ></TextField>&nbsp;
          <TextField id="sname" label="Last Name" variant="outlined" name="lastName" onChange={handleChange}></TextField>
          <br></br>
          <br></br>

          <TextField fullWidth id="email" label="Email" variant="outlined" name="email" onChange={handleChange}></TextField>
          <br></br>
          <br></br>
          Category: &nbsp; <Dropdown>
            <Dropdown.Toggle className="dropdownHeader">
              {categoryName}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {category.map((data, key) => (
                <Dropdown.Item
                  onClick={(e) => {
                    setCategoryName(data["candidateCategoryName"]);
                    setCategoryId(data["id"])
                    setCandidate(values => ({ ...values, candidateCategoryId: categoryId }))
                  }}
                >
                  {data["candidateCategoryName"]}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <br></br>
          <br></br>
          Date: &nbsp;
          <TextField id="date" type="date" name="interviewDate"  ></TextField>&nbsp;
          Time: &nbsp;
          <TextField id="time" type="time" name="interviewTime" ></TextField>
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> */}

        </DialogContent>
        <DialogActions>

          <Button onClick={props.handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} autoFocus>
            Register
          </Button>
          <Button autoFocus>
            Send Request
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
