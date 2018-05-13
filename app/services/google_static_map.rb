class GoogleStaticMap < BaseService
  BASE_URL = 'https://maps.googleapis.com/maps/api/staticmap'
  DEFAULT_ZOOM = 17

  def initialize(center, size, options = {})
    @center = center
    @size = size
    @options = options
  end

  attr_reader :center, :size

  def call
    "#{BASE_URL}?#{url_params.join('&')}"
  end

  def url_params
    %i(config labels_style roud_style administrative_style).map { |mt| send(mt).to_query }
  end

  def config
    {
      key: Rails.application.credentials[:google],
      maptype: 'terrain',
      center: center_format,
      size: size_format,
      zoom: DEFAULT_ZOOM - size_coeficient
    }
  end

  def center_format
    "#{center[:lat]},#{center[:lng]}"
  end

  def size_format
    "#{(size[:width].to_f/(size_coeficient + 1)).to_i}x#{(size[:height].to_f/(size_coeficient + 1)).to_i}"
  end

  def labels_style
    {
      style: 'feature:all|element:labels|visibility:off'
    }
  end

  def roud_style
    {
      style: 'feature:road|visibility:off'
    }
  end

  def administrative_style
    {
      style: 'feature:administrative|visibility:off'
    }
  end

  def size_coeficient
    @size_coeficient ||= GoogleMaps::Calculators::SizeCoeficient.call(
      size[:height].to_i, size[:width].to_i, DEFAULT_ZOOM)
  end
end
