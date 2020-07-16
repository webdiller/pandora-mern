import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";

import { Auth, Profile, Main, Categories, Advanced, ChatPage, Transactions, Settings } from "pages";
import { Header, Footer } from "./components";

const App = props => {
  const { isAuth } = props;
  return (
    <div className="wrapper">
      <Header/>
      <Switch>
        <Route
          exact
          path={["/signin", "/signup", "/signup/verify"]}
          component={Auth}
        />
        <Route
          path="/main"
          component={Main}
        />
        <Route
          path="/categories"
          component={Categories}
        />
        <Route
          path="/advanced"
          component={Advanced}
        />
        <Route
          path="/profile"
          render={() => (isAuth ? <Profile /> : <Redirect to="/main" />)}
        />
        <Route
          path="/transactions"
          render={() => (isAuth ? <Transactions /> : <Redirect to="/main" />)}
        />
        <Route
          path="/settings"
          render={() => (isAuth ? <Settings /> : <Redirect to="/main" />)}
        />
        <Route
          path="/"
          render={() => (isAuth ? <ChatPage /> : <Redirect to="/main" />)}
        />
      </Switch>
      <Footer/>
    </div>
  );
};

export default connect(({ user }) => ({ isAuth: user.isAuth }))(App);
