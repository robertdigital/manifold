import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import connectAndFetch from "utils/connectAndFetch";
import lh from "helpers/linkHandler";
import General from "./General";

class FeaturesNewContainer extends PureComponent {
  static displayName = "Features.New";

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    sessionName: PropTypes.string.isRequired
  };

  redirectToFeature(feature) {
    const path = lh.link("backendContentFeatureGeneral", feature.id);
    this.props.history.push(path);
  }

  handleSuccess = feature => {
    this.redirectToFeature(feature);
  };

  render() {
    return (
      <General
        onSuccess={this.handleSuccess}
        sessionName={this.props.sessionName}
      />
    );
  }
}

export default connectAndFetch(FeaturesNewContainer);
