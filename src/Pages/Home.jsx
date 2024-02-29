import {  Container, Divider, Grid,  Paper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Marquee from 'react-double-marquee'
import TopperCard from '../Components/TopperCard'
import { makeStyles } from '@material-ui/core'
import newlogo from '../Assets/new_flash.gif'
import {db} from '../init-firebase'
import {collection,onSnapshot} from 'firebase/firestore' 
import { Skeleton } from '@mui/material'


const useStyles = makeStyles({
    topperSec: {
        // minWidth: 300,
        marginLeft: 20
    },
    toolbar: {
        height: 100
    },
    gif: {
        width:35
    },
    notice: {
        minWidth:200,
        maxWidth: "100%",
    },
    skeleton: {
        // display:"flex"
    }
})





const Home = () => {

    
    const [newNotices, setNewNotices] = useState([])
    const [newToppers, setNewToppers] = useState([])
    const noticeCollectionRef = collection(db,"notices")
    const toppersCollectionRef = collection(db,"toppers")

    const classes = useStyles();

    useEffect(() => {
        
        onSnapshot(toppersCollectionRef, (snapshot) => {
            setNewToppers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        
        )

        onSnapshot(noticeCollectionRef, (snapshot) => {
            setNewNotices(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        
        )

        
            
    }, [])

    newNotices.sort(function(a,b){return b.new-a.new});
            // console.log(newNotices)


    return (
        <>
            <div className={classes.toolbar}></div>
        <Container>
            
            
            <Grid container spacing={10}>

                {/* Notices Section Starts */}

                <Grid className={classes.notice} item xs={3} sm={3} md={3}>
                        <Typography
                            style={
                                {border: 'solid 3px pink',
                                padding: '2px',
                                borderRadius:"20px"
                            }}
                            gutterBottom align="center" variant="h4">Notices
                        </Typography>
                        <br/>
                    <Divider/>
                    <Paper
                            elevation={5}
                            style={
                                {border: 'solid 2px pink',
                                padding: '20px',
                                borderRadius:"30px"
                            }}
                    >
                        <Typography gutterBottom align="center" variant="h5">
                        Here we have notices!
                        </Typography>
                    <Divider/>

                        <div style={{
                            width: '98%',
                            height:"100%",
                            whiteSpace: 'nowrap',
                                color: 'red',
                        }}>
                    
                        
                                { (newNotices.length!==0)?
                                    newNotices.map(note => (
                                <Marquee direction={"left"} delay={'1'} key={note.id}>
                                    {note.body}
                                    {note.new && <img alt="new" className={classes.gif} src={newlogo} /> }    
                                </Marquee>       
                                
                                    )) :
                                    <div>
                                        <Skeleton
                                            style={{margin:"auto"}}
                                            variant="rectangular" animation="wave" width={200} height={450} />
                                    </div>
                                
                                }


                    </div>
                    </Paper>
                </Grid>

                {/* Notices Section ends */}

                {/* toppers Section starts */}

                <Grid className={classes.topperSec} item xs={8} sm={8} md={8}>
                    
                    <Typography 
                            style={
                                {border: 'solid 3px pink',
                                padding: '2px',
                                borderRadius:"20px"
                            }} variant="h4" align="center" gutterBottom>
                        Toppers 
                    </Typography>
                        <br/>
                    
                        <div style={
                                {border: 'solid 2px pink',
                                padding: '30px',
                                borderRadius:"30px"
                            }}>
                        <Grid container spacing={3}>
                    
                            { (newToppers.length!==0)?
                                newToppers.map(top => (
                            <Grid item xs={12} md={6} lg={6} key={top.id}>
                                <TopperCard topperdata={top}/>
                            </Grid>

                                )) :
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={6} lg={6}>
                                            <Skeleton variant="text" width={100} height={20} />
                                            <Skeleton variant="rectangular" width={300} height={320} />
                                            <Skeleton variant="text" width={200} height={30} />
                                        </Grid>                                    
                                        <Grid item xs={12} md={6} lg={6}>
                                            <Skeleton variant="text" width={100} height={20} />
                                            <Skeleton variant="rectangular" width={300} height={320} />
                                            <Skeleton variant="text" width={200} height={30} />
                                        </Grid>                                    
                                        <Grid item xs={12} md={6} lg={6}>
                                            <Skeleton variant="text" width={100} height={20} />
                                            <Skeleton variant="rectangular" width={300} height={320} />
                                            <Skeleton variant="text" width={200} height={30} />
                                        </Grid>                                    
                                        <Grid item xs={12} md={6} lg={6}>
                                            <Skeleton variant="text" width={100} height={20} />
                                            <Skeleton variant="rectangular" width={300} height={320} />
                                            <Skeleton variant="text" width={200} height={30} />
                                        </Grid> 
                                        </Grid>                                   
                                
                            
                            }
                            

                        {/* {newToppers.map(top => (
                            <Grid item xs={12} md={6} lg={6} key={top.id}>
                                <TopperCard topperdata={top}/>
                            </Grid>

                        ))} */}
                        
                    </Grid>
                            </div>

                </Grid>
                {/* toppers Section end */}

            </Grid>

                </Container>
            </>
    )
}

export default Home
