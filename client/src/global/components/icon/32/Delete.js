import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class Delete extends Component {
  static propTypes = {
    iconClass: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    stroke: PropTypes.string,
    fill: PropTypes.string,
    svgProps: PropTypes.object
  };

  static defaultProps = {
    iconClass: "",
    size: "inherit",
    stroke: "currentColor",
    fill: "currentColor",
    svgProps: {}
  };

  get defaultHeight() {
    return 32;
  }

  get defaultWidth() {
    return 32;
  }

  get size() {
    return this.props.size;
  }

  get width() {
    if (this.size === null || this.size === "inherit") return null;
    if (this.size === "default") return this.defaultWidth;
    return this.size;
  }

  get height() {
    if (this.size === null || this.size === "inherit") return null;
    if (this.size === "default") return this.defaultHeight;
    return this.size;
  }

  get viewBox() {
    return "0 0 32 32";
  }

  get classes() {
    const { iconClass } = this.props;
    return classnames("manicon-svg", iconClass);
  }

  get fill() {
    return this.props.fill;
  }

  get stroke() {
    return this.props.stroke;
  }

  render() {
    const baseSvgProps = {
      xmlns: "http://www.w3.org/2000/svg",
      className: this.classes,
      width: this.width,
      height: this.height,
      viewBox: this.viewBox
    };

    const svgProps = Object.assign(baseSvgProps, this.props.svgProps);

    return (
      <svg {...svgProps}>
        <g fill="none" fillRule="evenodd">
          <path
            fill={this.fill}
            fillRule="nonzero"
            d="M22.5006476,10.9603607 L23.4993524,11.0112392 L22.8010808,24.6917831 C22.8222428,25.6607758 22.05432,26.4636781 21.074,26.4858 L10.9146542,26.4856713 C9.94567997,26.4636781 9.17775722,25.6607758 9.19944755,24.7281393 L8.50064755,11.0112392 L9.49935241,10.9603607 L10.1986808,24.713617 C10.1895701,25.1307915 10.5201792,25.4764602 10.926,25.4858 L21.0626542,25.4859288 C21.4798208,25.4764602 21.8104299,25.1307915 21.8018476,24.6772608 L22.5006476,10.9603607 Z M5.99999997,11.4266 L5.99999997,10.4266 L26,10.4266 L26,11.4266 L5.99999997,11.4266 Z M12.75,10.9266 L11.75,10.9266 L11.7501673,6.81953297 C11.732004,6.11756111 12.2857775,5.53349733 13.0014,5.51409997 L19.0122785,5.5142871 C19.7142225,5.53349733 20.267996,6.11756111 20.25,6.80659997 L20.25,10.9266 L19.25,10.9266 L19.2501673,6.79366698 C19.2540602,6.64321292 19.1353696,6.51803017 18.9986,6.51409997 L13.0150785,6.51391283 C12.8646304,6.51803017 12.7459398,6.64321292 12.75,6.80659997 L12.75,10.9266 Z M13.5,14.7217 L14.5,14.7217 L14.5,22.25 L13.5,22.25 L13.5,14.7217 Z M17.5,14.7217 L18.5,14.7217 L18.5,22.25 L17.5,22.25 L17.5,14.7217 Z"
          />
          <path
            fill={this.fill}
            fillRule="nonzero"
            d="M22.5006476,10.9603607 L23.4993524,11.0112392 L22.8010808,24.6917831 C22.8222428,25.6607758 22.05432,26.4636781 21.074,26.4858 L10.9146542,26.4856713 C9.94567997,26.4636781 9.17775722,25.6607758 9.19944755,24.7281393 L8.50064755,11.0112392 L9.49935241,10.9603607 L10.1986808,24.713617 C10.1895701,25.1307915 10.5201792,25.4764602 10.926,25.4858 L21.0626542,25.4859288 C21.4798208,25.4764602 21.8104299,25.1307915 21.8018476,24.6772608 L22.5006476,10.9603607 Z M5.99999997,11.4266 L5.99999997,10.4266 L26,10.4266 L26,11.4266 L5.99999997,11.4266 Z M12.75,10.9266 L11.75,10.9266 L11.7501673,6.81953297 C11.732004,6.11756111 12.2857775,5.53349733 13.0014,5.51409997 L19.0122785,5.5142871 C19.7142225,5.53349733 20.267996,6.11756111 20.25,6.80659997 L20.25,10.9266 L19.25,10.9266 L19.2501673,6.79366698 C19.2540602,6.64321292 19.1353696,6.51803017 18.9986,6.51409997 L13.0150785,6.51391283 C12.8646304,6.51803017 12.7459398,6.64321292 12.75,6.80659997 L12.75,10.9266 Z M13.5,14.7217 L14.5,14.7217 L14.5,22.25 L13.5,22.25 L13.5,14.7217 Z M17.5,14.7217 L18.5,14.7217 L18.5,22.25 L17.5,22.25 L17.5,14.7217 Z"
          />
        </g>
      </svg>
    );
  }
}
