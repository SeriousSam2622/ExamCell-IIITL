import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3),
    },
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: '#f4f4f4'
    },
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
      width: '100%',
      color: 'secondary',
      marginLeft: drawerWidth,
    },
    head: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar
  }
})

export default function LayoutHome({ children }) {
  const classes = useStyles()
  


  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar 
        position="fixed" 
        className={classes.appBar}
        elevation={0}
        color="secondary"
      >
        <Toolbar>
          <Typography variant="h3" className={classes.head}>
            Exam Cell  
          </Typography>
          <Button
            variant="contained"
            href="/signin"
            color="secondary"
          > Sign In</Button>
        </Toolbar>
      </AppBar>


      {/* main content */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        { children }
      </div>
    </div>
  )
}