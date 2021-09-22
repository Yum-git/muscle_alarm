import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {Breadcrumbs, Link, Paper, Typography} from "@material-ui/core";
import {ArgumentAxis, Chart, LineSeries, ValueAxis, BarSeries} from "@devexpress/dx-react-chart-material-ui";
import React, {useEffect, useState} from "react";
import {Animation} from "@devexpress/dx-react-chart";

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

    const [data, setData] = useState([
        { argument: "01-03", value: 20 },
        { argument: "01-04", value: 10 },
        { argument: "01-05", value: 0 },
        { argument: "01-06", value: 10 },
        { argument: "01-07", value: 30 },
        { argument: "01-08", value: 0 },
        { argument: "01-09", value: 10 },
        { argument: "01-10", value: 30 }
    ]);
    const [outputState, setOutputState] = useState("squat_data");

    const bread_change = (change_state) => {
        setOutputState(change_state);
    };

    useEffect(() => {
        if(outputState === "squat_data"){
            setData([
                { argument: "01-03", value: 20 },
                { argument: "01-04", value: 10 },
                { argument: "01-05", value: 0 },
                { argument: "01-06", value: 10 },
                { argument: "01-07", value: 30 },
                { argument: "01-08", value: 0 },
                { argument: "01-09", value: 10 },
                { argument: "01-10", value: 30 }
            ]);
        }
        else{
            setData([
                { argument: "01-03", value: 40 },
                { argument: "01-04", value: 100 },
                { argument: "01-05", value: 20 },
                { argument: "01-06", value: 10 },
                { argument: "01-07", value: 30 },
                { argument: "01-08", value: 100 },
                { argument: "01-09", value: 0 },
                { argument: "01-10", value: 0 }
            ]);
        }
    }, [outputState]);


    return(
        <div className="Graph-Container">
            <div className={classes.root}>
                <Grid container alignItems="center" justify="center" spacing={2}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant="h2">
                                Graph
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Breadcrumbs aria-label="breadcrumb">
                            {outputState === "squat_data" ?
                                <>
                                    <Link color="textPrimary" onClick={() => bread_change("squat_data")}>
                                        Squat
                                    </Link>
                                    /
                                    <Link color="inherit" onClick={() => bread_change("pushup_data")}>
                                        PushUp
                                    </Link>
                                </>
                                :
                                <>
                                    <Link color="inherit" onClick={() => bread_change("squat_data")}>
                                        Squat
                                    </Link>
                                    /
                                    <Link color="textPrimary" onClick={() => bread_change("pushup_data")}>
                                        PushUp
                                    </Link>
                                </>
                            }
                        </Breadcrumbs>
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