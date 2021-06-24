import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Default from './pages/Default';

import ScrollToTop from "./script/ScrollToTop";

class App extends React.Component{
  render() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <ScrollToTop>
                <Switch>
                    <Route path="/" component={Default} />
                </Switch>
            </ScrollToTop>
        </BrowserRouter>
    );
  }
}

export default App;
