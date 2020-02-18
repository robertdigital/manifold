import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { textsAPI } from "api";
import Text from "backend/components/text";
import Navigation from "../../../components/navigation";

export default class TextNewContainer extends PureComponent {
  static displayName = "Text.New";

  static propTypes = {
    text: PropTypes.object
  };

  render() {
    return (
      <>
        <Navigation.DrawerHeader title="Create Text" buttons={[]} />
        <Text.Form project={this.props.project} />
      </>
    );
  }
}
