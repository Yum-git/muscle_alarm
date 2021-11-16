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
import {useState} from "react";

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
            setData([...data, { id: data[data.length - 1].id + 1, ...added }]);
        }

        if(changed){
            setData(data.map(appointment => (changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));
        }

        if(deleted){
            setData(data.filter(appointment => appointment.id !== deleted));
        }
    }

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
                                <WeekView
                                    startDayHour={9}
                                    endDayHour={19}
                                />
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