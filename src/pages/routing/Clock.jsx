import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import '../../styles/clock.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    EnablePaper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    LinkATag: {
        textDecoration: 'none',
    }
}));

const Clock = () => {
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
    const [alarm, setAlarm] = useState('Disable');
    useEffect(() => {
        setInterval(() => {
            setTime(clock);
        }, 1000);
    }, []);

    const AlarmClick = () => {
        setAlarm('Alarm!!');
    }

    return(
        <div className="Clock">
            <div className={classes.root}>
                <Grid container alignItems="center" justify="center" spacing={2}>
                    <Grid item xs={2}>
                        <Paper className={classes.EnablePaper}>
                            <p>
                                {alarm}
                            </p>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper + " " + "ClockPaper"}>
                            <h1>
                                {time}
                            </h1>
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Link to="/setting" className={classes.LinkATag}>
                            <Button color="secondary">Setting</Button>
                        </Link>
                    </Grid>
                    <Grid item xs={2}>
                        <Button color="secondary" onClick={AlarmClick}>Test Alarm</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
export default Clock;