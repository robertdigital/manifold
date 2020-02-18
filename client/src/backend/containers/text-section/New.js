import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import TextSection from "backend/components/text-section";
import connectAndFetch from "utils/connectAndFetch";

export class TextSectionNewContainer extends PureComponent {
  static mapStateToProps = state => ({});

  onSuccess = () => {};

  render() {
    const formProps = {
      onSuccess: this.onSuccess
    };

    return (
      <section className="form-section">
        <TextSection.Form text={this.props.text} formProps={formProps} />
      </section>
    );
  }
}

export default connectAndFetch(TextSectionNewContainer);
