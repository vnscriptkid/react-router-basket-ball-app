import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { getTeamsArticles } from "../api";
import Sidebar from "./Sidebar";
import Article from "./Article";
import Loading from "./Loading";

export default class Articles extends Component {
  state = {
    articles: [],
    article: null,
    loading: true
  };

  componentDidMount() {
    const { teamId } = this.props.match.params;
    Promise.all([getTeamsArticles(teamId)]).then(([articles]) =>
      this.setState({
        articles,
        loading: false
      })
    );
  }

  static propTypes = {
    match: PropTypes.object.isRequired
  };

  render() {
    const { match } = this.props;
    const { teamId } = match.params;
    const { articles, loading } = this.state;
    console.log(articles);
    return (
      <div className="clearfix">
        <div style={{ width: "30%", float: "left" }}>
          <Sidebar
            title="Articles"
            list={articles.map(a => a.title)}
            loading={loading}
            {...this.props}
          />
        </div>

        <Route
          path={`${match.url}/:articleId`}
          render={({ match }) => {
            return (
              <div style={{ width: "70%", float: "left" }}>
                <Article teamId={teamId} articleId={match.params.articleId}>
                  {article =>
                    !article ? (
                      <Loading />
                    ) : (
                      <div style={{ padding: 20, paddingTop: 0 }}>
                        <h3>{article.title}</h3>
                        <p>{article.body}</p>
                      </div>
                    )
                  }
                </Article>
              </div>
            );
          }}
        />
      </div>
    );
  }
}
