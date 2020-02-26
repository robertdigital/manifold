class EntitlementKind < ClassyEnum::Base
end

class EntitlementKind::Project < EntitlementKind
end

class EntitlementKind::ProjectCollection < EntitlementKind
end

class EntitlementKind::Unknown < EntitlementKind
end
