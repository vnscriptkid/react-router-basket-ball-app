import React, { Component } from "react";
import { parse } from "qs";
import { Route } from "react-router-dom";
import slug from "slug";
import Sidebar from "./Sidebar";
import { getPlayers } from "../api";

export default class Players extends Component {
  state = {
    players: [],
    loading: true
  };

  componentDidMount() {
    const { location } = this.props;
    this.fetchPlayers(parse(location.search.substr(1)).teamId);
  }

  fetchPlayers = teamId => {
    getPlayers(teamId).then(players =>
      this.setState({
        players: players,
        loading: false
      })
    );
  };

  render() {
    const { loading, players } = this.state;
    const { location, match } = this.props;
    return (
      <div className="clearfix">
        <div style={{ width: "30%", float: "left" }}>
          <Sidebar
            loading={loading}
            list={players.map(player => player.name)}
            title="Players"
            {...this.props}
          />
        </div>

        {!loading &&
          location.pathname === "/players" && (
            <div style={{ width: "70%", float: "left" }}>
              <h3 style={{ textAlign: "center" }}>Select a player</h3>
            </div>
          )}

        <Route
          path={`${match.path}/:playerSlug`}
          render={({ match }) => {
            if (loading) return null;

            const player = players.find(
              player => slug(player.name) === match.params.playerSlug
            );
            if (!player) return <h3>Slug invalid!</h3>;

            const {
              name,
              avatar,
              position,
              teamId,
              number,
              apg,
              ppg,
              rpg,
              spg
            } = player;

            return (
              <div style={{ textAlign: "center", width: "70%", float: "left" }}>
                <img
                  style={{ height: 200, width: 200, borderRadius: "50%" }}
                  src={avatar}
                  alt={name}
                />
                <h2>{name}</h2>
                <p>#{number}</p>
                <div className="clearfix" style={{ textAlign: "center" }}>
                  <div style={{ width: "50%", float: "left" }}>
                    <div>
                      <h3>Team</h3>
                      <p>{teamId}</p>
                    </div>
                    <div>
                      <h3>Position</h3>
                      <p>{position}</p>
                    </div>
                    <div>
                      <h3>PPG</h3>
                      <p>{ppg}</p>
                    </div>
                  </div>
                  <div style={{ width: "50%", float: "left" }}>
                    <div>
                      <h3>APG</h3>
                      <p>{apg}</p>
                    </div>
                    <div>
                      <h3>SPG</h3>
                      <p>{spg}</p>
                    </div>
                    <div>
                      <h3>RPG</h3>
                      <p>{rpg}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        />
      </div>
    );
  }
}
