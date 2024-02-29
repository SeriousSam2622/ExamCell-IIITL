import React from 'react'
import { makeStyles } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import { useHistory, useLocation } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { AddCircleOutlined,  QueryBuilderOutlined   } from '@material-ui/icons'
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
      position:"relative",
      width: drawerWidth,
    },
    active: {
      marginLeft: "10px",
      background: '#f7c4e6',
      borderTopLeftRadius: "40px",
      borderBottomLeftRadius:"40px"
    },
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    role: {
      flexGrow: 1,
      fontSize: '20px'
    },
    toolbar: theme.mixins.toolbar
  }
})

export default function LayoutFaculty({ children }) {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()

  const menuItemsStudent = [
    { 
      text: 'Add Marks', 
      icon: <AddCircleOutlined color="secondary"
      fontSize="large"
      />,
      path: '/add-marks' 
    },
      {
          text: 'Resolve Query',
        icon: <QueryBuilderOutlined
          fontSize="large"color="secondary" />,
          path:'/resolve-query'
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
          {menuItemsStudent.map((item) => (
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