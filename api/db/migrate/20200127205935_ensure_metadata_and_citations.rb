class EnsureMetadataAndCitations < ActiveRecord::Migration[5.2]
  def change
    change_column_null :projects, :citations, false, {}
    change_column_null :texts, :citations, false, {}
    change_column_null :text_sections, :citations, false, {}

    change_column_null :resources, :metadata, false, {}
    change_column_null :projects, :metadata, false, {}
    change_column_null :texts, :metadata, false, {}

  end
end
