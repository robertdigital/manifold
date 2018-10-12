import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class IconResourceCollection extends Component {
  static displayName = "Icon.ResourceCollection";

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
        <path d="M24,39 L24,45 L40,45 L40,39 L24,39 Z M42,37 L42,47 L22,47 L22,37 L42,37 Z M56,20.4707664 L47.6615077,14 L16.3394622,14 L7.99999996,20.4707998 L7.99999996,25 L56,25 L56,20.4707664 Z M58,27 L5.99999996,27 L5.99999996,19.4912002 L15.6545377,12 L48.3464923,12 L58,19.4912335 L58,27 Z M57,19 L57,21 L6.99999996,21 L6.99999996,19 L57,19 Z M54,52 L54,26 L56,26 L56,54 L7.99999996,54 L7.99999996,26 L9.99999997,26 L9.99999997,52 L54,52 Z M34.998,26.0006 L36.998,26.0006 C36.9980001,27.7862134 36.0453867,29.4361883 34.499,30.3289951 C32.9526134,31.2218018 31.0473866,31.2218018 29.501,30.3289951 C27.9546133,29.4361883 27.0019999,27.7862134 27.002,26.0006 L29.002,26.0006 C29.002,27.0716823 29.5734155,28.0614031 30.501,28.5969443 C31.4285844,29.1324854 32.5714156,29.1324854 33.499,28.5969443 C34.4265845,28.0614031 34.998,27.0716823 34.998,26.0006 Z" />
      </svg>
    );
  }
}
