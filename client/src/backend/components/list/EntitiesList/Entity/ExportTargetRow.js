import React from "react";
import PropTypes from "prop-types";
import lh from "helpers/linkHandler";
import EntityRow from "./Row";

export default function ExportTargetRow({ entity: exportTarget, active }) {
  const { name, strategy } = exportTarget.attributes;
  const label = strategy.replace("_", " ");

  return (
    <EntityRow
      onRowClick={lh.link("backendRecordsExportTarget", exportTarget.id)}
      rowClickMode="block"
      title={name}
      label={label}
      active={active === exportTarget.id}
    />
  );
}

ExportTargetRow.propTypes = {
  entity: PropTypes.object.isRequired,
  active: PropTypes.string.isRequired
};
