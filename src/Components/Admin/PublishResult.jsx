import React, { useState } from 'react'
import {  Button, Container,  Dialog,  DialogActions,  DialogContent,  DialogContentText,  DialogTitle,  FormControl,    InputLabel,  makeStyles, MenuItem, Select, Typography } from '@material-ui/core'
import CustomSnackbar from '../Snackbar/Snackbar';
import { doc, updateDoc } from '@firebase/firestore';
import { db } from '../../init-firebase';

const useStyles = makeStyles({
    space: {
        marginTop: 50,
        marginBottom: 50,
        display:'block'
    },
    heading: {
        margin:"1px 35%",
        padding: "10px",
    },
    center: {
        textAlign: "center",
        margin: "auto 20px",
        padding: "10px",
        background: "#fde2f7",
        borderRadius: "40px"
    },
    formArea: {
        backgroundColor: "#fde2f7",
        padding: "20px",
        
    }

})


const PublishResult = () => {

    const classes = useStyles();
    const [sem, setSem] = useState('');
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    
    const handleChange = (event) => {
        setSem(event.target.value);
    };
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    }
    
    const handlePublish = async () => {
        console.log("Publish");
        setOpen(false);
        setOpen2(true);
        const semNum = "sem" + sem;
        const docRef = doc(db, "availableResults",semNum);
        await updateDoc(docRef, {
            available:true
        })
        
    }
    
        return (
            <Container>
                <CustomSnackbar open={open2} setOpen={setOpen2} message={`Result Published for Semester ${sem} !`} />
                <div className={classes.center}>
                <Typography variant="h4" color="secondary" align="center" gutterBottom className={classes.center}
                >Publish Result for Semester</Typography>
                <FormControl className={classes.formArea} fullWidth>
                <InputLabel  style={{color:"#d500f9"}}  id="demo-simple-select-label">Select Semester</InputLabel>
  <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sem}
                        label="Semester"
                        onChange={handleChange}
  >
    <MenuItem value={1}>1</MenuItem>
    <MenuItem value={2}>2</MenuItem>
    <MenuItem value={3}>3</MenuItem>
    <MenuItem value={4}>4</MenuItem>
    <MenuItem value={5}>5</MenuItem>
    <MenuItem value={6}>6</MenuItem>
    <MenuItem value={7}>7</MenuItem>
    <MenuItem value={8}>8</MenuItem>
  </Select>
    </FormControl>
                    
                    <Button
                        variant="contained"
                            color="secondary"
                            onClick={handleClickOpen}
                    >
                        Publish
                    </Button>
                    <Dialog
        open={open}
        onClose={handlePublish}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are You Sure to Publish Result for Semester ${sem} ?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please Make Sure that all the faculties have Updated the marks for the Semester {sem} before Confirming
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePublish} autoFocus>
            Publish
          </Button>
        </DialogActions>
      </Dialog>

</div>
            </Container>

        )
    
}

export default PublishResult
