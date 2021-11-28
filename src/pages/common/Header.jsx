import React from "react";
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import GoogleLogin from "react-google-login";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    LinkATag: {
        textDecoration: 'none',
        color: "white"
    },
}));

const responseGoogle = (response) => {
    console.log(response);
}

const successGoogle = (response) => {
    const uid = response.getAuthResponse().id_token;

    localStorage.setItem('uid', uid);
}


const Header = () => {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Link to="/" className={classes.LinkATag}>運動自動認識フィットネスアプリ</Link>
                </Typography>
                <GoogleLogin clientId={process.env.REACT_APP_CLIENT_ID}
                             buttonText="Login"
                             onSuccess={successGoogle}
                             onFailure={responseGoogle}
                             isSignedIn={true}
                             cookiePolicy={'single_host_origin'}
                             />
            </Toolbar>
        </AppBar>
    );
}
export default Header;