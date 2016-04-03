# The project model is the primary unit of Manifold.
class Project < ActiveRecord::Base
  has_many :texts
  belongs_to :published_text, class_name: "Text", optional: true
  has_many :text_categories, -> { for_text }, class_name: "Category"
  has_many :resource_categories, -> { for_resource }, class_name: "Category"
  has_many :favorites, as: :favoritable
  include Collaborative

  has_attached_file :cover,
                    include_updated_timestamp: false,
                    default_url: "",
                    styles: { thumb: ["x246", :png] }

  validates_attachment_content_type :cover, content_type: %w(
    image/gif
    image/jpeg
    image/jpg
    image/png
    image/svg+xml
  )
  validates_attachment_file_name :cover, matches: [
    /gif\Z/,
    /jpe?g\Z/,
    /png\Z/,
    /svg\Z/
  ]

  def self.filtered(filters)
    projects = Project.all
    defaults = { featured: nil }
    filters = defaults.merge(filters[:filter].to_h.symbolize_keys || {})
    projects = projects.where(featured: true) if filters[:featured] == "true"
    projects = projects.where(featured: false) if filters[:featured] == "false"
    projects
  end

  def thumbnail_url
    return ENV["API_DOMAIN"] + cover.url(:thumb) if cover
    cover_url
  end

  def cover_url
    ENV["API_DOMAIN"] + cover.url if cover
  end
end
