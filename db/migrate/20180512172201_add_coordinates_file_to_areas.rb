class AddCoordinatesFileToAreas < ActiveRecord::Migration[5.2]
  def change
    add_attachment :areas, :coordinates
  end
end
