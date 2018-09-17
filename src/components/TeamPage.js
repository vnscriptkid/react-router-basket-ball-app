import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { getTeamsArticles, getTeam, getTeamNames } from "../api";
import TeamLogo from "./TeamLogo";

export default class TeamPage extends Component {
  state = {
    articles: [],
    team: null,
    teamNames: [],
    loading: true
  };

  componentDidMount() {
    const teamId = this.props.match.params.teamId;
    // getTeamsArticles(teamId).then(articles => this.setState({ articles }));

    Promise.all([
      getTeamsArticles(teamId),
      getTeam(teamId),
      getTeamNames()
    ]).then(([articles, team, teamNames]) =>
      this.setState({ articles, team, teamNames, loading: false })
    );
  }

  render() {
    const { match } = this.props;
    const { teamId } = match.params;
    const { articles, team, loading, teamNames } = this.state;

    if (loading) return <h3>Loading...</h3>;

    if (teamNames.indexOf(teamId) === -1) {
      return <Redirect to="/" />;
    }

    console.log(articles);
    const {
      name,
      championships,
      established,
      manager,
      coach,
      record,
      wins,
      losses
    } = team;

    return (
      <div style={{ textAlign: "center" }}>
        <TeamLogo id={teamId} />
        <h2>{name}</h2>
        <h5>View Roster</h5>

        <p>
          {championships.map(c => (
            <span key={c} style={{ marginLeft: 10 }}>
              {c}
            </span>
          ))}
        </p>

        <div className="clearfix">
          <div style={{ width: "25%", float: "left" }}>
            <h3>Established</h3>
            <span>{established}</span>
          </div>
          <div style={{ width: "25%", float: "left" }}>
            <h3>Manager</h3>
            <span>{manager}</span>
          </div>
          <div style={{ width: "25%", float: "left" }}>
            <h3>Coach</h3>
            <span>{coach}</span>
          </div>
          <div style={{ width: "25%", float: "left" }}>
            <h3>Record</h3>
            <span>
              {wins}-{losses}
            </span>
          </div>
        </div>

        <h3>Articles</h3>
        <div style={{ width: "50%", margin: "0 auto", textAlign: "left" }}>
          {articles.map(({ title, date }) => (
            <div key={title} style={{ marginBottom: 10 }}>
              <Link to={`${match.url}/articles`}>
                <h4 style={{ margin: 0 }}>{title}</h4>
              </Link>
              <p style={{ margin: 0 }}>
                {date.getMonth()}/{date.getDate()}/{date.getFullYear()}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
