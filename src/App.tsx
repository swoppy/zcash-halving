import React from 'react';
import './app.css';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider, GlobalThemeStore } from './ui/themes';
import { Home } from './pages/home/home';
import { observer } from 'mobx-react';

const history = createBrowserHistory();
export const App = observer(() => {
  return (
    <ThemeProvider value={GlobalThemeStore.get()}>
      <Router history={history}>
        <Switch>
          <Route path={'/'} exact component={Home}/>        
        </Switch>
      </Router>
    </ThemeProvider>
  );
});
