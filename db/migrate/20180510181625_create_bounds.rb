class CreateBounds < ActiveRecord::Migration[5.2]
  def change
    create_table :bounds, id: :uuid do |t|
      t.uuid :sw_point_id
      t.uuid :nw_point_id
      t.uuid :ne_point_id
      t.uuid :se_point_id
      t.uuid :area_id, index: true

      t.timestamps
    end
  end
end
