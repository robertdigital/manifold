import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { entityStoreActions } from "actions";
import PropTypes from "prop-types";
import isArray from "lodash/isArray";

import { select, meta } from "utils/entityUtils";
import {
  projectsAPI,
  exportTargetsAPI,
  projectExportationsAPI,
  requests
} from "api";
import EntitiesList, {
  ExportationRow
} from "backend/components/list/EntitiesList";
import Form from "/global/components/form";
import FormContainer from "global/containers/form";
import lh from "helpers/linkHandler";
import Authorize from "hoc/authorize";

const { request } = entityStoreActions;

export class ProjecExportationWrapper extends PureComponent {
  static mapStateToProps = state => {
    return {
      exportations: select(requests.beExportations, state.entityStore),
      exportationsMeta: meta(requests.beExportations, state.entityStore),
      exportTargets: select(requests.beExportTargets, state.entityStore)
    };
  };

  static displayName = "Project.ExportTargets.List";

  static propTypes = {
    exportations: PropTypes.array,
    exportationsMeta: PropTypes.object,
    exportTargets: PropTypes.array,
    project: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    exportationsPerPage: PropTypes.number
  };

  static defaultProps = {
    exportationsPerPage: 5
  };

  componentDidMount() {
    this.fetchExportations(1);
    this.fetchExportTargets();
  }

  pageChangeHandlerCreator = page => {
    return () => this.fetchExportations(page);
  };

  dispatch(action) {
    this.props.dispatch(action);
  }

  fetchExportTargets() {
    const action = request(exportTargetsAPI.index(), requests.beExportTargets);
    this.dispatch(action);
  }

  fetchExportations(page) {
    const pagination = { number: page, size: this.props.exportationsPerPage };
    const action = request(
      projectsAPI.exports(this.props.project.id, {}, pagination),
      requests.beExportations
    );
    this.dispatch(action);
  }

  exportTargetSelectOptions() {
    const targets = [{ label: "", value: "", internalValue: "" }];
    const { exportTargets } = this.props;

    if (isArray(exportTargets)) {
      exportTargets.forEach(exportTarget =>
        targets.push({
          label: exportTarget.attributes.name,
          value: exportTarget.id,
          internalValue: exportTarget.id
        })
      );
    }
    return targets;
  }

  render() {
    const active = false;
    const { exportations, project, exportationsMeta } = this.props;

    if (!exportations || !exportationsMeta) return null;

    const { pagination } = exportationsMeta;

    return (
      <Authorize
        entity={project}
        ability="managePermissions"
        failureNotification
        failureRedirect={lh.link("backendProject", project.id)}
      >
        <section>
          <FormContainer.Form
            className="form-secondary"
            name="name"
            model={{
              attributes: {
                project_id: project.id,
                export_target_id: ""
              }
            }}
            update={() => null}
            create={projectExportationsAPI.create}
            onSuccess={() => this.fetchExportations(1)}
            doNotWarn
          >
            <Form.FieldGroup label="New Project Export" horizontal>
              <Form.Select
                name="attributes[export_target_id]"
                label="Export Target for the Export"
                options={this.exportTargetSelectOptions()}
              />
              <Form.Save text="Export" wide={false} />
            </Form.FieldGroup>
          </FormContainer.Form>
        </section>
        <EntitiesList
          entityComponent={ExportationRow}
          entityComponentProps={{ active }}
          title="Project Exportations History"
          titleStyle="section"
          showCount
          pagination={pagination}
          callbacks={{
            onPageClick: this.pageChangeHandlerCreator
          }}
          entities={exportations}
          unit="export targets"
        />
      </Authorize>
    );
  }
}

export default connect(ProjecExportationWrapper.mapStateToProps)(
  ProjecExportationWrapper
);
