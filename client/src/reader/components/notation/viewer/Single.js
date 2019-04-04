import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Link from "./Link";
import Notation from "./Notation";
import IconComposer from "global/components/utility/IconComposer";

import Authorize from "hoc/authorize";

// This class represents a single notation in the margin. It's used to show the active
// notation when notations are grouped, and it's used to show a single notation in the
// reader margin.
export default class NotationViewerSingle extends PureComponent {
  static displayName = "NotationViewer.Single";

  static propTypes = {
    entry: PropTypes.object,
    active: PropTypes.bool,
    actions: PropTypes.shape({
      startDestroy: PropTypes.func,
      makeActive: PropTypes.func
    }),
    params: PropTypes.shape({
      sectionId: PropTypes.string,
      textId: PropTypes.string
    }),
    showTitle: PropTypes.bool
  };

  static defaultProps = {
    showTitle: true
  };

  render() {
    const { active, entry, actions, params } = this.props;
    if (!entry) return;
    const { annotation, notation } = entry;
    const linkClass = classNames("notation-single-link", {
      highlighted: active
    });
    const height = entry.height ? entry.height + "px" : "auto";

    return (
      <div className="notation-preview-single">
        <Authorize entity={annotation} ability="delete">
          <button
            onClick={() => actions.startDestroy(entry)}
            className="notation-delete"
          >
            <span className="screen-reader-text">Delete Notation</span>
            <IconComposer
              icon="close16"
              size="default"
              iconClass="notation-delete__icon"
            />
          </button>
        </Authorize>
        <Link notation={notation} params={params} className={linkClass}>
          <div
            style={{ maxHeight: height }}
            ref={r => {
              this.wrapperDomEl = r;
            }}
            onMouseOver={() => {
              actions.makeActive({
                annotationId: annotation.id,
                passive: false
              });
            }}
            onMouseLeave={() => {
              actions.makeActive(null);
            }}
          >
            <Notation
              notation={notation}
              additionalClasses="minimal right"
              showTitle={this.props.showTitle}
            />
          </div>
        </Link>
      </div>
    );
  }
}
