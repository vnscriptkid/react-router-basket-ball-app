import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Loading extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  };

  static defaultProps = {
    text: "Loading"
  };

  state = {
    text: this.props.text
  };

  componentDidMount() {
    const stopper = this.state.text + "...";
    this.idInterval = setInterval(() => {
      this.state.text === stopper
        ? this.setState({ text: this.props.text })
        : this.setState({ text: this.state.text + "." });
    }, 300);
  }

  componentWillUnmount() {
    clearInterval(this.idInterval);
  }

  render() {
    return <div>{this.state.text}</div>;
  }
}
