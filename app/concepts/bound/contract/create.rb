class Bound
  module Contract
    class Create < Reform::Form
      property :sw_point, form: ::Point::Contract::Create, populate_if_empty: ::Point,
                          prepopulator: :sw_point_prepopulate!
      property :nw_point, form: ::Point::Contract::Create, populate_if_empty: ::Point,
                          prepopulator: :nw_point_prepopulate!
      property :ne_point, form: ::Point::Contract::Create, populate_if_empty: ::Point,
                          prepopulator: :ne_point_prepopulate!
      property :se_point, form: ::Point::Contract::Create, populate_if_empty: ::Point,
                          prepopulator: :se_point_prepopulate!

      property :area_id

      validates :sw_point, :nw_point, :ne_point, :se_point, presence: true

      %i(sw_point nw_point ne_point se_point).each do |point|
        define_method "#{point}_prepopulate!" do |_options|
          self.send("#{point}=", ::Point.new)
        end
      end
    end
  end
end
