import React, { Children, Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentMeta from 'react-document-meta';
import { SignInUp, LoadingBar } from 'components/global';
import config from '../../config';
import get from 'lodash/get';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { notificationActions, uiVisibilityActions } from 'actions';

const { visibilityHide } = uiVisibilityActions;

class ManifoldContainer extends Component {

  static mapStateToProps(state) {
    return {
      authentication: state.authentication,
      visibility: state.ui.visibility,
      loading: state.ui.loading.active,
      notifications: state.notifications,
      routing: state.routing
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    loading: PropTypes.bool,
    visibility: PropTypes.object,
    authentication: PropTypes.object,
    children: PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.element
    ])
  };

  componentWillReceiveProps(nextProps) {
    this.createLoginNotificationIfNeeded(this.props.authentication, nextProps.authentication);
  }

  createLoginNotificationIfNeeded(auth, nextAuth) {
    if (auth.authenticated !== nextAuth.authenticated) {
      let notification;
      if (nextAuth.authenticated === true) {
        notification = {
          level: 0,
          id: 'AUTHENTICATION_STATE_CHANGE',
          heading: "You have logged in successfully"
        };
      } else {
        notification = {
          level: 0,
          id: 'AUTHENTICATION_STATE_CHANGE',
          heading: "You have logged out successfully"
        };
      }
      this.props.dispatch(notificationActions.addNotification(notification));
      setTimeout(() => {
        this.props.dispatch(notificationActions.removeNotification(notification.id));
      }, 5000);
    }
  }

  render() {

    const hideSignInUpOverlay = bindActionCreators(
      () => visibilityHide('signInUpOverlay'), this.props.dispatch
    );

    return (
      <div className="global-container">
        <DocumentMeta {...config.app}/>
        <LoadingBar loading={this.props.loading} />
        <ReactCSSTransitionGroup
          transitionName={'overlay-login'}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          { this.props.visibility.signInUpOverlay ?
            <SignInUp.Overlay
              key="signInUpOverlay"
              hideSignInUpOverlay={hideSignInUpOverlay}
              authentication={this.props.authentication}
              dispatch={this.props.dispatch}
              hash={get(this, 'props.routing.locationBeforeTransitions.hash')}
            />
            : null}
        </ReactCSSTransitionGroup>
        {this.props.children}

      </div>
    );
  }

}

const Manifold = connect(
  ManifoldContainer.mapStateToProps
)(ManifoldContainer);

export default Manifold;
