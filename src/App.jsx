import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NamesLoL from './components/NamesLoL';
import Navigation from './components/Navigation';

const theme = createTheme({
  palette: {
    mode: 'dark',
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
  <ThemeProvider theme={theme}>
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
  </ThemeProvider>
);

export default App;
