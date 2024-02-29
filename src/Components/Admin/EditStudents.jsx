// import { doc, updateDoc } from '@firebase/firestore'
import { TextField,Button, Typography, makeStyles } from '@material-ui/core'
import { Paper } from '@mui/material'
import React, { useState } from 'react'
import { db } from '../../init-firebase'
import LayoutAdmin from '../LayoutAdmin'
import {uploadBytesResumable,getDownloadURL,getStorage,ref as sRef } from "firebase/storage"
import CustomSnackbar from '../Snackbar/Snackbar'
import { styled } from '@mui/material/styles';
import ImageIcon from '@material-ui/icons/Image';
import {deleteDoc,setDoc,doc} from 'firebase/firestore'
import { Delete, AddCircleOutline } from '@material-ui/icons'


const Input = styled('input')({
    display: 'none',
  });
  

const useStyles = makeStyles({
    card: {
        margin:"50px 8%",
        padding: "20px" 
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
        margin:"auto 35%",
        padding: "10px"
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


const EditStudents = () => {

    const classes = useStyles()
 
    var files = [];

 
    const [deleteRoll, setDeleteRoll] = useState(0);

    const [address, setAddress] = useState("");
    const [batch, setBatch] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [phone, setPhone] = useState("");
    const [photo, setPhoto] = useState("");
    const [rollnum, setRollnum] = useState(0);

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [selected, setSelected] = useState(false);
    const [selected2, setSelected2] = useState(false);

    
    const createStudent = async () => {
        
        await setDoc(doc(db, "students", rollnum), {
            
            address: address,
            batch: batch,
            email: email,
            name: name,
            dob: dob,
            phone: phone,
            photo: photo,
            rollnum: rollnum
        });

        for (let i = 1; i <= 8; i++) {
            const rollPath = "students/" + rollnum + "/marks";
            const semesterNum = "sem" + i;
            const docRef = doc(db, rollPath, semesterNum);

            try {
                await setDoc(docRef, {
                
                })
            } catch (err) {
                alert(err.message)
            }

        }
        setOpen(true);

    }

    const deleteStudent = async (id) => {
        
        const userDoc = doc(db,"students",id)

        await deleteDoc(userDoc);

        setOpen2(true);

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

        const storageRef = sRef(storage, "StudentImages/" + ImgName);
        
        const UploadTask = uploadBytesResumable(storageRef, ImageToUpload, metaData);

        UploadTask.on('state_changed', (snapshot) => {
            // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

             

        },
        (error) => {
             alert("Error: Image Not Uploaded!")
            },
            () => {
                getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
                    setPhoto(downloadURL);
                    setSelected(true);
                    setSelected2(false);
            } )
        }
        );
           

    }


    // ===================================//
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log( name , rollnum);
        createStudent();
    }

    return (
        <div>
            <LayoutAdmin>
        
                <CustomSnackbar open={open} setOpen={setOpen} message={"Added Succesfully !"} />
                <CustomSnackbar open={open2} setOpen={setOpen2} message={"Student Deleted !"} />

                <div className={classes.formArea}>
                <Paper
                    elevation={5}
                className={classes.heading}
                >
                    <Typography  InputLabelProps={{
                                classes: {
                                    root: classes.label
                                }
                            }} color="secondary" variant="h4" align="center">
                        Add Student
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
                                label="Enrollement No."
                                color="secondary"
                                onChange={(e)=> setRollnum(e.target.value)}
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
                                label="D.O.B"
                                color="secondary"
                                onChange={(e)=> setDob(e.target.value)}
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
                                label="Contact No."
                                color="secondary"
                                onChange={(e)=> setPhone(e.target.value)}
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
                                label="Email"
                                color="secondary"
                                onChange={(e)=> setEmail(e.target.value)}
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
                                label="Address"
                                color="secondary"
                                onChange={(e)=> setAddress(e.target.value)}
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
                            endIcon={<AddCircleOutline fontSize="large"/>}
                            variant="contained"
                            color="secondary"
                            className={classes.btn}
                                onClick={handleSubmit}>Add Student</Button>
                        </form>                                
                    </Paper>
                    </div>
                    
                {/* //=========Delete Student============// */}

                <div className={classes.formArea}>
                <Paper
                    elevation={5}
                className={classes.heading}
                >
                    <Typography  InputLabelProps={{
                                classes: {
                                    root: classes.label
                                }
                            }} color="secondary" variant="h4" align="center">
                        Delete Student
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
                                label="Enrollement No."
                                color="secondary"
                                onChange={(e)=> setDeleteRoll(e.target.value)}
                        />

                        <Button
                            endIcon={<Delete/>}
                            variant="contained"
                            color="secondary"
                            className={classes.btn}
                                onClick={()=>deleteStudent(deleteRoll)}>Delete Student</Button>
                        </form>                                
                    </Paper>
                    </div>
                    
            </LayoutAdmin>
        </div>
    )
}

export default EditStudents
