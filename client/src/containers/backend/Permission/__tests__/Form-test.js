import React from "react";
import renderer from "react-test-renderer";
import PermissionForm from "../Form";
import { wrapWithRouter } from "test/helpers/routing";
import { Provider } from "react-redux";
import build from "test/fixtures/build";

describe("Backend Permission Form Container", () => {
  const project = build.entity.project("1");
  const history = build.history();

  const component = renderer.create(
    wrapWithRouter(
      <Provider store={build.store()}>
        <PermissionForm
          entity={project}
          history={history}
          successUrl="http://www.dailyrowan.com"
        />
      </Provider>
    )
  );

  it("renders correctly", () => {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("doesn't render to null", () => {
    let tree = component.toJSON();
    expect(tree).not.toBe(null);
  });
});
