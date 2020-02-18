import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import FormContainer from "global/containers/form";
import Form from "global/components/form";
import { requests, textsAPI } from "api";
import cloneDeep from "lodash/cloneDeep";

export default class TextFormWrapper extends PureComponent {
  static displayName = "Text.Form.Wrapper";

  static propTypes = {};

  createText = _data => {
    const data = cloneDeep(_data);
    if (!data.relationships) data.relationships = {};
    data.relationships.project = {
      data: {
        type: "projects",
        id: this.props.project.id
      }
    };

    return textsAPI.create(data);
  };

  render() {
    /* eslint-disable no-unused-vars */
    const { ingestion, onSuccess } = this.props;
    /* eslint-enable no-unused-vars */

    return (
      <FormContainer.Form
        doNotWarn
        groupErrors
        model={{}}
        name={requests.beTextCreate}
        update={textsAPI.update}
        create={this.createText}
        className="form-secondary"
        onSuccess={this.props.onSuccess}
      >
        <Form.TextInput name="attributes[title]" label="Title" focusOnMount />
        <Form.Save text="Save" />
      </FormContainer.Form>
    );
  }
}
