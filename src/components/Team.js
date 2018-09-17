import React, { Component } from "react";
import PropTypes from "prop-types";
import { getTeam } from "../api";
import TeamLogo from "./TeamLogo";
import { Link } from "react-router-dom";

export default class Team extends Component {
  state = {
    team: null
  };

  static propTypes = {
    teamId: PropTypes.string.isRequired
  };

  componentWillMount() {
    console.log("team will mount");
  }

  componentWillUnmount() {
    console.log("team will unmount");
  }

  componentDidMount() {
    const { teamId } = this.props;
    getTeam(teamId).then(team => this.setState({ team }));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.teamId !== nextProps.teamId) {
      this.setState({ team: null });
      getTeam(nextProps.teamId).then(team => this.setState({ team }));
    }
  }

  render() {
    const { team } = this.state;
    if (!team) return <h3>Loading!</h3>;

    const { name, established, manager, coach } = team;
    return (
      <div style={{ textAlign: "center" }}>
        <TeamLogo id={this.props.teamId} />
        <h2>{name}</h2>
        <div className="clearfix" style={{ textAlign: "left" }}>
          <div style={{ width: "33.3333%", float: "left" }}>
            <h3>Established</h3>
            <p>{established}</p>
          </div>
          <div style={{ width: "33.3333%", float: "left" }}>
            <h3>Manager</h3>
            <p>{manager}</p>
          </div>
          <div style={{ width: "33.3333%", float: "left" }}>
            <h3>Coach</h3>
            <p>{coach}</p>
          </div>
        </div>

        <Link to={`/${this.props.teamId}`}>See more of {name}</Link>
      </div>
    );
  }
}
