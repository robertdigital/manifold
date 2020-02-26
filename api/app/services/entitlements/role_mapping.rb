module Entitlements
  class RoleMapping
    include StoreModel::Model

    EntitlementRoleName.each do |name|
      attribute name.to_sym, :boolean, default: false

      alias_method :"#{name}?", name.to_sym
    end

    # @param [Symbol, String, EntitlementRoleName] role_name
    def has?(role_name)
      raise ArgumentError, "Unknown EntitlementRoleName: #{role_name.inspect}" unless role_name.in?(EntitlementRoleName)

      public_send(role_name).present?
    end

    # @return [<EntitlementRoleName>]
    def role_names
      EntitlementRoleName.select do |role_name|
        public_send(role_name).present?
      end
    end
  end
end
