import React from 'react'
import {  makeStyles } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import { useHistory, useLocation } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { AddBoxRounded,  AssignmentIndOutlined,  EditOutlined, EditRounded,   } from '@material-ui/icons'
 

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: '#fefefe',
      width: '100%',
      padding: theme.spacing(3),
    },
    root: {
      display: 'flex',
        overflow: "hidden" 
     },
    drawer: {
      width: drawerWidth+10,
     },
    drawerPaper: {
      position:"relative",
      width: drawerWidth+10,
    },
    active: {
      overflow:"hidden",
      background: '#f7c4e6',
      borderTopLeftRadius: "60px",
      borderBottomLeftRadius: "60px",
      borderTopRightRadius:"60px",
      borderBottomRightRadius:"60px",
      paddingLeft: "10px",
      '&:hover': {
        backgroundColor: '#f7c4e6',
      }
    },
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    date: {
      flexGrow: 1
    },
    toolbar: theme.mixins.toolbar
  }
})

export default function LayoutAdmin({ children }) {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()

  const menuItemsAdmin = [
    { 
      text: 'Add Notice', 
      icon: <AddBoxRounded fontSize="large" color="secondary" />, 
      path: '/add-notice' 
    },
      {
          text: 'Edit Toppers',
          icon: <EditOutlined fontSize="large" color="secondary" />,
          path:'/edit-toppers'
    },
      {
          text: 'Publish Result',
          icon: <AssignmentIndOutlined color="secondary" fontSize="large" />,
          path:'/publish-result'
    },
      {
          text: 'Edit Students',
          icon: <EditRounded fontSize="large" color="secondary" />,
          path:'/edit-students'
    }, 
    {
      text: 'Edit Faculties',
      icon: <EditOutlined fontSize="large" color="secondary" />,
      path: '/edit-faculties'
    }
    
  ];

  return (
    <div className={classes.root}>

      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
        style={{height:"100vh"}}
      >

        {/* links/list section */}
        <List>
          {menuItemsAdmin.map((item) => (
            <ListItem 
              button 
              key={item.text} 
              onClick={() => history.push(item.path)}
              className={location.pathname === item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        
      </Drawer>

      {/* main content */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        { children }
      </div>
    </div>
  )
}