class AddSizeAndCenterToBound < ActiveRecord::Migration[5.2]
  def change
    add_column :bounds, :size, :jsonb
  end
end
