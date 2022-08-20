import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { createTheme, MuiThemeProvider } from '@material-ui/core';
import NamesLoL from './components/NamesLoL';
import Navigation from './components/Navigation';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: 'rgb(34,43,54)',
    },
    secondary: {
      main: 'rgb(23,28,36)',
    },
    text: {
      secondary: 'rgba(255, 255, 255, 0.85)',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route exact path='/summoners'>
          <>
            <Navigation />
            <NamesLoL />
          </>
        </Route>
        <Route path='/'>
          <Redirect to='/summoners' />
        </Route>
      </Switch>
    </Router>
  </MuiThemeProvider>
);

export default App;
