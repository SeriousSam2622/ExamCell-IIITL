import React from 'react'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@mui/material'
import  useStyles  from './styles'



const CustomSnackbar = ({open,setOpen,message}) => {

    const classes = useStyles();

    const handleClose = (event,reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    }

    return (
        <div className={classes.root}>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success" style={{backgroundColor:"#a8ff8f"}} elevation={7}  variant="filled">{message}</Alert>
                {/* <Alert severity="success">This is a success aler/t — check it out!</Alert> */}
            </Snackbar>
        </div>
    )
}

export default CustomSnackbar
