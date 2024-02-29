import { doc, updateDoc } from '@firebase/firestore'
import { TextField,Button, Typography, makeStyles } from '@material-ui/core'
import { Paper } from '@mui/material'
import React, { useState } from 'react'
import { db } from '../../init-firebase'
import LayoutAdmin from '../LayoutAdmin'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {uploadBytesResumable,getDownloadURL,getStorage,ref as sRef } from "firebase/storage"
import CustomSnackbar from '../Snackbar/Snackbar'
import { styled } from '@mui/material/styles';
import ImageIcon from '@material-ui/icons/Image';

const Input = styled('input')({
    display: 'none',
  });
  

const useStyles = makeStyles({
    card: {
        margin:"50px 8%",
        padding: "20px",
    },
    field: {
        margin: "15px 10px",
        padding:"auto"
    },
    btn: {
        margin: "10px auto",
        padding: "10px 10px",
        display: "flex",
        alignSelf: "centre",
        width:"40%"
    },
    photofile: {
        border: "2px solid #d500f9",
        display: "flex",
        padding: '6px 6px',
        cursor: 'pointer',
        margin: "auto 10px",
        backgroundColor: "#edb6f7",
        
    },
    center: {
        textAlign: "center",
        margin: "auto",
        padding:"10px"
    },
    heading: {
        margin:"2px 35%",
        padding: "10px",
    },
    label: {
        backgroundColor: "white",
        padding: "auto",
    },
    formArea: {
        backgroundColor: "#f7c4e6",
        padding: "auto",
        borderRadius:"70px"
    }

    
})


const EditToppers = () => {

    const classes = useStyles()
 
    var files = [];
 
    const [year, setYear] = useState(0);
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [batch, setBatch] = useState("");
    const [cgpa, setCgpa] = useState(0);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(false);
    const [selected2, setSelected2] = useState(false);
    
    const updateTopper = async (id, name, batch, cgpa) => {
        
        const userDoc = doc(db, "toppers", id)
        
        const newFields = { name: name, batch: batch, cgpa: cgpa,link:link }
        
        await updateDoc(userDoc, newFields);

        setOpen(true);

    }

    const onFileChange = (e) => {
        files = e.target.files;
        console.log(files[0]);
        UploadPorcess();
        setSelected2(true);
    }

    // ---------------Upload Process----------------//


    async function UploadPorcess() {
        var ImageToUpload = files[0];

        var ImgName = ImageToUpload.name

        const metaData = {
            contentType: ImageToUpload.type
        }

        const storage = getStorage();

        const storageRef = sRef(storage, "Images/" + ImgName);
        
        const UploadTask = uploadBytesResumable(storageRef, ImageToUpload, metaData);

        UploadTask.on('state_changed', (snapshot) => {
            // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

             

        },
        (error) => {
             alert("Error: Image Not Uploaded!")
            },
            () => {
                getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
                    setLink(downloadURL);
                    setSelected(true);
                    setSelected2(false);
            } )
        }
        );
           

    }


    // ===================================//
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(year, name, batch, cgpa);
        updateTopper(year,name,batch,cgpa)
    }

    return (
        <div>
            <LayoutAdmin>
        <div className={classes.formArea}>
                <CustomSnackbar open={open} setOpen={setOpen} message={"Topper Updated Succesfully !"} />

                <Paper
                    elevation={5}
                className={classes.heading}
                >
                    <Typography  InputLabelProps={{
                                classes: {
                                    root: classes.label
                                }
                            }} color="secondary" variant="h4" align="center">
                        Update Topper
                    </Typography>
                </Paper>


                <Paper elevation={5} className={classes.card}>
                    <form>
                        <TextField
                            required
                            InputLabelProps={{
                                classes: {
                                    root: classes.label
                                }
                            }}
                                fullWidth
                                autoComplete="off"
                                className={classes.field}
                                variant="outlined"
                                label="Year"
                                color="secondary"
                                onChange={(e)=> setYear(e.target.value)}
                        />
                        <TextField
                            required
                            InputLabelProps={{
                                classes: {
                                    root: classes.label
                                }
                            }}
                                fullWidth
                                autoComplete="off"
                                className={classes.field}
                                variant="outlined"
                                label="Name"
                                color="secondary"
                                onChange={(e)=> setName(e.target.value)}
                        />
                        <TextField
                            required
                            InputLabelProps={{
                                classes: {
                                    root: classes.label
                                }
                            }}
                                fullWidth
                                autoComplete="off"
                                className={classes.field}
                                variant="outlined"
                                label="Batch"
                                color="secondary"
                                onChange={(e)=> setBatch(e.target.value)}
                        />
                        <TextField
                            required
                            InputLabelProps={{
                                classes: {
                                    root: classes.label
                                }
                            }}
                                fullWidth
                                autoComplete="off"
                                className={classes.field}
                                variant="outlined"
                                label="GCPA"
                                color="secondary"
                                onChange={(e)=> setCgpa(e.target.value)}
                        />
                        <div className={classes.center}>
                        <label htmlFor="contained-button-file">
                            <Input onChange={onFileChange} accept="image/" id="contained-button-file" type="file" />
                            <Button className={classes.photofile}  variant="outlined" style={{backgroundColor: '#d500f9', color: '#FFFFFF'}} component="span">
                            Upload Photo
                            </Button>
                            </label>
                            {selected2 && <p>Uploading Image...</p>}
                            {selected && <><p>Image Uploaded</p><ImageIcon fontSize="large" style={{fill: "#d500f9"}}/></>}
                        </div>
                                
                            <Button
                            disabled={selected2}
                            endIcon={<KeyboardArrowRightIcon/>}
                            variant="contained"
                            color="secondary"
                            className={classes.btn}
                                onClick={handleSubmit}>Submit</Button>
                        </form>                                
                    </Paper>
                    
            </div>

            </LayoutAdmin>
        </div>
    )
}

export default EditToppers
