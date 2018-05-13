class Area < ApplicationRecord
  DEFAULT_MESH = {
    x: 50,
    y: 50
  }

  CONTENT_TYPES = [
    TEXT_PLAIN = 'text/plain'.freeze
  ].freeze

  belongs_to :user
  has_one :bound, dependent: :destroy

  has_attached_file :image, styles: { small: '300x300' },
                             default_url: 'logo.png'

  has_attached_file :coordinates

  # Validations
  validates_attachment_content_type :image, content_type: /\Aimage/
  validates_attachment_size :image, less_than: 5.megabytes

  do_not_validate_attachment_file_type :coordinates

  Paperclip.options[:content_type_mappings] = {
    json: TEXT_PLAIN
  }
end
