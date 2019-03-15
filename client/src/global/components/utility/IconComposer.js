import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Icons from "global/components/icon";
import UniqueIcons from "global/components/icon/unique";
import endsWith from "lodash/endsWith";

import MissingIcon from "./MissingIcon";

import humps from "humps";

export default class IconComposer extends PureComponent {
  static displayName = "IconComposer";

  static propTypes = {
    icon: PropTypes.string.isRequired,
    iconClass: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fill: PropTypes.string,
    stroke: PropTypes.string,
    svgProps: PropTypes.object
  };

  static defaultProps = {
    fill: "currentColor",
    svgProps: { "aria-hidden": true }
  };

  get failure() {
    return MissingIcon;
  }

  get iconKey() {
    if (!this.props.icon) return "";
    return humps.pascalize(this.props.icon);
  }

  get iconComponent() {
    if (!this.props.icon) return this.failure;
    const key = this.iconKey;
    const source = this.iconSource(key);
    const component = source[key];
    if (!component) return this.failure;
    return component;
  }

  iconSource(key) {
    if (endsWith(key, "Unique")) return UniqueIcons;
    return Icons;
  }

  render() {
    const { iconClass, size, fill, stroke, icon } = this.props;
    const IconComponent = this.iconComponent;

    return React.createElement(IconComponent, {
      svgProps: this.props.svgProps,
      iconClass,
      icon,
      size,
      fill,
      stroke
    });
  }
}
