import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
    card: {
        backgroundColor: '#f9f1f9',
        maxWidth: "100%"
    },
    img: {
        width: "200px",
        height:"200px",
        margin: "10px auto",
    },
    head: {
        fontWeight:'bold'
    }
})

const TopperCard = ({ topperdata }) => {
    
    const classes = useStyles();

    return (
        <Card elevation={ 7} className={classes.card}>
            
            <CardHeader
                className={classes.head}
                align ='center'
                title={topperdata.name}
                subheader={topperdata.batch}
            />

            <CardMedia
                className={classes.img}
                component="img"
                image={topperdata.link}
                alt={topperdata.name}
            />
            <Avatar
            src={
              "http://www.wpsimplesponsorships.com/wp-content/uploads/2019/05/cropped-icon-256x256.png"
            }
          />

            <CardContent>
                <Typography variant="body1" align='center'
                gutterBottom
                >
                    {topperdata.name} have scored an cgpa of {topperdata.cgpa} in the previous Academic Year.
                </Typography>
            </CardContent>
            
        </Card>
    )
}

export default TopperCard
