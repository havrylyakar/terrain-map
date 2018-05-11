class CreateAreas < ActiveRecord::Migration[5.2]
  def change
    create_table :areas, id: :uuid do |t|
      t.uuid :user_id
      t.attachment :image
      t.string :name

      t.timestamps
    end
  end
end
