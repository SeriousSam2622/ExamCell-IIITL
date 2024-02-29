import { deleteDoc, doc } from '@firebase/firestore'
import {   Card, CardContent, CardHeader, Divider, IconButton, makeStyles,  Typography } from '@material-ui/core'
import { DeleteOutlined } from '@material-ui/icons'
import { db } from '../../init-firebase'

const useStyles = makeStyles({
    field: {
      marginTop: 20,
      marginBottom: 20,
      display: 'block'
    }
})

const ResQuery = ({funCall,quer,resolved}) => {
    
    const classes = useStyles();

    // const [response, setResponse] = useState('');
    // const [resolved, setResolved] = useState(false);

    // const handleRes = () => {
    //     setResolved(true)
    // }

    const handleDelete = async (id) => {
        try {
            // const docRef = doc(db, "queries", id);
            // await deleteDoc(docRef);
            // console.log("delted", id);
            funCall();
        } catch(err) {
            alert(err.message)
        }
    }

    return (
        <Card>
            <CardHeader
                action={
          <IconButton onClick={()=> handleDelete(quer.id)} aria-label="settings" color="secondary" >
            <DeleteOutlined  fontSize="large"/>
          </IconButton>
        }
                title={quer.title}
                subheader={`
                to: ${quer.to}
                `}
            />
            <CardContent>
                <Typography variant="h6">
                {quer.body}
                    </Typography>
                <Divider className={classes.field}/>
                <Typography variant="h5">
                    
                    {quer.isResolved ? quer.response : null}
               </Typography>
                    

                </CardContent>
                
            </Card>

    )
}

export default ResQuery
