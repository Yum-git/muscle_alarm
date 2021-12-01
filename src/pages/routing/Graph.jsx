import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {Paper, Tab, Tabs} from "@material-ui/core";
import {ArgumentAxis, Chart, LineSeries, ValueAxis, BarSeries, Legend, Title, Tooltip} from "@devexpress/dx-react-chart-material-ui";
import React, {useEffect, useState} from "react";
import {Animation, EventTracker} from "@devexpress/dx-react-chart";
import axios from "axios";

const format = () => tick => tick;
const titleStyle = { margin: '20px', textAlign: "center" };
const TitleText = props => <Title.Text {...props} style={titleStyle} />;

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

        if(true){
            const header_token = "Bearer " + uid;

            await axios.get("http://localhost:8000/result", {
                params:{
                    "pose": PoseName
                },
                headers: {
                    Authorization: `Bearer aiueo`,
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
                                <ArgumentAxis
                                    tickFormat={format}
                                />
                                <ValueAxis />

                                <BarSeries
                                    name="回数"
                                    valueField="value"
                                    argumentField="argument"
                                />
                                <LineSeries
                                    name="過去平均"
                                    valueField="value"
                                    argumentField="argument"
                                />

                                <Legend />
                                <Title
                                    text="運動チャート"
                                    textComponent={TitleText}
                                />
                                <EventTracker />
                                <Tooltip />
                            </Chart>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Graph;