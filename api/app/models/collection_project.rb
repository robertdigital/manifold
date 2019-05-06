class CollectionProject < ApplicationRecord
  include Authority::Abilities
  include Concerns::SerializedAbilitiesFor
  self.authorizer_name = "ProjectChildAuthorizer"

  belongs_to :project_collection, counter_cache: true
  belongs_to :project
  has_one :ranking, class_name: "CollectionProjectRanking", inverse_of: :collection_project
  has_many :creators, through: :project, source: "makers"
  has_many :contributors, through: :project, source: "makers"

  # Ordering
  acts_as_list scope: :project_collection

  # Scopes
  scope :globally_ranked, -> { joins(:ranking).merge(CollectionProjectRanking.globally_ranked) }
  scope :ranked, -> { joins(:ranking).merge(CollectionProjectRanking.ranked) }
  scope :with_order, ->(order) { order(order) if order.present? }

  scope :projects_with_read_ability, lambda { |user = nil|
    next all if user && Project.drafts_readable_by?(user)
    next joins(:project).where(projects: { draft: false }) unless user

    projects_with_update_ability user
  }

  scope :projects_with_update_ability, lambda { |user = nil|
    next none unless user.present?

    joins(:project).where("projects.draft = FALSE OR projects.id IN (?)",
                          Project.authorizer.scope_updatable_projects(user).pluck(:id))
  }

  # Validation
  validates :project, uniqueness: { scope: :project_collection }
end
