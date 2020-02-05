import React from "react";
import PropTypes from "prop-types";
import FormattedDate from "global/components/FormattedDate";
import EntityRow from "./Row";

export default function ExportationRow({ entity: exportation }) {
  const { createdAt, exportedAt, currentState } = exportation.attributes;
  const { exportTarget } = exportation.relationships;

  const label = [currentState];
  const {
    attributes: { name: exportTargetName }
  } = exportTarget;

  return (
    <EntityRow
      rowClickMode="block"
      title={<FormattedDate date={createdAt || exportedAt} format="PPpp" />}
      label={label}
      subtitle={exportTargetName}
    />
  );
}

ExportationRow.propTypes = {
  entity: PropTypes.object.isRequired
};
