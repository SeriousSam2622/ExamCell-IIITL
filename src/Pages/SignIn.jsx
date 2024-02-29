import { Card, Grid, makeStyles, Paper, Typography ,Button } from '@material-ui/core';
import React, { useContext, useRef ,useState } from 'react'
import { useHistory } from 'react-router';
import {useAuth,login} from '../init-firebase'
import {BsFilePerson} from "react-icons/bs"
import { FaChalkboardTeacher, FaUserShield } from "react-icons/fa"

import {UserContext} from '../Context/UserContext'


const useStyles = makeStyles({
  card: {
    margin: "50px 8%",
    padding: "20px",
    height: "300px"
  },
  paper: {
    margin: "100px 10%",
    padding: "50px"
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"row"
  },
  center: {
    textAlign: "center",
    margin: "40px auto auto auto",
    padding: "10px",
    "& input": {
      width:"300px"
    }
  },
  
  
})



const SignIn = () => {

  
  const [role, setRole] = useState(null);

  const { user ,setUser} = useContext(UserContext)

  const classes = useStyles();

  const emailRef = useRef();
  const passwordRef = useRef();

  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const currentUser = useAuth();

  // async function handleSignup() {
  //   setLoading(true);
  //     try {
  //       const cred = await signup(emailRef.current.value, passwordRef.current.value);
  //       history.push('/');
  //     } catch {
  //       alert("Already exists!")
  //   }
  //   setLoading(false);
  // }  
  
  // async function handleLogout() {
  //   setLoading(true);
  //   try {
  //     await logout();
  //   } catch {
  //     alert("Error!")
  //   }
  //   setLoading(false);
  // }

  async function handleLogin() {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      alert("Error!")
    }
    setLoading(false);
  }
  



  const handleAdminLogin =  () => {
    setRole("Admin");
    setUser("Admin");
    console.log(user);
  }
  const handleStudentLogin = () => {
    setRole("Student");
    setUser("Student");
    console.log(role);
  }
  const handleFacultyLogin = () => {
    setRole("Faculty");
    setUser("Faculty");
    console.log(role);
  }




    return (
          <div>
       
        
        <div>
          <Paper elevation={5} className={classes.paper}>
            <Typography
              color="secondary"
              variant="h3"
              gutterBottom
              align="center"
            >
              Sign In As:
            </Typography>

            <Grid container spacing={4}>
            <Grid item xs={12} md={6} lg={4} >
            <Card elevation={6} className={classes.card}>
                  <Typography
                    
                    variant="h4"
                    align="center"
                    color="textSecondary"
                    gutterBottom
                  >
                    Admin
                  </Typography>
                <div className={classes.center}>
                    <FaUserShield
                      onClick={handleAdminLogin}
                    size="10em"
                    color="#"
                    className={classes.icon}
                  />
                  </div>

            </Card>  
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
            <Card elevation={6} className={classes.card}>
            <Typography
                    variant="h4"
                    align="center"
                    color="textSecondary"
                    gutterBottom
                  >
                    Student
                  </Typography>
                  <div className={classes.center}>
                    <BsFilePerson
                    onClick={handleStudentLogin}
                    size="10em"
                    color="#"
                    className={classes.icon}
                  />
                  </div>
            </Card>  
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
            <Card elevation={6} className={classes.card}>
            <Typography
                    variant="h4"
                    align="center"
                    color="textSecondary"
                    gutterBottom
                  >
                    Faculty
                  </Typography>

                  <div className={classes.center}>  
                    <FaChalkboardTeacher
                    onClick={handleFacultyLogin}
                    size="10em"
                    color="#"
                    className={classes.icon}
                  />
                  </div>
            </Card>  
            </Grid>
            </Grid> 

            {role &&
              <div className={classes.center}>
                <div style={{ margin: "20px", padding: "10px" }}><h2> Enter {role} credentials </h2></div>
                <input style={{ margin: "20px", padding: "10px" }} ref={emailRef} placeholder="Email" />
                <br/>
                <input style={{ margin: "20px", padding: "10px" }} ref={passwordRef} type="password" placeholder="Password" />
                {/* <button disabled={loading || currentUser} onClick={handleSignup}> Sign Up</button>
           */}
          
                {/* <button disabled={!currentUser || loading} onClick={handleLogout}> Log Out</button> */}
                <br/>
                <Button color="secondary" variant="contained" disabled={currentUser || loading} onClick={handleLogin}> Log In</Button>
              </div>
            }
            

          </Paper>
        </div>
      
  </div>
      )
    }
  
  export default SignIn
  


