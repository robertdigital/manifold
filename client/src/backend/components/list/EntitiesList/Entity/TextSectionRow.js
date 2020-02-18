import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import lh from "helpers/linkHandler";
import EntityRow from "./Row";

export default class TextSectionRow extends PureComponent {
  static displayName = "EntitiesList.Entity.TextSectionRow";

  static propTypes = {
    entity: PropTypes.object,
    active: PropTypes.string
  };

  get textSection() {
    return this.props.entity;
  }

  get id() {
    return this.textSection.id;
  }

  get text() {
    return this.props.text;
  }

  get textId() {
    return this.text.id;
  }

  get active() {
    return this.props.active === this.id;
  }

  get name() {
    return this.textSection.attributes.name;
  }

  render() {
    return (
      <EntityRow
        {...this.props}
        onRowClick={lh.link("backendTextTextSectionEdit", this.textId, this.id)}
        rowClickMode="block"
        title={this.name}
        subtitle={`${this.id} - ${this.textSection.attributes.position}`}
        active={this.active}
      />
    );
  }
}
