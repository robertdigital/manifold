# Stores configuratoin for fetching a project tweets
class TwitterQuery < ApplicationRecord
  ALLOWED_RESULT_TYPES = %w(most_recent popular).freeze

  # Authority
  include Authority::Abilities
  include TrackedCreator

  # Association
  belongs_to :project
  has_many :events,
           as: :subject,
           dependent: :destroy

  # Validation
  validates :query, presence: true
  validates :result_type, inclusion: { in: ALLOWED_RESULT_TYPES }

  # Callbacks
  before_save :reset_most_recent_tweet_id, if: :query_changed?

  def title
    id
  end

  def to_s
    query
  end

  def fetch_date_limit(days = 5)
    (created_at - days.days).strftime("%Y-%m-%d")
  end

  def fetch_now
    Tweet::Fetcher.new.fetch_one(self)
  end

  def display_name
    parts = query.split(" ")
    parts.length > 1 ? parts.first + "..." : query
  end

  private

  def reset_most_recent_tweet_id
    self.most_recent_tweet_id = nil
  end

end
