import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import TextSection from "backend/components/text-section";
import { select } from "utils/entityUtils";
import { sectionsAPI, requests } from "api";
import { entityStoreActions } from "actions";
import connectAndFetch from "utils/connectAndFetch";

const { request } = entityStoreActions;

export class TextSectionEditContainer extends PureComponent {
  static mapStateToProps = state => {
    return {
      textSection: select(requests.beTextSection, state.entityStore)
    };
  };

  componentDidMount() {
    this.fetchTextSection();
  }

  get textSection() {
    return this.props.textSection;
  }

  fetchTextSection() {
    const call = sectionsAPI.show(this.props.match.params.textSection);
    const textSectionRequest = request(call, requests.beTextSection);
    this.props.dispatch(textSectionRequest);
  }

  onSuccess = () => {};

  render() {
    if (!this.textSection) return null;

    const formProps = {
      onSuccess: this.onSuccess
    };

    return (
      <section className="form-section">
        <TextSection.Form
          textSection={this.textSection}
          formProps={formProps}
        />
      </section>
    );
  }
}

export default connectAndFetch(TextSectionEditContainer);
