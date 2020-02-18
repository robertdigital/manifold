import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import FormContainer from "global/containers/form";
import Form from "global/components/form";
import { sectionsAPI, requests } from "api";
import cloneDeep from "lodash/cloneDeep";

export default class TextSectionForm extends PureComponent {
  static displayName = "TextSection.Form";

  static propTypes = {
    text: PropTypes.object,
    formProps: PropTypes.object,
    textSection: PropTypes.object
  };

  static defaultProps = {
    formProps: {}
  };

  get textId() {
    return this.props.text.id;
  }

  get textSection() {
    if (!this.props.textSection)
      return { attributes: { kind: "section", position: "top" } };

    return this.props.textSection;
  }

  get kindOptions() {
    return [
      { label: "Section", value: "section" },
      { label: "Cover", value: "cover_image" },
      { label: "Navigation", value: "navigation" }
    ];
  }

  onCreate = _data => {
    const data = cloneDeep(_data);
    if (!data.relationships) data.relationships = {};
    data.relationships.text = {
      data: {
        type: "texts",
        id: this.props.text.id
      }
    };

    return sectionsAPI.create(data);
  };

  onUpdate = data => {
    return sectionsAPI.update(data);
  };

  render() {
    const name = this.textSection
      ? requests.beTextSectionUpdate
      : requests.beTextSectionCreate;

    return (
      <FormContainer.Form
        debug
        model={this.textSection}
        name={requests.beTextSectionCreate}
        update={sectionsAPI.update}
        create={this.onCreate}
        onSuccess={this.onSuccess}
        className="form-secondary"
        {...this.props.formProps}
      >
        <Form.TextInput
          label="Name"
          focusOnMount
          name="attributes[name]"
          placeholder="What would you like to call this text section?"
        />
        <Form.Select
          label="Section Kind"
          options={this.kindOptions}
          name="attributes[kind]"
        />{" "}
        <Form.Editor name="attributes[body]" />
        <Form.Save text="Save Text Section" />
      </FormContainer.Form>
    );
  }
}
