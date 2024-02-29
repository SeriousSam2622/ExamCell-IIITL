import React, { useRef } from 'react'

import {db} from '../init-firebase'
import {getDoc,doc,updateDoc} from 'firebase/firestore' 
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    section: {
        padding:"70px",
        margin: "50px 20px",
        width: "100%",
        border: "10px solid black",
        textAlign: "center",
        "& input": {
            margin: "20px",
            padding: "10px",
        },
        "& button": {
            margin: "20px",
            padding:"10px"
        },
        "& h2": {
            margin:"50px"
        }
    },
    root:{
        // display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
})





const Test = () => {

    const semRef1 = useRef();
    const rollRef1 = useRef();
    // const subjectRef1 = useRef();
    const semRef2 = useRef();
    const rollRef2 = useRef();
    const subjectRef2 = useRef();
    const marksRef2 = useRef();
    // const marksCollectionRef = collection(db, "Marks");

    const classes = useStyles();

    const handleFetch = async () => {

        //=========CONSOLE===================//
        console.log("Fetch request made!");
        console.log(semRef1.current.value)
        console.log(rollRef1.current.value)
        //============================//

        // const rollPath = "students/" + rollRef1.current.value + "/marks";
        // const semester = "sem" + semRef1.current.value;

        const tempRollPath = "students/" + rollRef1.current.value;

        const docRef = doc(db, tempRollPath );
        try {
            const docSnap = await getDoc(docRef);
            
            console.log(docSnap.docSnap.data());
        } catch {
            alert("Error Occured!")
        }
            
    }

    const handlePush = async () => {
        
        //===========CONSOLE================//
        console.log("push request made!");
        console.log(semRef2.current.value)
        console.log(rollRef2.current.value)
        console.log(subjectRef2.current.value)
        console.log(marksRef2.current.value)
        //=============================//
        const rollPath = "students/" + rollRef2.current.value + "/marks";
        const semester = "sem" + semRef2.current.value;
        // const subject = subjectRef2.current.value;
        const docRef = doc(db, rollPath, semester);
        try {
            await updateDoc(
                docRef,
                {
                    [subjectRef2.current.value] : marksRef2.current.value 
                 } ,
                { merge: true }
            )
            console.log("success!")
        } catch {
            alert("Error Occured!")
        }



    }




    return (


        <>
        <div className={classes.root}>
            {/* Fetch section */}
    
                <div className={classes.section} >
                    <h1> Fetch Marks </h1>
                <input ref={semRef1}  placeholder="Semester" />
                <input ref={rollRef1} placeholder="Roll number"/>
                {/* <input ref={subjectRef} placeholder="Subject" /> */}
                <button onClick={handleFetch} >Fetch data</button>
                <h2>Marks are : </h2>
            </div>
            
        {/* ============================================== */}


            {/* update section */}

                <div className={classes.section} >
                <h1> Add Marks </h1>
                <input ref={semRef2}  placeholder="Semester" />
                <input ref={rollRef2} placeholder="Roll number"/>
                <input ref={subjectRef2} placeholder="Subject" />
                <input ref={marksRef2} placeholder="Marks" />
                <button onClick={handlePush} >Submit data</button>
                <h2>Pushed to: </h2>
            </div>




            </div>
        </>
    )
}

export default Test