<template>
  <leaflet
    id="leaflet-map"
    ref="myMap"
    :min-zoom="3"
    :max-zoom="18"
  />
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LMap} from 'vue2-leaflet'

export default {
  name: 'MapLeaflet',
  components: {
    leaflet: LMap,
    // LTileLayer,
    // LMarker
  },
  props: {
    'lat': {type: Number, required: true},
    'lon': {type: Number, required: true},
    'zoom': {type: Number, required: true}
  },
  data () {
    return {
      zoomed: false,
      map: null,
      group: null,
      layers: [],
      markers: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(this.initLeaflet, 0)
    })
  },
  methods: {
    initLeaflet () {
      this.map = this.$refs.myMap.mapObject  // L.map('map', { minZoom: 3 })
      this.map.setView([this.lat, this.lon], this.zoom)
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {}).addTo(this.map)
      this.map.invalidateSize()
    },
    clear () {
      this.markers = []
      if (this.group !== null) {
        this.group.removeFrom(this.map)
      }
      for (const layer of this.layers) {
        layer.removeFrom(this.map)
      }
      this.layers = []
    },

    addMarker (lat, lon, icon, popupMsg) {
      this.markers.push(
        L.marker([lat, lon], { icon: icon }).bindPopup(popupMsg)
      )
    },

    zoomToLayer (layer) {
      this.map.fitBounds(layer.getBounds())
    },

    addLayer (layer) {
      layer.addTo(this.map)
      this.layers.push(layer)
      if (!this.zoomed) {
        this.map.fitBounds(layer.getBounds())
        this.zoomed = true
      }
    },

    removeLayer (layer) {
      layer.removeFrom(this.map)
      this.layers = this.layers.filter(l => l !== layer)
    },

    // display () {
    //   if (this.markers.length > 0) {
    //     this.group = L.featureGroup(this.markers).addTo(this.map)
    //     this.map.fitBounds(this.group.getBounds())
    //   }
    // },

    // _createIcon (color) {
    //   return new L.Icon({
    //     iconUrl: `/static/leaflet-marker-icons/marker-icon-2x-${color}.png`,
    //     shadowUrl: '/static/leaflet-marker-icons/marker-shadow.png',
    //     iconSize: [25, 41],
    //     iconAnchor: [12, 41],
    //     popupAnchor: [1, -34],
    //     shadowSize: [41, 41]
    //   })
    // }
  }
}

</script>

<style scoped>

  #leaflet-map {
    height: 100%;
    width: 100%;
    display:block;
  }

  .leaflet-container {
    cursor: crosshair;
  }
</style>
