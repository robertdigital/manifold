WITH denormalized_project_role_entitlements AS (
  SELECT ent.user_id, pre.project_id, pre.entitlement_role_id, er.name AS role_name, pre.id AS project_role_entitlement_id, ent.id AS entitlement_id
  FROM project_role_entitlements AS pre
  INNER JOIN entitlements ent ON pre.entitlement_id = ent.id
  INNER JOIN entitlement_roles er ON pre.entitlement_role_id = er.id
), denormalized_assigned_project_roles AS (
  SELECT ur.user_id, r.resource_id AS project_id, er.id AS entitlement_role_id, r.name AS role_name, r.id AS role_id
  FROM roles r
  INNER JOIN entitlement_roles er ON r.name = er.name
  INNER JOIN users_roles ur ON ur.role_id = r.id
  WHERE r.resource_type = 'Project'
) SELECT
  COALESCE(dpre.project_id, dapr.project_id) AS project_id,
  COALESCE(dpre.user_id, dapr.user_id) AS user_id,
  er.id AS entitlement_role_id,
  er.name AS role_name,
  dpre.project_role_entitlement_id IS NOT NULL AS has_entitlement,
  dapr.role_id IS NOT NULL AS has_assigned_role
  FROM denormalized_project_role_entitlements AS dpre
  FULL OUTER JOIN denormalized_assigned_project_roles AS dapr USING (user_id, project_id, entitlement_role_id)
  INNER JOIN entitlement_roles er ON dpre.entitlement_role_id = er.id OR dapr.entitlement_role_id = er.id

