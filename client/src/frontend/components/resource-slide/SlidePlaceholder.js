import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon } from "global/components/svg";

export default class ResourceListSlidePlaceholder extends Component {
  static displayName = "ResourceSlide.Placeholder";

  static propTypes = {};

  componentDidMount() {
    if (!this._figure) return null;
    const parentWidth = this._figure.parentNode.offsetWidth;
    this._figure.style.width = parentWidth + "px";
  }

  render() {
    return (
      <figure>
        <div
          ref={c => {
            this._figure = c;
          }}
          className="figure-default"
          style={{
            backgroundImage: "url(/static/images/resource-collection.jpg)"
          }}
        >
          <div className="resource-info">
            <i className="manicon" aria-hidden="true">
              <Icon.ResourceCollection size={120} />
            </i>
            <span className="resource-type">
              {"This collection has no resources"}
            </span>
          </div>
        </div>
      </figure>
    );
  }
}