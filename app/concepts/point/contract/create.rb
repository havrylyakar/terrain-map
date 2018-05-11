class Point
  module Contract
    class Create < Reform::Form
      properties :lat, :lng

      validates :lat, :lng, presence: true
    end
  end
end
