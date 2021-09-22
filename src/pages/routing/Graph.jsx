import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {Breadcrumbs, Link, Paper, Tab, Tabs, Typography} from "@material-ui/core";
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
    const [outputState, setOutputState] = useState(0);

    const bread_change = (event, newValue) => {
        setOutputState(newValue);
    };

    useEffect(() => {
        if(outputState === 0){
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