import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {Paper, Typography} from "@material-ui/core";
import {ArgumentAxis, Chart, LineSeries, ValueAxis, BarSeries} from "@devexpress/dx-react-chart-material-ui";
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',
    }
}));

const Graph = () => {
    // css in js
    const classes = useStyles();

    const data = [
        { argument: "01-03", value: 20 },
        { argument: "01-04", value: 10 },
        { argument: "01-05", value: 0 },
        { argument: "01-06", value: 10 },
        { argument: "01-07", value: 30 },
        { argument: "01-08", value: 0 },
        { argument: "01-09", value: 10 },
        { argument: "01-10", value: 30 }
    ];


    return(
        <div className="Graph-Container">
            <div className={classes.root}>
                <Grid container alignItems="center" justify="center" spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h2">
                            Graph
                        </Typography>
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
                            </Chart>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Graph;