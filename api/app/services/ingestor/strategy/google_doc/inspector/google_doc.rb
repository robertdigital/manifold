require "fileutils"
require "zip"
require "memoist"
require "uri"
require "open-uri"
require "json"
require "pathname"
require "digest/md5"

module Ingestor
  module Strategy
    module GoogleDoc
      module Inspector
        class GoogleDoc

          include Ingestor::Loggable
          include Ingestor::Inspector::Helpers
          include Ingestor::Inspector::HTML::HTML
          extend Memoist

          def initialize(path, logger = nil)
            @doc_path = path
            @session = ::Factory::DriveSession.create_service_account_session
            @logger = logger
            @extracted_path = "tmp/#{title}.html" if can_ingest_doc?
          end

          # returns md5 hash of file contents
          def unique_id
            Digest::MD5.hexdigest(fetch_file.id)
          end

          def can_ingest_doc?
            @doc_path.include?("docs.google")
          end

          def google_doc?
            return false unless can_ingest_doc?
            fetch_file
            create_temp_html
            true
          end

          def title
            fetch_file.title.titleize
          end

          def date
            fetch_file.modified_time
          end

          def create_temp_html
            encoded_html = fetch_html.encode("utf-8", invalid: :replace, undef: :replace)
            File.open(@extracted_path, "w+") do |f|
              f.write(encoded_html)
            end
          end
          memoize :create_temp_html

          def ingestion_source_path
            @extracted_path
          end

          def ingestion_source
            ingestion_source_path
          end

          def spine_source_ids
            [ingestion_source].map do |item|
              ::Ingestor::Strategy::GoogleDoc::Inspector::TextSection.new(item, self)
                                                                     .source_identifier
            end
          end

          # rubocop:disable Metrics/LineLength
          def ingestion_source_inspectors
            [ingestion_source].map do |source|
              ::Ingestor::Strategy::GoogleDoc::Inspector::IngestionSource.new(source, self)
            end
          end
          # rubocop:enable Metrics/LineLength

          def text_section_inspectors
            [ingestion_source].map do |path|
              ::Ingestor::Strategy::GoogleDoc::Inspector::TextSection.new(path, self)
            end
          end

          def stylesheet_inspectors
            [
              ::Ingestor::Strategy::GoogleDoc::Inspector::Stylesheet.new(
                stylesheet,
                self
              )
            ]
          end

          def fetch_file
            @session.file_by_url(@doc_path)
          end
          memoize :fetch_file

          def fetch_html
            @session.drive.export_file(fetch_file.id, "text/html")
          end
          memoize :fetch_html

          def remove_tmp
            FileUtils.rm_rf(@extracted_path)
          end

        end
      end
    end
  end
end
