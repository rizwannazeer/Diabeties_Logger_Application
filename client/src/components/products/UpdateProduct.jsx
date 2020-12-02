import { Button, Grid, TextField } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import productService from '../../services/ProductsService';
const useStyles = makeStyles((theme) => ({
    addBtn:{
        position:"fixed",
        bottom:theme.spacing(2),
        left: theme.spacing(2),
    }
   }));

const UpdateProduct = (props) => {


    const [Time,setTime]=React.useState();
    const [Blood_Sugar_Level,setBlood_Sugar_Level]=React.useState();
    const [Amount_of_Carbohydrate,setAmount_of_Carbohydrate]=React.useState();
    const [Food_Diary,setFood_Diary]=React.useState();
    const [Medicine_Type,setMedicine_Type]=React.useState();
    const [Medicine_Dose,setMedicine_Dose]=React.useState();
    const [Exercise_Type,setExercise_Type]=React.useState();
    const [Exercise_Duration,setExercise_Duration]=React.useState();
    const [Unusual_Events,setUnusual_Events]=React.useState();

    const id=props.match.params.id;
    React.useEffect(()=>{
        productService.getSingleRecord(id)
        .then((data)=>{
            setTime(data.Time);
            setBlood_Sugar_Level(data.Blood_Sugar_Level);
            setAmount_of_Carbohydrate(data.Amount_of_Carbohydrate);
            setFood_Diary(data.Food_Diary);
            setMedicine_Type(data.Medicine.Type);
            setMedicine_Dose(data.Medicine.Dose);
            setExercise_Type(data.Exercise.Type);
            setExercise_Duration(data.Exercise.Duration);
            setUnusual_Events(data.Unusual_Events);
        })
    },[])

    const classes=useStyles();
       
   const handlebackaction=()=>{
    props.history.goBack();
   }
    return ( 
        
        <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h1> Update Record</h1>
                     </Grid>

    <Grid item xs={3}></Grid>
                <Grid item xs={6}>

                    <TextField label="Medicine Type" fullWidth focused value={Medicine_Type} onChange={(e)=>{setMedicine_Type(e.target.value)}}/>
                    <TextField label="Medicine Dose"  fullWidth focused value={Medicine_Dose} onChange={(e)=>{setMedicine_Dose(e.target.value)}}/>
                    <TextField label="Exercise Type" fullWidth focused value={Exercise_Type} onChange={(e)=>{setExercise_Type(e.target.value)}}/>
                    <TextField label="Exercise Duration" fullWidth focused value={Exercise_Duration} onChange={(e)=>{setExercise_Duration(e.target.value)}}/>
                    <TextField label="Time" fullWidth value={Time} focused onChange={(e)=>{setTime(e.target.value)}}/>
                    <TextField label="Blood Sugar Level" fullWidth focused value={Blood_Sugar_Level} onChange={(e)=>{setBlood_Sugar_Level(e.target.value)}}/>
                    <TextField label="Amount of Carbohydrate" fullWidth focused value={Amount_of_Carbohydrate} onChange={(e)=>{setAmount_of_Carbohydrate(e.target.value)}}/>
                    <TextField label="Food Diary" fullWidth value={Food_Diary} focused onChange={(e)=>{setFood_Diary(e.target.value)}} />
                    <TextField label="Unusual Events" fullWidth value={Unusual_Events} focused onChange={(e)=>{setUnusual_Events(e.target.value)}}/>


                </Grid>
                <Grid item xs={3}>
                    <Grid item xs={9}>
                        <Button variant="contained" color="primary" onClick={ e=>{
                            productService.updateRecord(id,{Time,Blood_Sugar_Level,Amount_of_Carbohydrate,Food_Diary,Medicine:{
                                Type: Medicine_Type,
                                Dose:Medicine_Dose
                            },
                                Exercise:{
                                    Type:Exercise_Type,
                                    Duration:Exercise_Duration
                                },
                                Unusual_Events
                            }).then(data=>{console.log(data)
                            props.history.push("/");
                            })
                            .catch(err=> console.log(err));
                            console.log("send Api call to on Click")
                        }}>Update</Button>
                    </Grid>
                    <Grid item xs={3}>
                    <Button color="primary" className={classes.addBtn} onClick={handlebackaction} >
                Back
              </Button>
                    </Grid>
              
                </Grid>


               
              
        </Grid>
     );
}
 
export default UpdateProduct;