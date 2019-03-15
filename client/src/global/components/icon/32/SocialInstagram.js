import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class SocialInstagram extends Component {
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
            d="M28.9218,10.64 C28.9001719,9.56153843 28.6958428,8.49455039 28.3175,7.48439997 C27.6421919,5.73816193 26.2617381,4.35770811 24.5155,3.68239996 C23.5053873,3.30405953 22.4384268,3.09976305 21.36,3.07819996 C19.9733,3.01489996 19.5306,2.99999996 16,2.99999996 C12.4694,2.99999996 12.0267,3.01489996 10.64,3.07819996 C9.56153377,3.09978379 8.49453834,3.3041143 7.48439997,3.68249996 C5.73816193,4.35780811 4.35770811,5.73826193 3.68239996,7.48449997 C3.30410244,8.49462477 3.09980738,9.56157788 3.07819996,10.64 C3.01499996,12.0267 2.99999996,12.4694 2.99999996,16 C2.99999996,19.5306 3.01499996,19.9733 3.07819996,21.36 C3.09981878,22.4384951 3.30414798,23.5055175 3.68249996,24.5157 C4.35780811,26.2619381 5.73826193,27.6423919 7.48449997,28.3177 C8.49465039,28.6960428 9.56163843,28.9003719 10.6401,28.922 C12.0267,28.985 12.4694,29 16,29 C19.5306,29 19.9733,28.985 21.36,28.9218 C22.4384616,28.9001719 23.5054496,28.6958428 24.5156,28.3175 C26.2618381,27.6421919 27.6422919,26.2617381 28.3176,24.5155 C28.695952,23.5053175 28.9002812,22.4382951 28.9219,21.3598 C28.985,19.9733 29,19.5306 29,16 C29,12.4694 28.985,12.0267 28.9218,10.64 Z M26.5818,21.253 C26.5720717,22.0773419 26.4206656,22.8938725 26.1342,23.6669 C25.6969027,24.8006614 24.8008259,25.6968108 23.6671,26.1342 C22.8939933,26.4205041 22.077458,26.5719048 21.2531,26.5818 C19.8825,26.6443 19.4714,26.6575 16,26.6575 C12.5286,26.6575 12.1175,26.6443 10.7469,26.5818 C9.92254195,26.5719048 9.10600673,26.4205041 8.33289998,26.1342 C7.1991943,25.6968333 6.30312075,24.8007234 5.86579997,23.667 C5.57933439,22.8939725 5.42792833,22.0774419 5.41819997,21.2531 C5.35559997,19.8823 5.34229997,19.4712 5.34229997,16 C5.34229997,12.5288 5.35559997,12.1177 5.41819997,10.7469 C5.42790848,9.92255619 5.57931517,9.10602223 5.86579997,8.33299998 C6.30306715,7.1992417 7.19915942,6.3031131 8.33289998,5.86579997 C9.10595361,5.57929093 9.92251884,5.42785089 10.7469,5.41809997 C12.1177,5.35559997 12.5289,5.34229997 16,5.34229997 C19.4711,5.34229997 19.8823,5.35559997 21.2531,5.41809997 C22.0774812,5.42785089 22.8940464,5.57929093 23.6671,5.86579997 C24.8008406,6.3031131 25.6969329,7.1992417 26.1342,8.33299998 C26.4206848,9.10602223 26.5720915,9.92255619 26.5818,10.7469 C26.6444,12.1177 26.6577,12.5288 26.6577,16 C26.6577,19.4712 26.6444,19.8823 26.5818,21.2531 L26.5818,21.253 Z M16,9.32429998 C12.3131127,9.32429998 9.32429998,12.3131127 9.32429998,16 C9.32429998,19.6868873 12.3131127,22.6757 16,22.6757 C19.6868873,22.6757 22.6757,19.6868873 22.6757,16 C22.6757,14.2294943 21.9723694,12.5315039 20.7204328,11.2795672 C19.4684961,10.0276306 17.7705057,9.32429998 16,9.32429998 Z M16,20.3333 C13.6067845,20.3333 11.6667,18.3932155 11.6667,16 C11.6667,13.6067845 13.6067845,11.6667 16,11.6667 C18.3932155,11.6667 20.3333,13.6067845 20.3333,16 C20.3333,17.1492626 19.8767572,18.2514544 19.0641058,19.0641058 C18.2514544,19.8767572 17.1492626,20.3333 16,20.3333 Z M22.9395,10.6205 C23.8010642,10.6205 24.4995,9.92206419 24.4995,9.06049998 C24.4995,8.19893577 23.8010642,7.50049997 22.9395,7.50049997 C22.0779358,7.50049997 21.3795,8.19893577 21.3795,9.06049998 C21.3795,9.92206419 22.0779358,10.6205 22.9395,10.6205 Z"
          />
          <path
            fill={this.fill}
            fillRule="nonzero"
            d="M28.9218,10.64 C28.9001719,9.56153843 28.6958428,8.49455039 28.3175,7.48439997 C27.6421919,5.73816193 26.2617381,4.35770811 24.5155,3.68239996 C23.5053873,3.30405953 22.4384268,3.09976305 21.36,3.07819996 C19.9733,3.01489996 19.5306,2.99999996 16,2.99999996 C12.4694,2.99999996 12.0267,3.01489996 10.64,3.07819996 C9.56153377,3.09978379 8.49453834,3.3041143 7.48439997,3.68249996 C5.73816193,4.35780811 4.35770811,5.73826193 3.68239996,7.48449997 C3.30410244,8.49462477 3.09980738,9.56157788 3.07819996,10.64 C3.01499996,12.0267 2.99999996,12.4694 2.99999996,16 C2.99999996,19.5306 3.01499996,19.9733 3.07819996,21.36 C3.09981878,22.4384951 3.30414798,23.5055175 3.68249996,24.5157 C4.35780811,26.2619381 5.73826193,27.6423919 7.48449997,28.3177 C8.49465039,28.6960428 9.56163843,28.9003719 10.6401,28.922 C12.0267,28.985 12.4694,29 16,29 C19.5306,29 19.9733,28.985 21.36,28.9218 C22.4384616,28.9001719 23.5054496,28.6958428 24.5156,28.3175 C26.2618381,27.6421919 27.6422919,26.2617381 28.3176,24.5155 C28.695952,23.5053175 28.9002812,22.4382951 28.9219,21.3598 C28.985,19.9733 29,19.5306 29,16 C29,12.4694 28.985,12.0267 28.9218,10.64 Z M26.5818,21.253 C26.5720717,22.0773419 26.4206656,22.8938725 26.1342,23.6669 C25.6969027,24.8006614 24.8008259,25.6968108 23.6671,26.1342 C22.8939933,26.4205041 22.077458,26.5719048 21.2531,26.5818 C19.8825,26.6443 19.4714,26.6575 16,26.6575 C12.5286,26.6575 12.1175,26.6443 10.7469,26.5818 C9.92254195,26.5719048 9.10600673,26.4205041 8.33289998,26.1342 C7.1991943,25.6968333 6.30312075,24.8007234 5.86579997,23.667 C5.57933439,22.8939725 5.42792833,22.0774419 5.41819997,21.2531 C5.35559997,19.8823 5.34229997,19.4712 5.34229997,16 C5.34229997,12.5288 5.35559997,12.1177 5.41819997,10.7469 C5.42790848,9.92255619 5.57931517,9.10602223 5.86579997,8.33299998 C6.30306715,7.1992417 7.19915942,6.3031131 8.33289998,5.86579997 C9.10595361,5.57929093 9.92251884,5.42785089 10.7469,5.41809997 C12.1177,5.35559997 12.5289,5.34229997 16,5.34229997 C19.4711,5.34229997 19.8823,5.35559997 21.2531,5.41809997 C22.0774812,5.42785089 22.8940464,5.57929093 23.6671,5.86579997 C24.8008406,6.3031131 25.6969329,7.1992417 26.1342,8.33299998 C26.4206848,9.10602223 26.5720915,9.92255619 26.5818,10.7469 C26.6444,12.1177 26.6577,12.5288 26.6577,16 C26.6577,19.4712 26.6444,19.8823 26.5818,21.2531 L26.5818,21.253 Z M16,9.32429998 C12.3131127,9.32429998 9.32429998,12.3131127 9.32429998,16 C9.32429998,19.6868873 12.3131127,22.6757 16,22.6757 C19.6868873,22.6757 22.6757,19.6868873 22.6757,16 C22.6757,14.2294943 21.9723694,12.5315039 20.7204328,11.2795672 C19.4684961,10.0276306 17.7705057,9.32429998 16,9.32429998 Z M16,20.3333 C13.6067845,20.3333 11.6667,18.3932155 11.6667,16 C11.6667,13.6067845 13.6067845,11.6667 16,11.6667 C18.3932155,11.6667 20.3333,13.6067845 20.3333,16 C20.3333,17.1492626 19.8767572,18.2514544 19.0641058,19.0641058 C18.2514544,19.8767572 17.1492626,20.3333 16,20.3333 Z M22.9395,10.6205 C23.8010642,10.6205 24.4995,9.92206419 24.4995,9.06049998 C24.4995,8.19893577 23.8010642,7.50049997 22.9395,7.50049997 C22.0779358,7.50049997 21.3795,8.19893577 21.3795,9.06049998 C21.3795,9.92206419 22.0779358,10.6205 22.9395,10.6205 Z"
          />
        </g>
      </svg>
    );
  }
}
