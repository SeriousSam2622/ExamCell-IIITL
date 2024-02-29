import { Container, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography ,Button } from '@material-ui/core'
import { useReactToPrint } from 'react-to-print';
import React, { useEffect, useRef, useState } from 'react'
// import avatarResult from '../Assets/avtarResult.jpg'
import DownloadingIcon from '@mui/icons-material/Downloading';
import { db, useAuth } from '../../init-firebase';
import { doc, getDoc  } from '@firebase/firestore'

const useStyles = makeStyles({
    root: {
        marginTop: 40,
        marginBottom: 20,
      display: 'block',
  
        
    },
    detailCard: {
      margin: "10px auto",
      padding: "30px"
    },
    img: {
      width: "100px",
      height: "100px",
      display: "flex",
      justifyContent:"centre"
    },
    detail: {
      width: "60%",
      display: "flex",
      padding:"5px" ,
      justifyContent:"centre"
    },
    btn: {
      padding: "20px auto",
      margin:"20px",
      display: 'flex',
      justifyContent: 'center'
    },
    center: {
      padding: "2px",
      display:"flex",
      justifyContent:"center",
      widht: "50%",
      border: "3px solid pink",
      borderRadius: "15px",
      backgroundColor:"#fde2f7"
    },
    divs: {
      // display: "inline-block",
      padding: "10% auto",
      margin:"auto 5%"
    }
    
  })


const ResultForm = ({sem,marksArr,funcCall,funcCall2}) => {

  const currentUser = useAuth();
  const classes = useStyles()
  const componentRef = useRef()

  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [batch, setBatch] = useState("");
  const [photoSrc, setPhotoSrc] = useState("");

  // let [marksArr,setMarksArr]=useState([])
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(true);

  const showMarks = async () => {
    setShow(!show);
    setShow2(!show2);
    funcCall();
    const email = currentUser.email;
    const roll = email.slice(0, 8);
    console.log(roll);
    const docRef = doc(db, "students", roll);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data())
    setName(docSnap.data().name);
    setBatch(docSnap.data().batch);
    setRollNo(docSnap.data().rollnum);
    setPhotoSrc(docSnap.data().photo);
    console.log(marksArr);
  }

  const checkOther = () => {
    setShow(false);
    setShow2(false);
    funcCall2();
  }
  
  useEffect(() => {
    console.log("EMAIL: ",currentUser?.email);
    // console.log("PHOTO:",photoSrc);
    console.log(marksArr);
  },[])

  const getGrades=(marks)=>{
    if (marks > 95) {
      return "A+";
    }
    if (marks > 90) {
      return "A";
    }
    if (marks > 80) {
      return "B+";
    }
    if (marks > 75) {
      return "B";
    }
    if (marks > 70) {
      return "C";
    }
    if (marks <= 70) {
      return "D"
    }
    
  }


    return (
<>
        {show2 && <div style={{ marginTop: "20px" }} className={classes.center}><Button variant="outlined" color="secondary" onClick={showMarks}>Show Result for {sem}</Button></div>}
        {show && <div style={{ marginTop: "20px" }} className={classes.center}>
          <Button variant="outlined" color="secondary" onClick={checkOther}> Check Other Result</Button>
        </div>}
        {show &&
          <div style={{ marginTop: "20px" }} className={classes.center}>
          <Container className={classes.root}>
            <Typography align="center" variant="h4" gutterBottom>
                Result for Semester
        </Typography>
        
        <div ref={componentRef} >
          
          <Paper className={classes.detailCard} elevation={3}>
            
            <div className={classes.center}>
        
              <div>
                  <h5>Name: {name}  </h5>
                  <h5>Batch: {batch}</h5>
                <h5>Roll No. : {rollNo} </h5>
                <h5>Semester: {sem} </h5>
              </div>

              <div className={classes.divs}>
             <img className={classes.img} src={photoSrc} alt={name}/>
              </div>
          
            </div>
            
          </Paper>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Subject Code</TableCell>
                  <TableCell align="right">Obtained Marks</TableCell>
                  <TableCell align="right">Max Marks</TableCell>
                  <TableCell align="right">Grade</TableCell>
                  {/* <TableCell align="right">Highest Score</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {marksArr.map((row) => (
                  <TableRow
                    key={row.subject}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.subject}
                    </TableCell>
                    <TableCell align="right">{row.marks}</TableCell>
                    <TableCell align="right">100</TableCell>
                    { 
                    <TableCell align="right">{getGrades(row.marks)}</TableCell>
                     } 
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </div>
        
        <div className={classes.btn}>
        <Button
          endIcon={<DownloadingIcon/>}
          onClick={handlePrint}
          variant="contained"
          color="secondary"
        >Download Result</Button>
        </div>
          </Container>
        </div>
        }
        </>
      );
}

export default ResultForm
