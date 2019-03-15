import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class Search extends Component {
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
    return 24;
  }

  get defaultWidth() {
    return 24;
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
    return "0 0 24 24";
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
            d="M17.2889014,10.6195617 C17.2839217,6.95430583 14.3097589,3.98705352 10.6445013,3.99059997 C7.95568906,3.99060722 5.53192873,5.61113882 4.50441299,8.09587682 C3.47689725,10.5806148 4.04819924,13.439697 5.95168673,15.3387617 C7.85517422,17.2378265 10.7155776,17.8024761 13.1979187,16.7691832 C15.6802598,15.7358902 17.2951488,13.3083668 17.2889014,10.6195617 Z M13.5822121,17.6923942 C10.7262721,18.8812005 7.43537032,18.2315695 5.24540286,16.0466905 C3.0554354,13.8618114 2.39815094,10.5724297 3.58031055,7.71373198 C4.76247015,4.85503425 7.55101291,2.99060831 10.6440162,2.9906002 C14.8608427,2.98651979 18.2830402,6.40068547 18.2888992,10.6174795 C18.2959898,13.7108608 16.438078,16.5036188 13.5822121,17.6923942 Z M15.3221279,15.9910252 L16.0328722,15.2875748 L20.9997722,20.3059748 L20.2890279,21.0094253 L15.3221279,15.9910252 Z"
          />
          <path
            fill={this.fill}
            fillRule="nonzero"
            d="M17.2889014,10.6195617 C17.2839217,6.95430583 14.3097589,3.98705352 10.6445013,3.99059997 C7.95568906,3.99060722 5.53192873,5.61113882 4.50441299,8.09587682 C3.47689725,10.5806148 4.04819924,13.439697 5.95168673,15.3387617 C7.85517422,17.2378265 10.7155776,17.8024761 13.1979187,16.7691832 C15.6802598,15.7358902 17.2951488,13.3083668 17.2889014,10.6195617 Z M13.5822121,17.6923942 C10.7262721,18.8812005 7.43537032,18.2315695 5.24540286,16.0466905 C3.0554354,13.8618114 2.39815094,10.5724297 3.58031055,7.71373198 C4.76247015,4.85503425 7.55101291,2.99060831 10.6440162,2.9906002 C14.8608427,2.98651979 18.2830402,6.40068547 18.2888992,10.6174795 C18.2959898,13.7108608 16.438078,16.5036188 13.5822121,17.6923942 Z M15.3221279,15.9910252 L16.0328722,15.2875748 L20.9997722,20.3059748 L20.2890279,21.0094253 L15.3221279,15.9910252 Z"
          />
        </g>
      </svg>
    );
  }
}
