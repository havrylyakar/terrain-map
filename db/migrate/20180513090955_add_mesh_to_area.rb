class AddMeshToArea < ActiveRecord::Migration[5.2]
  def change
    add_column :areas, :mesh, :jsonb
  end
end
