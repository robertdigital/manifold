import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class IconResourcePresentation extends Component {
  static displayName = "Icon.ResourcePresentation";

  static propTypes = {
    iconClass: PropTypes.string,
    size: PropTypes.number,
    fill: PropTypes.string,
    stroke: PropTypes.string
  };

  static defaultProps = {
    size: 64,
    fill: "currentColor"
  };

  render() {
    const { iconClass, size, fill, stroke } = this.props;
    const classes = classnames("manicon-svg", iconClass);

    return (
      <svg
        className={classes}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={fill}
        stroke={stroke}
        viewBox="0 0 64 64"
      >
        <path d="M33.9966,6.17299996 L34.9966,6.17299996 C47.6052609,6.17299996 57.8266,16.3943391 57.8266,29.003 L57.8266,30.003 L33.9966,30.003 L33.9966,6.17299996 Z M35.9966,28.003 L55.8030181,28.003 C55.296872,17.2946569 46.7049431,8.70272796 35.9966,8.19658189 L35.9966,28.003 Z M30.0034,33.9965 L51.8339,33.9965 L51.8339,34.9965 C51.8339,47.6050928 41.6126671,57.8264038 29.0040743,57.8265 C16.3954815,57.8265963 6.17409249,47.6054414 6.17389996,34.9968486 C6.17370744,22.3882558 16.3947843,12.1667888 29.0033771,12.1665 L30.0034,12.1664771 L30.0034,33.9965 Z M28.0034,35.9965 L28.0034,14.1901059 C16.9637772,14.7121704 8.17372942,23.8280387 8.17389997,34.9968181 C8.17407563,46.5008473 17.5000298,55.8265879 29.004059,55.8265 C40.1728424,55.8264148 49.288512,47.0361518 49.8103176,35.9965114 L28.0034,35.9965 Z" />
      </svg>
    );
  }
}
