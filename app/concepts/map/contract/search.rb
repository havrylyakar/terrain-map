module Map
  module Contract
    class Search < Reform::Form
      properties :start, :end, virtual: true

      validates :start, :end, presence: true
    end
  end
end
