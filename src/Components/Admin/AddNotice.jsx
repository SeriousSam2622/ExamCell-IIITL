import { addDoc, collection } from '@firebase/firestore'
import { Button, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { db } from '../../init-firebase'
import LayoutAdmin from '../LayoutAdmin'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CustomSnackbar from '../Snackbar/Snackbar'



const useStyles = makeStyles({
    card: {
        margin:"70px 7%",
        padding: "10px"
    },
    field: {
        margin: "10px auto",
        padding:"auto"
    },
    btn: {
        margin: "20px auto",
        display:"flex",
        alignSelf: "centre",
        width:"30%"
    },
    heading: {
        margin:"5px 35%",
        padding: "10px",
    },
    label: {
        backgroundColor: "white",
        padding: "auto",
    },
    formArea: {
        backgroundColor: "#f7c4e6",
        padding: "auto",
        borderRadius: "70px",
        // height:"400px"
    }
    
})



const AddNotice = () => {

    const classes = useStyles()
    const [newBody, setNewBody] = useState("")
    const noticeCollectionRef = collection(db, "notices")
    const [open, setOpen] = useState(false);


    const submitNotice = async (e) => {

        e.preventDefault();
        console.log(newBody);
        await addDoc(noticeCollectionRef, { body: newBody, new: true })
        
        setOpen(true);

        setNewBody("");
        

    }

    return (
        <div >
            <LayoutAdmin>
                <div className={classes.formArea}>
                <CustomSnackbar open={open} setOpen={setOpen} message={"Notice Added Succesfully !"} />
                <Paper
                    elevation={5}
                className={classes.heading}
                >
                    <Typography color="secondary" variant="h4" align="center">
                        Add New Notice
                    </Typography>
                </Paper>

        <Paper elevation={5} className={classes.card}>
                    <form
                        id="myForm"
                noValidate
                autoComplete="off"
                onSubmit={submitNotice}
                    >
                        
                            <TextField
                                value={newBody}
                            InputLabelProps={{
                                classes: {
                                    root: classes.label
                                }
                            }} 
                fullWidth
                className={classes.field}
                onChange={(e) => setNewBody(e.target.value)}
                label="Add Notice" 
                variant="outlined"
                color="secondary"
                multiline
                rows={5}
                required
                />
                
                <Button
                className={classes.btn}
                type="submit" 
                color="secondary" 
                variant="contained"
                endIcon={<AddCircleOutlineIcon/>}
                >
                Add 
                </Button>
                
            </form>
            </Paper>
                
        </div>
            </LayoutAdmin>
            
        </div>
    )
}

export default AddNotice
