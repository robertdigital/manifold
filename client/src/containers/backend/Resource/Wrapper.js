import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import connectAndFetch from "utils/connectAndFetch";
import { Navigation, Dialog } from "components/backend";
import { HigherOrder } from "containers/global";
import { entityStoreActions, notificationActions } from "actions";
import { select } from "utils/entityUtils";
import { resourcesAPI, requests } from "api";
import lh from "helpers/linkHandler";
import { childRoutes, RedirectIfNoChildRouteMatches } from "helpers/router";

const { request, flush } = entityStoreActions;

export class ResourceWrapperContainer extends PureComponent {
  static displayName = "Resource.Wrapper";

  static mapStateToProps = state => {
    return {
      resource: select(requests.beResource, state.entityStore)
    };
  };

  static propTypes = {
    resource: PropTypes.object,
    match: PropTypes.object,
    dispatch: PropTypes.func,
    history: PropTypes.object,
    route: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      confirmation: null
    };
  }

  componentDidMount() {
    this.fetchResource();
  }

  componentWillUnmount() {
    this.props.dispatch(flush(requests.beResource));
  }

  fetchResource = () => {
    const call = resourcesAPI.show(this.props.match.params.id);
    const resourceRequest = request(call, requests.beResource);
    this.props.dispatch(resourceRequest);
  };

  closeDialog() {
    this.setState({ confirmation: null });
  }

  doPreview = event => {
    event.preventDefault();
    const project = this.props.resource.relationships.project;
    const previewUrl = lh.link(
      "frontendProjectResource",
      project.attributes.slug,
      this.props.resource.attributes.slug
    );
    const win = window.open(previewUrl, "_blank");
    win.focus();
  };

  doDestroy = () => {
    const call = resourcesAPI.destroy(this.props.resource.id);
    const options = { removes: this.props.resource };
    const resourceRequest = request(call, requests.beResourceDestroy, options);
    this.props.dispatch(resourceRequest).promise.then(() => {
      this.notifyDestroy();
      this.redirectToProjectResources();
    });
  };

  redirectToProjectResources() {
    const projectId = this.props.resource.relationships.project.id;
    const redirectUrl = lh.link("backendProjectResources", projectId);
    this.props.history.push(redirectUrl);
  }

  notifyDestroy() {
    const notification = {
      level: 0,
      id: `RESOURCE_DESTROYED_${this.props.resource.id}`,
      heading: "The resource has been destroyed.",
      body: `${
        this.props.resource.attributes.title
      } has passed into the endless night.`,
      expiration: 5000
    };
    this.props.dispatch(notificationActions.addNotification(notification));
  }

  handleResourceDestroy = event => {
    const heading = "Are you sure you want to delete this resource?";
    const message = "This action cannot be undone.";
    new Promise((resolve, reject) => {
      this.setState({
        confirmation: { resolve, reject, heading, message }
      });
    }).then(
      () => {
        this.doDestroy(event);
        this.closeDialog();
      },
      () => {
        this.closeDialog();
      }
    );
  };

  secondaryNavigationLinks(resource, kind) {
    const externalVideo = resource.attributes.externalVideo;
    const project = resource.relationships.project;
    const out = [
      {
        path: lh.link("backendResourceGeneral", resource.id),
        label: "General",
        key: "general",
        entity: project,
        ability: "update"
      },
      {
        path: lh.link("backendResourceMetadata", resource.id),
        label: "Metadata",
        key: "metadata",
        entity: project,
        ability: "updateResources"
      }
    ];
    if (
      kind === "image" ||
      kind === "audio" ||
      kind === "pdf" ||
      kind === "interactive" ||
      (kind === "video" && !externalVideo)
    ) {
      out.splice(1, 0, {
        path: lh.link("backendResourceVariants", resource.id),
        label: "Variants",
        key: "variants",
        entity: project,
        ability: "update"
      });
    }
    return out;
  }

  renderUtility(resource) {
    return (
      <div>
        <button onClick={this.doPreview} className="button-bare-primary">
          Preview <i className="manicon manicon-eye-outline" />
        </button>
        <HigherOrder.Authorize entity={resource} ability={"delete"}>
          <button
            onClick={this.handleResourceDestroy}
            className="button-bare-primary"
          >
            Delete <i className="manicon manicon-trashcan" />
          </button>
        </HigherOrder.Authorize>
      </div>
    );
  }

  renderRoutes() {
    const { resource } = this.props;
    return childRoutes(this.props.route, { childProps: { resource } });
  }

  render() {
    /* eslint-disable no-unused-vars */
    const { resource, match } = this.props;
    /* eslint-enable no-unused-vars */
    if (!resource) return null;

    return (
      <HigherOrder.Authorize
        entity={resource}
        failureFatalError={{
          detail: "You are not allowed to edit this resource."
        }}
        ability="update"
      >
        <RedirectIfNoChildRouteMatches
          entity={resource}
          successBehavior="show"
          ability={"updateLimitedToResourceMetadata"}
          route={this.props.route}
          to={lh.link("backendResourceMetadata", resource.id)}
        />
        <RedirectIfNoChildRouteMatches
          entity={resource}
          successBehavior="hide"
          ability={"updateLimitedToResourceMetadata"}
          route={this.props.route}
          to={lh.link("backendResourceGeneral", resource.id)}
        />
        {this.state.confirmation ? (
          <Dialog.Confirm {...this.state.confirmation} />
        ) : null}
        <Navigation.DetailHeader
          type="resource"
          breadcrumb={[
            { path: lh.link("backend"), label: "ALL PROJECTS" },
            {
              path: lh.link(
                "backendProjectResources",
                resource.relationships.project.id
              ),
              label: resource.relationships.project.attributes.title
            }
          ]}
          utility={this.renderUtility(resource)}
          title={resource.attributes.titleFormatted}
          titleHtml
          subtitle={resource.attributes.subtitle}
        />
        <section className="backend-panel">
          <aside className="scrollable">
            <div className="wrapper">
              <Navigation.Secondary
                links={this.secondaryNavigationLinks(
                  resource,
                  resource.attributes.kind
                )}
              />
            </div>
          </aside>
          <div className="container">
            <aside className="aside">
              <Navigation.Secondary
                links={this.secondaryNavigationLinks(
                  resource,
                  resource.attributes.kind
                )}
              />
            </aside>
            <div className="panel">{this.renderRoutes()}</div>
          </div>
        </section>
      </HigherOrder.Authorize>
    );
  }
}

export default connectAndFetch(ResourceWrapperContainer);
