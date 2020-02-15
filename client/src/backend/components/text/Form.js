import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import FormContainer from "global/containers/form";
import Form from "../../../global/components/form";

export default class TextFormWrapper extends PureComponent {
  static displayName = "Text.Form.Wrapper";

  static propTypes = {};

  createText = () => {};

  render() {
    /* eslint-disable no-unused-vars */
    const { ingestion, onSuccess } = this.props;
    /* eslint-enable no-unused-vars */

    return (
      <FormContainer.Form
        doNotWarn
        groupErrors
        model={{}}
        name={"newText"}
        update={this.createText}
        create={this.createText}
        className="form-secondary"
        onSuccess={this.props.onSuccess}
      >
        <Form.TextInput label="Title" focusOnMount />
      </FormContainer.Form>
    );
  }
}
