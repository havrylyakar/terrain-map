class Bound < ApplicationRecord
  belongs_to :area

  belongs_to :sw_point, class_name: Point.name, dependent: :destroy
  belongs_to :nw_point, class_name: Point.name, dependent: :destroy
  belongs_to :ne_point, class_name: Point.name, dependent: :destroy
  belongs_to :se_point, class_name: Point.name, dependent: :destroy

  store_accessor :size, :height, :width
end
