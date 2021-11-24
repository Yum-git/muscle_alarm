import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import {EditingState, IntegratedEditing, ViewState} from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    Toolbar,
    DateNavigator,
    Appointments,
    AppointmentForm,
    AppointmentTooltip,
    TodayButton,
    ConfirmationDialog
} from '@devexpress/dx-react-scheduler-material-ui';
import {makeStyles} from "@material-ui/core/styles";
import {useEffect, useState} from "react";
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


const now = new Date();


const Calender = () => {
    const classes = useStyles();

    const [data, setData] = useState([
        { startDate: '2010-01-01T09:45', endDate: '2010-01-01T11:00', title: 'Don`t Delete!!', id: 0 },
    ]);

    const [currentDate, setCurrentDate] = useState(now);

    const commitChanges = ({added, changed, deleted}) => {
        if(added){
            planAdd(added);
        }

        if(changed){
            let change_data = changed[Object.keys(changed)[0]];
            change_data.id = Number(Object.keys(changed)[0]);

            planChange(change_data);
        }

        if(deleted){
            planDelete(deleted);
        }

        planRead();
    }

    const planAdd = (added) => {
        axios.post("http://localhost:8000/plan", {
            "plan_name": added.title,
            "start_time": added.startDate,
            "end_time": added.endDate,
            "plan_notes": added.notes
        }, {
            headers: {
                Authorization: `Bearer aiueo`,
            }
        }).then(
            response => {
                console.log(response.data.results);
            }
        ).catch(
            err => {
                console.log(err);
            }
        );
    }

    const planChange = (changed) => {
        axios.put("http://localhost:8000/plan", {
            "id_": changed.id,
            "plan_name": changed.title,
            "start_time": changed.startDate,
            "end_time": changed.endDate,
            "plan_notes": changed.notes
        }, {
            headers: {
                Authorization: `Bearer aiueo`,
            }
        }).then(
            response => {
                console.log(response.data.results);
            }
        ).catch(
            err => {
                console.log(err);
            }
        );
    }


    const planRead = () => {
        axios.get("http://localhost:8000/plan", {
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

    const planDelete = (deleted) => {
        axios.delete("http://localhost:8000/plan", {
            data: {
                id_: deleted
            },
            headers: {
                Authorization: `Bearer aiueo`,
            }
        }).then(
            response => {
                console.log(response.data.results);
                setData(response.data.results);
            }
        ).catch(
            err => {
                console.log(err);
            }
        );
    }

    useEffect(() => {
        planRead();
    }, [])

    return(
        <div className="Graph-Container">
            <div className={classes.root}>
                <Grid container alignItems="center" justify="center" spacing={2}>
                    <Grid item xs={12} className={classes.paper}>
                        <Paper>
                            <Scheduler
                                data={data}
                                height={660}
                            >
                                <ViewState
                                    currentDate={currentDate}
                                    onCurrentDateChange={setCurrentDate}
                                />
                                <EditingState
                                    onCommitChanges={commitChanges}
                                />
                                <IntegratedEditing />
                                <WeekView />
                                <Toolbar />
                                <DateNavigator />
                                <TodayButton />
                                <ConfirmationDialog />
                                <Appointments />
                                <AppointmentTooltip
                                    showOpenButton
                                    showDeleteButton
                                />
                                <AppointmentForm />
                            </Scheduler>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
};

export default Calender;