import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {Breadcrumbs, Link, Paper, Tab, Tabs, Typography} from "@material-ui/core";
import {ArgumentAxis, Chart, LineSeries, ValueAxis, BarSeries} from "@devexpress/dx-react-chart-material-ui";
import React, {useEffect, useState} from "react";
import {Animation} from "@devexpress/dx-react-chart";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        textAlign: 'center',
    }
}));

const Graph = () => {
    // css in js
    const classes = useStyles();

    const [data, setData] = useState([]);
    const [outputState, setOutputState] = useState(0);

    const bread_change = (event, newValue) => {
        setOutputState(newValue);
    };

    const CountGet = async (PoseName) => {
        const uid = localStorage.getItem('uid');

        if(uid != null){
            const header_token = "Bearer " + uid;

            await axios.get("http://localhost:8000/result", {
                params:{
                    "pose": PoseName
                },
                headers: {
                    Authorization: header_token,
                }
            }).then(
                response => {
                    setData(response.data.results);
                }
            ).catch(
                err => {
                    console.log(err);
                }
            );
        }
    };

    useEffect(() => {
        if(outputState === 0){
            CountGet("Squat");
        }
        else{
            CountGet("PushUp");
        }
    }, [outputState]);


    return(
        <div className="Graph-Container">
            <div className={classes.root}>
                <Grid container alignItems="center" justify="center" spacing={2}>
                    <Grid item xs={12} className={classes.paper}>
                        <Paper >
                            <Tabs
                                value={outputState}
                                onChange={bread_change}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                                >
                                <Tab label="Squat" />
                                <Tab label="PushUp" />
                            </Tabs>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper>
                            <Chart data={data} >
                                <ArgumentAxis />
                                <ValueAxis />

                                <BarSeries
                                    valueField="value"
                                    argumentField="argument"
                                />
                                <LineSeries
                                    valueField="value"
                                    argumentField="argument"
                                />

                                <Animation />
                            </Chart>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Graph;