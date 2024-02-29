import React from 'react'
import { useState } from 'react'
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword , onAuthStateChanged} from 'firebase/auth';
import { auth } from '../init-firebase'
import {Container, TextField, Typography} from '@material-ui/core'
import { Button, Grid, Paper, Avatar } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core';
import { Alert } from '@mui/material';
import { useAuth } from '../Context/AuthContext';
import useMounted from '../hooks/useMounted';
import { useHistory } from 'react-router';

const useStyles = makeStyles({

  btn: {
    backgroundColor: "#e87dfa",
    margin: "4vh auto"
  },
  inp: {
    margin:"20px auto"
  },
  grid: {
    marginTop:"20vh"
  }

})


const SignInStudents = () => {

    const classes = useStyles()

  const history = useHistory()
  
    const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isSubmitting,setIsSubmitting] = useState(false)

  const { login } = useAuth()
  
  const mounted = useMounted()

      
     
  

  const paperStyle = {padding:20,height:'70vh',width:"400px",marin:"20px auto"}
  
  const avatarStyle = {backgroundColor:'#d500f9'}
  return (
    <Container>
      <Grid align= 'center' className={classes.grid}>
        <Paper elevation={10} style={paperStyle}>
          
          <Grid align='center' >
          <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
          <Typography variant="h4"> Sign In</Typography>
          </Grid>

          <TextField
            color="secondary"
            variant="filled"
            className={classes.inp}
            label="Email" 
            placeholder="Enter Email"
            onChange={(e) => { setLoginEmail(e.target.value) }}
            fullWidth
            required
            type="email"
          />
          <TextField
            color="secondary"
            variant="filled"
            className={classes.inp}
            label="Password"
            placeholder="Enter Password"
            onChange={(e) => { setLoginPassword(e.target.value) }}
            required
            fullWidth
            type="password"
          />
          <Button className={classes.btn} type="submit" color="secondary" onSubmit={async e => {
            console.log('Clicked!')
            e.preventDefault()
            // your login logic here
            if (!loginEmail || !loginPassword) {
              // toast({
              //   description: "Credentials Not Valid",
              //   status: 'error',
              //   duration: 5000,
              //   isClosable:true
              // })
              console.log("Invalid Input")
              alert("Invalid Input!");
            }
            
            
            setIsSubmitting(true)
            login(loginEmail, loginPassword)
              .then((res) => {
                console.log(res)
                history.push('/profile')
              })
              .catch((err) => {
                console.log(err.message)
              //   toast({
              //   description: err.message,
              //   status: 'error',
              //   duration: 5000,
              //   isClosable:true
              // })
                alert("Invalid Input!")
              })
              .finally(() => { mounted.current && setIsSubmitting(false) })
            

          }}
            fullWidth> Login Now</Button>
          
          <Typography gutterBottom color="secondary" variant="body2">Forgot password? Contact Admin at ECAdmin@iiitl.ac.in</Typography>
          
          </Paper>
      </Grid>
       
      </Container>

      )
  }
  
  export default SignInStudents
  


