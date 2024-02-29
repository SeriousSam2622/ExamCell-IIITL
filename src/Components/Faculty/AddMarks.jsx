import { doc, updateDoc,getDocs, setDoc,collection,query,where } from '@firebase/firestore'
import { Button, FormControl, InputLabel, makeStyles, MenuItem, Paper, Select, TextField, Typography } from '@material-ui/core'
import { CheckCircleRounded  } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { db, useAuth } from '../../init-firebase'
// import {useAuth} from '../../Context/AuthContext'
import LayoutFaculty from '../LayoutFaculty'
import CustomSnackbar from '../Snackbar/Snackbar'


const sem = [
    
    {
        id: "1",
        SemNo:"1"
    },
    {
        id: "2",
        SemNo:"2"
    },
    {
        id: "3",
        SemNo:"3"
    },
    {
        id: "4",
        SemNo:"4"
    },
    {
        id: "5",
        SemNo:"5"
    },
    {
        id: "6",
        SemNo:"6"
    },
    {
        id: "7",
        SemNo:"7"
    },
    {
        id: "8",
        SemNo:"8"
    },
]

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

const AddMarks = () => {

    const currentUser = useAuth();
    const [semester, setSemester] = React.useState('1');

    const [roll, setRoll] = useState('');

    const [subject, setSubject] = useState('')
    const [subjectArr, setSubjectArr] = useState('')
    
    const [obtained, setObtained] = useState('')
    
    const [total, setTotal] = useState('')
    const [open, setOpen] = useState(false);

    
    const [loadForm,setLoadForm ] = useState(false);

   
    const handleSemester = (event) => {
      setSemester(event.target.value);
    };

    const handleSubject = (event) => {
      setSubject(event.target.value);
    };

    const fetchSubjectArr = async () => {
        console.log(currentUser);
        try {
            const facCollectionRef = collection(db, "faculties");
            const q = query(facCollectionRef, where("email", "==", currentUser.email));
            const snapshot = await getDocs(q);
            
            console.log(snapshot);
            setSubjectArr(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            // console.log(subjectArr);
            setLoadForm(true);

        } catch (err) {
            alert(err.message);
        }
        
    }

    const [subjectsList,setSubjectsList]=useState();

    useEffect(() => {
        console.log(subjectArr)
        if(subjectArr)
            setSubjectsList(subjectArr[0].subjects);
    },[subjectArr])

    

   
  
    


       

    const classes = useStyles();

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log("push req made!");
        // console.log(roll);
        // console.log(subject);
        // console.log(semester);




        const rollPath = "students/" + roll + "/marks";
        const semesterNum = "sem" + semester;
        const docRef = doc(db, rollPath, semesterNum);

        

        try {
            await updateDoc(
                docRef,
                {
                    [subject]: obtained
                 } ,
                { merge: true }
            )
            // setRoll('1');
            // setSubject('');
            // setRoll('');
            // setObtained('');
            // setTotal('');
            setOpen(true);
            // console.log("success!")
        } catch(err) {
            alert(err.message)
        }    
      }

    
    

    return (
        < LayoutFaculty >
        <CustomSnackbar open={open} setOpen={setOpen} message={"Marks Added Succesfully !"} />
            {!loadForm && <div className={classes.center}>
            <Button variant="outlined" color="secondary" onClick={fetchSubjectArr}>Load Form</Button>
            </div>}

            {loadForm &&
      
        <div className={classes.formArea}>
        <Paper className={classes.heading}>
            <Typography align="center" variant="h4" gutterBottom>AddMarks</Typography>
        </Paper>
        <Paper className={classes.card}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>

            

        <FormControl className={classes.field} fullWidth>
                <InputLabel
                  style={{color:"#d500f9"}} id="demo-simple-select-label">Semester</InputLabel>
                <Select
                  
                  // className={classes.field}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={semester}
          label="Semester"
          onChange={handleSemester}
                >
                    {sem.map(s => (
    
                        <MenuItem key={ s.id} value={s.id}>{s.SemNo}</MenuItem>
))}
                     

        </Select>
            </FormControl>


<FormControl className={classes.field} fullWidth>                        
<InputLabel  style={{color:"#d500f9"}}  id="demo-simple-select-label">Subject</InputLabel>
                            <Select
                                
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={subject}
    label="Age"
    onChange={handleSubject}
                            >
          {subjectsList.map(s => (
    
    <MenuItem key={s} value={s}>{s}</MenuItem>
))}
                  
                                
        </Select>      
</FormControl>                  
                        
                        
        

        <TextField InputLabelProps={{
                                classes: {
                                    root: classes.label
                                }
                            }} className={classes.field}
          onChange={(e) => setRoll(e.target.value)}
          label="Enrollment No." 
          variant="outlined" 
                            color="secondary"
                            value={roll}
          fullWidth
          required
        //   error={titleError}
        />    

                        <TextField InputLabelProps={{
          
                                classes: {
                                    root: classes.label
                                }
                            }} className={classes.field}
          onChange={(e) => setObtained(e.target.value)}
          label="Obtained Marks" 
          variant="outlined" 
                            color="secondary"
                            value={obtained} 
          fullWidth
          required
        //   error={titleError}
        />
            
      <TextField InputLabelProps={{
                                classes: {
                                    root: classes.label
                                }
                            }} className={classes.field}
                            onChange={(e) => setTotal(e.target.value)}
                            value={total}
          label="Total Marks" 
          variant="outlined" 
          color="secondary" 
          fullWidth
          required
        //   error={titleError}
        />
      <div className={classes.center}>
      <Button
          type="submit" 
          color="secondary" 
          variant="contained"
          endIcon={<CheckCircleRounded />}>
          Submit
              </Button>
        </div>      
      </form>
      </Paper>
      </div>
                        }
        </LayoutFaculty >
    )
}

export default AddMarks
