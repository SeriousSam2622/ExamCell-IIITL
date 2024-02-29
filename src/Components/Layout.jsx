import React, { useState } from 'react'
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'
import { useHistory } from 'react-router'
// import { styled } from '@mui/material/styles';
// import { Paper } from '@mui/material';
import { Box } from '@mui/material'
import { logout } from '../init-firebase';
import { UserContext } from '../Context/UserContext';
// import { useAuth } from '../Context/AuthContext';
import { useAuth } from '../init-firebase';
// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

// const useStyles = makeStyles((theme) => {
//     return {

//         appBar: {
//             padding: theme.spacing(3),
//         }


//     }
// })


const Layout =  ({children}) => {

    // const classes = useStyles();
    const history = useHistory();
    const currentUser =  useAuth();
    const [user, setUser] = useState(null);



    async function handleLogout() {
        // setLoading(true);
        try {
            await logout();
            history.push('/')
        } catch {
          alert("Error!")
        }
        // setLoading(false);
  }
  



  const handleSection = () => {

    if (!currentUser) {
      alert("Not Logged In!");
      return;
    }

    try {
      console.log(currentUser);


      const email = currentUser.email;
      const user = email[0];
      // console.log(currentUser.email[0]);

      switch (user) {
        case "a":
          history.push('/add-notice')
          break;
        
        case "s":
          history.push('/checkResult')
          break;
        
        case "f":
          history.push('/add-marks')
          break;
        
        default:
          break;
      }
      
    } catch (err) {
      console.log(err.message);
    }
  }

    return (
        <UserContext.Provider value={{user,setUser}} >
           
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={3} position="static" style={{background:"d500f9"}}>
    <Toolbar>
                        <Button variant="text"
                            onClick={()=>history.push('/')}
                        >
            <Typography variant="h3">
                ExamCell
                            </Typography>
          </Button>
              {currentUser &&
                <Typography variant="h5" color="textSecondary"
                style={{margin:"20px", padding:"2px"}}
                > Logged in : {currentUser.email}  </Typography>}
                        <div style={{ flexGrow: 1 }}></div>
              {currentUser &&
                <Button onClick={()=>handleSection()} >My Section</Button>}
                        {!currentUser && <Button onClick={() => history.push('/signin')}>Sign In</Button>}
                        {!currentUser && <Button onClick={() => history.push('/signup')}>Sign Up</Button>}
                        {currentUser && <Button onClick={handleLogout} >Logout</Button>}
        </Toolbar>
      </AppBar>
    </Box>
                <div>{children}</div>
           
        </UserContext.Provider>
    )
}

export default Layout
