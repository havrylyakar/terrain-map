class CreatePoints < ActiveRecord::Migration[5.2]
  def change
    create_table :points, id: :uuid do |t|
      t.decimal :lat, { precision: 10, scale: 6 }
      t.decimal :lng, { precision: 10, scale: 6 }

      t.timestamps
    end
  end
end
