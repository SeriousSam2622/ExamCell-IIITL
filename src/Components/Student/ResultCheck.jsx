import { collection, doc, getDoc, getDocs, query, where } from '@firebase/firestore'
import { Typography,Button, makeStyles, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { db, useAuth } from '../../init-firebase'
import ResultForm from './ResultForm'


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
        borderRadius: "40px",
        border:"2px solid pink"
    },
    formArea: {
        backgroundColor: "#f7c4e6",
        padding: "auto",
        borderRadius:"50px"
    },
    button: {
        margin:"10px"
    }

})


const ResultCheck = () => {

    const classes = useStyles();
    const [semester, setSemester] = useState("");
    const [data, setData] = useState();
    const [show, setShow] = useState(false);

    

    const currentUser = useAuth();

    const [availableResultList, setAvailableResultList] = useState([]);


    const handleFetch = async (sem) => {

        //============================//
        let roll = '';
        const email = currentUser.email;

        for (let i = 0; i < email.length; i++){
            
            if (email[i] === '@') {
                break;
            } else {
                roll+=email[i];
            }
        }
        setSemester(sem);
        console.log(roll);

        //============================//

        // const rollPath = "students/" + rollRef1.current.value + "/marks";
        // const semester = "sem" + semRef1.current.value;

        const tempRollPath = "students/" + roll+"/marks/"+sem;

        const docRef = doc(db, tempRollPath );
        try {
            const docSnap = await getDoc(docRef);
            setData(docSnap.data());
            console.log(docSnap.data());
        } catch (err){
            alert(err.message)
        }
            
    }


    const handleSemester = (e) => {
        console.log(e.target.value);
        setSemester(e.target.value);
        handleFetch(e.target.value);
    }


    const fetchAvailableResultList = async() => {
        const collectionRef = collection(db, "availableResults");
        const q = query(collectionRef, where("available", "==", true));
        const snapshot = await getDocs(q);

        setAvailableResultList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    let marksArr = [];
    const showResult = () => {
        for (const key in data) {
            console.log(`${key}:${data[key]}`);
            marksArr.push({subject:key ,marks:data[key]} )
        }
        console.log(marksArr);
        setShow(true);
    }
    
    const showResult2 = () => {
        setShow(false);
    }

    useEffect(() => {
        fetchAvailableResultList();
        console.log(availableResultList);
    }, []);

    


    return (
        <>
            {!show && <div className={classes.center}>
                <Typography> Select Semester</Typography>
                <FormControl className={classes.field} fullWidth>                        
<InputLabel  style={{color:"#d500f9"}}  id="demo-simple-select-label">Semester</InputLabel>
                            <Select
                                
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={semester}
    label="Select Semester"
    onChange={handleSemester}
                            >
          {availableResultList.map(s => (
    
    <MenuItem key={s.id} value={s.id}>{s.id}</MenuItem>
          ))}
                        
                                
        </Select>      
                </FormControl>

               <Button variant="contained" color="secondary" className={classes.button} onClick={showResult}> Get Result</Button>

            </div>}
            {/* <div style={{ marginTop: "20px" }} className={classes.center}> */}
                {show &&
                    <ResultForm sem={semester} funcCall={showResult} funcCall2={showResult2} marksArr={marksArr}/>
                }
            {/* </div> */}
        </>
    )
}

export default ResultCheck
