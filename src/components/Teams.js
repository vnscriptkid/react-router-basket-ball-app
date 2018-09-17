import React, { Component } from "react";
import { getTeamNames } from "../api";
import { Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Team from "./Team";

export default class Teams extends Component {
  state = {
    teamNames: [],
    loading: true
  };

  componentDidMount() {
    getTeamNames().then(teamNames =>
      this.setState({ teamNames, loading: false })
    );
  }

  render() {
    const { teamNames, loading } = this.state;
    const { location, match } = this.props;
    return (
      <div className="clearfix">
        <div style={{ width: "30%", float: "left" }}>
          <Sidebar
            title="Teams"
            loading={loading}
            list={teamNames}
            {...this.props}
          />
        </div>
        <div style={{ width: "70%", float: "left", textAlign: "center" }}>
          {!loading && location.pathname === "/teams" ? (
            <h3>Select a team to see details</h3>
          ) : null}

          <Route
            path={`${match.url}/:teamId`}
            render={({ match }) => {
              const { teamId } = match.params;
              return <Team teamId={teamId} />;
            }}
          />
        </div>
      </div>
    );
  }
}
