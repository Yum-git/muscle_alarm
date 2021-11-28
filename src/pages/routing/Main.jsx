import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import 'styles/clock.scss';
import {Card, CardContent, CardMedia, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        textAlign: 'center',
    },
    EnablePaper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    LinkATag: {
        textDecoration: 'none',
    },
    card: {
        padding: theme.spacing(2),
        backgroundColor: '#FFFAFA'
    }
}));

const Main = () => {
    const classes = useStyles();

    const clock = () => {
        const d = new Date();
        const hour = ("0" + d.getHours()).slice(-2);
        const min = ("0" + d.getMinutes()).slice(-2);
        const sec = ("0" + d.getSeconds()).slice(-2);

        const time = `${hour}:${min}:${sec}`;

        return time;
    }

    const [time, setTime] = useState(clock);
    useEffect(() => {
        setInterval(() => {
            setTime(clock);
        }, 1000);
    }, []);

    return(
        <div className="Clock">
            <div className={classes.root}>
                <Grid container alignItems="center" justify="center" spacing={2}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper + " ClockPaper"}>
                            <h1>
                                {time}
                            </h1>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Link to={{
                            pathname: '/train'
                        }} className={classes.LinkATag}>
                            Training
                        </Link>
                    </Grid>
                </Grid>
                <Grid container alignItems="center" justify="center" spacing={3}>
                    <Grid item xs={6} sm={5}>
                        <Link to={{
                            pathname: '/pose',
                            state: {
                                input_pose: 'squat',
                                youtube_url: 'https://www.youtube.com/embed/SFnfYPktYBU'
                            }
                        }} className={classes.LinkATag}>
                            <Card className={classes.card}>
                                <CardMedia
                                    component="img"
                                    image="png/squat.png"
                                />
                                <CardContent>
                                    <Typography variant="h6">
                                        Squat
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item xs={6} sm={5}>
                        <Link to={{
                            pathname: '/pose',
                            state: {
                                input_pose: 'pushup',
                                youtube_url: 'https://www.youtube.com/embed/k4fsFKCp5iU'
                            }
                        }} className={classes.LinkATag}>
                            <Card className={classes.card}>
                                <CardMedia
                                    component="img"
                                    image="png/pushup.png"
                                />
                                <CardContent>
                                    <Typography variant="h6">
                                        PushUp
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                </Grid>
                <Grid container alignItems="center" justify="center" spacing={3}>
                    <Grid item xs={6} sm={5}>
                        <Link to={{
                            pathname: '/graph'
                        }} className={classes.LinkATag}>
                            <Card className={classes.card}>
                                <CardMedia
                                    component="img"
                                    image="png/graph.png"
                                />
                                <CardContent>
                                    <Typography variant="h6">
                                        Graph
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item xs={6} sm={5}>
                        <Link to={{
                            pathname: '/calender'
                        }} className={classes.LinkATag}>
                            <Card className={classes.card}>
                                <CardMedia
                                    component="img"
                                    image="png/calender.png"
                                />
                                <CardContent>
                                    <Typography variant="h6">
                                        Calender
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
export default Main;