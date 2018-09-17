import { Component } from "react";
import PropTypes from "prop-types";
import { getArticle } from "../api";

export default class Article extends Component {
  static propTypes = {
    articleId: PropTypes.string.isRequired,
    teamId: PropTypes.string.isRequired
  };

  state = {
    article: null
  };

  componentDidMount() {
    const { teamId, articleId } = this.props;
    getArticle(teamId, articleId).then(article => this.setState({ article }));
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.teamId !== nextProps.teamId ||
      this.props.articleId !== nextProps.articleId
    ) {
      getArticle(nextProps.teamId, nextProps.articleId).then(article =>
        this.setState({ article })
      );
    }
  }

  //   render() {
  //     const { article } = this.state;
  //     if (!article) return <Loading />;
  //     const { title, body } = article;
  //     return (
  //       <div style={{ padding: 20, paddingTop: 0 }}>
  //         <h3>{title}</h3>
  //         <p>{body}</p>
  //       </div>
  //     );
  //   }

  render() {
    return this.props.children(this.state.article);
  }
}
