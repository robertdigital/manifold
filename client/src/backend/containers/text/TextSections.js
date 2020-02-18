import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import lh from "helpers/linkHandler";
import { entityStoreActions } from "actions";
import EntitiesList, {
  Button,
  TextSectionRow
} from "backend/components/list/EntitiesList";
import { sectionsAPI, requests } from "api";

const { request } = entityStoreActions;

export default class TextTextSectionsContainer extends PureComponent {
  static propTypes = {
    text: PropTypes.object,
    dispatch: PropTypes.func,
    refresh: PropTypes.func
  };

  get textSections() {
    return this.text.relationships.textSections;
  }

  get text() {
    return this.props.text;
  }

  updateTextSection(id, changes, options = {}) {
    const updateRequest = request(
      sectionsAPI.update(id, changes),
      requests.beTextSectionUpdate,
      options
    );
    const { promise } = this.props.dispatch(updateRequest);
    return promise;
  }

  handleOrderChange = result => {
    const changes = { attributes: { position: result.position } };
    this.updateTextSection(result.id, changes).then(() => {
      this.props.refresh();
    });
  };

  render() {
    return (
      <EntitiesList
        entityComponentProps={{ text: this.text }}
        entityComponent={TextSectionRow}
        title="Manage Text Sections"
        titleStyle="bar"
        entities={this.textSections}
        // callbacks={{
        //   onReorder: this.handleOrderChange
        // }}
        buttons={[
          <Button
            path={lh.link("backendTextTextSectionNew", this.text.id)}
            type="add"
            text="Create a New Section"
            authorizedFor="text"
          />
        ]}
      />
    );
  }
}
