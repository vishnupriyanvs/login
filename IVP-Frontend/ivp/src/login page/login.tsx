import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid,Paper, Avatar,Button,Typography} from '@material-ui/core'
import { Box } from "@mui/material";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
//import Image from "material-ui-image";
import logo from '../Login/Images/experion.png';
import microsoftlogo from '../Login/Images/microsoftLogo.png';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../helpers/authConfig";
import { callMsGraph } from "../helpers/graph";
import axios from "axios";

//import backgroundPng from '../Login/Images/background.png'






function MsLogin():any{

      const navigate = useNavigate();
    //   const urlSearchParams = new URLSearchParams(window.location.search);
    //   const params = Object.fromEntries(urlSearchParams.entries());
    //   console.log(params)
      
    //   useEffect(() => {
    //       if (params.msal) {
    //           console.log(params)
      
              

            //   var sessionrole = sessionStorage.getItem('role');
            //   console.log(sessionrole);
            //   if(sessionrole === 'Super_Admin')
            //   {
            //     navigate("/superadmin");
            //   }
            //   else{
            //     navigate("/admin")
            //   }
      
    //       }
    //   }, []);

    const { instance,accounts } = useMsal();
    const [userEmail, setuserEmail] = useState(null);
    
    

 async function handleLogin () {
       
            await instance.handleRedirectPromise();


            const accounts = instance.getAllAccounts();
            if (accounts.length === 0) {
    // No user signed in
            instance.loginRedirect();
                  }
            instance.acquireTokenSilent({
                ...loginRequest,
                account: accounts[0]
            })
            .then(async (response) => {
                //callMsGraph(response.accessToken);
                const email = await callMsGraph(response.accessToken);
                console.log(email);
                setuserEmail(email);
    
                axios
                .get(`http://localhost:4000/admin/employeesemail/${email}`)
                    .then((response: any) => {
                        console.log(response.data)
                        sessionStorage.setItem('myToken', response.data.accessToken)
                        sessionStorage.setItem('refreshToken', response.data.refreshToken)
                        sessionStorage.setItem('role', response.data.role)
                        sessionStorage.setItem('name', response.data.name)
                        sessionStorage.setItem('employeeId', response.data.employeeId)

                        var sessionrole = sessionStorage.getItem('role');
                        console.log(sessionrole);
                        if(sessionrole === '1')
                        {
                          navigate("/tile");
                        }
                        
                    })
                    .catch(error => {
                        // console.log(error)
                    })
               
                
               
               
            });
         
           
    }


      const paperStyle={padding :20,height:'70vh',width:300, margin:"20px auto"}
      const avatarStyle={backgroundColor:'#1bbd7e'}
      const btnstyle={margin:'8px 0'}

      return(
          <>
          
              {console.log(userEmail)}
              <Paper elevation={10} style={paperStyle}>
                  <Grid>
                       <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                      <h2>Sign In</h2>
                  </Grid>
                  <Typography variant="h6" color="inherit" component="div" align="center">
                      {"RUT-PROJECT"}
                      </Typography>
                  <Box
                     component="img"
                     sx={{
                     height: 200,
                     width: 300,
                     maxHeight: { xs: 233, md: 167 },
                     maxWidth: { xs: 350, md: 250 },
                     alignContent:"center"
                               }}
                    alt="The house from the offer."
                    //src={logo}
                    />
                   
                  {/* <Image src={logo}/> */}
                  <Grid>
                  <Button type='submit' variant="outlined" onClick={() => handleLogin()} style={btnstyle} fullWidth
                  startIcon={<Avatar  variant="square" style={{ width: "24", height: "24" }}/>}>Sign in</Button>
                  </Grid>
              </Paper>
          
          </>
      )






}
export default MsLogin;