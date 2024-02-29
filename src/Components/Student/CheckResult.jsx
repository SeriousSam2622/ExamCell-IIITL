import React, { useState } from 'react'
import {  Button, Container,  Grid,  makeStyles, Paper, Typography } from '@material-ui/core'
import ResultForm from '../Student/ResultForm'
import { NewReleasesTwoTone } from '@material-ui/icons'

const semList = [

    {
        id: '1',
        sem:'1'
    },

    {
        id: '2',
        sem:'2'
    },

    {
        id: '3',
        sem:'3'
    },

    {
        id: '4',
        sem:'4'
    },

    {
        id: '5',
        sem:'5'
    },

    {
        id: '6',
        sem:'6'
    },

    {
        id: '7',
        sem:'7'
    }


]

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
        padding: "40px",
        marginTop: "20px",
        background: "#fde2f7",
        borderRadius:"40px"
    },
    formArea: {
        backgroundColor: "#f7c4e6",
        padding: "auto",
        borderRadius:"50px"
    }

})


const CheckResult = () => {

    const classes = useStyles();

    const data = {};

    const [showForm, setShowForm] = useState(false)

    const displayForm = (e) => {
        console.log(e);
        setShowForm(!showForm);
    }

        return (
            <Container>
                <div  className={classes.formArea}>
                    <Paper
                    elevation={5}
                className={classes.heading}
                >
                    <Typography color="secondary" variant="h4" align="center">
                        Available Results
                    </Typography>
                </Paper>
                
                <Grid Container spacing={5}>
                    
                    <Grid item lg={12}>

                <div className={classes.center}>                        
                    <Grid container spacing={2}>
                 {semList.map(s => {
                    return s.id!=='7' ?
                       <Grid item  sm={12} md={6} lg={6}><Button variant="outlined" color="secondary" onClick={displayForm}>View Result for Semester {s.sem}
                        </Button></Grid>
                        :
                        <Grid item sm={12} md={6} lg={6}><Button
                            variant="outlined"
                            color="secondary"
                            endIcon={<NewReleasesTwoTone/>}
                            onClick={displayForm}
                        >View Result for  Semester {s.sem}
                        </Button></Grid> 

                    
                })}
                </Grid>
                </div>
                 
                      
                
            </Grid>
                    <Grid item lg={12}>
                        {showForm && <ResultForm data={data} />}
                    </Grid> 
            </Grid>
            </div>
        </Container>
        )
    
}

export default CheckResult
