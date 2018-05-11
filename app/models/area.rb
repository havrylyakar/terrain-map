class Area < ApplicationRecord
  belongs_to :user
  has_one :bound

  has_attached_file :image, styles: { small: '300x300' },
                             default_url: 'logo.png'

  # Validations
  validates_attachment_content_type :image, content_type: /\Aimage/
  validates_attachment_size :image, less_than: 5.megabytes
end
