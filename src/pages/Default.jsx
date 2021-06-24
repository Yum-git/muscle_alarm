import React from "react";
import {Switch, Route} from 'react-router-dom';

import Container from '@material-ui/core/Container';

// 共通部分
import Header from "./common/Header";
import Footer from "./common/Footer";

// Roting枠
import Clock from "./routing/Clock";
import Setting from "./routing/Setting";
import Alarm from "./routing/Alarm";

// scss
import "../styles/common.scss";

class Default extends React.Component{
    render() {
        return (
            <div id="app">
                <header>
                    <Header />
                </header>
                <main>
                    <Container fixed>
                        <Switch>
                            <Route exact path="/" component={Clock} />
                            <Route path="/setting" component={Setting} />
                            <Route path="/alarm" component={Alarm} />
                            <Route render={() => <p>not found!</p>} />
                        </Switch>
                    </Container>
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        );
    }
}

export default Default;