import React from "react";
import PropTypes from "prop-types";
import { exportTargetsAPI, requests } from "api";
import { camelCase } from "lodash";
import Form from "global/components/form";
import FormContainer from "global/containers/form";

export default function ExportTargetsContainerForm(props) {
  const { model, onSuccess, options } = props;
  return (
    <FormContainer.Form
      model={model}
      name={requests.beExportTargetUpdate}
      update={exportTargetsAPI.update}
      create={exportTargetsAPI.create}
      className="form-secondary"
      notificationScope="drawer"
      onSuccess={onSuccess}
      options={options}
    >
      {getModelValue => {
        const strategy = camelCase(getModelValue("attributes[strategy]"));
        return (
          <>
            <Form.TextInput
              focusOnMount
              label="name"
              name="attributes[name]"
              placeholder="Name"
            />
            <Form.TextInput
              label="Target Name Format"
              name="attributes[configuration][targetNameFormat]"
              placeholder="%s.%e"
            />
            <Form.Select
              label="Type"
              name="attributes[strategy]"
              options={[
                {
                  label: "SFTP with Key Authentication",
                  value: "sftp_key"
                },
                {
                  label: "SFTP with Password Authentication",
                  value: "sftp_password"
                }
              ]}
            />
            <Form.TextInput
              label="SFTP Host"
              name={`attributes[configuration][${strategy}][host]`}
              placeholder="Host"
            />
            <Form.TextInput
              label="SFTP Port"
              name={`attributes[configuration][${strategy}][port]`}
              placeholder="22"
            />
            <Form.TextInput
              label="SFTP Username"
              name={`attributes[configuration][${strategy}][username]`}
              placeholder="Username"
            />
            {strategy === "sftpKey" && (
              <Form.TextArea
                label="SFTP Private Key"
                name={`attributes[configuration][${strategy}][privateKey]`}
              />
            )}
            {strategy === "sftpPassword" && (
              <Form.TextInput
                password
                label="SFTP password"
                name="attributes[configuration][sftpPassword][password]"
              />
            )}
            <Form.Save text="Save Export Target" />
          </>
        );
      }}
    </FormContainer.Form>
  );
}

ExportTargetsContainerForm.propTypes = {
  model: PropTypes.object,
  onSuccess: PropTypes.func,
  options: PropTypes.object
};

ExportTargetsContainerForm.defaultProps = {
  model: {},
  onSuccess: () => null,
  options: {}
};
