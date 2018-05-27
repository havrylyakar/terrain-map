class Area
  module Contract
    class Create < Reform::Form
      properties :user_id, :name, :coordinates
      property :mesh, populator: :populate_mesh!
      property :image, populator: -> (fragment:, **) { self.image = open(fragment) }

      property :bound, form: ::Bound::Contract::Create, populate_if_empty: ::Bound,
                       prepopulator: :prepopulate_bound!
      validates :bound, :user_id, :name, presence: true

      def prepopulate_bound!(options)
        self.bound ||= Bound.new
      end

      def populate_mesh!(fragment:, **)
        self.mesh ||= {}

        self.mesh[:x] = fragment[:x].to_i
        self.mesh[:y] = fragment[:y].to_i
        self.mesh[:z] = fragment[:z].to_i
      end
    end
  end
end
