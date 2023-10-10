<template>
  <div id="home">
    <div id="mapcontainer">       
      <LeafletMap
        ref="map"
        :lat="center[0]"
        :lon="center[1]"
        :zoom="16"
      />
    </div>
    <DataPanel
      v-if="showDataPanel"
      @close="toggleShowDataPanel(false)"
    />
  </div>
</template>

<script>

import LeafletMap from '@/components/Map'
import DataPanel from '@/components/DataPanel'
import L from 'leaflet'

export default {
  name: 'Home',
  components: {
    LeafletMap, DataPanel
  },
  data () {
    return {
      center: [52.723, 5.9303],
      polygonCoordinates: [
          [52.72418089758236, 5.928561107077717],
          [52.72445902221647, 5.930352950159505],
          [52.72234002221647, 5.931272950159505],
          [52.7220703419746, 5.9294903015237111]
      ],
      showDataPanel: false,
    }
  },
  mounted () {
     this.drawPolygon()
  },
  methods: {
    drawPolygon() {

      this.map = this.$refs.map.map

      // eslint-disable-next-line no-unused-vars
      var polygon = L.polygon(this.polygonCoordinates).addTo(this.$refs.map.$refs.myMap.mapObject);
      polygon.on('click', () => {
        this.showDataPanel = true;
      })
    },
    toggleShowDataPanel(newValue) {
      if (newValue == undefined) {
        this.showDataPanel = !this.showDataPanel
      } else {
        this.showDataPanel = newValue
      }
    }
  }
}
</script>

<style scoped>
   #home {
    height:100%;
    width:100%;
  }

  #mapcontainer {
    display:block;
    height: 100vh;
  }
</style>
