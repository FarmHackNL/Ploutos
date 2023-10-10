<template>
  <div>
    <apexchart
      type="line"
      height="200px"
      :options="options"
      :series="series"
    />
  </div>
</template>

<script>

export default {
  props: {
    carbonEstimates: {
      type: Array,
      default: undefined
    },
    dateRange: {
      type: Array,
      default: undefined,
    },
  },
  data() {
    const yMin = Math.min(... this.carbonEstimates.map(d => d.y));
    const yMax = Math.max(... this.carbonEstimates.map(d => d.y));
    const yRange = yMax - yMin;
    return {
      series: [],
      options: {
        title: {
          text: 'Carbon trend',
        },
        xaxis: {
          type: 'datetime',
          min: this.dateRange ? this.dateRange[0].getTime() : undefined,
          max: this.dateRange ? this.dateRange[1].getTime() : undefined,
        },
        yaxis: [{
          title: {
            text: "organic matter ratio (%)",
          },
          labels: {
            formatter: function(val) {
              return val.toFixed(2);
            }
          },
          min: yMin - 0.1 * yRange,
          max: yMax + 0.1 * yRange,
        }],
        tooltip: {
          y: {
            formatter: function(val) {
              return `${val.toFixed(2)} %`;
            }
          }
        },
      },
    }
  },
  async mounted() {
    this.series = [
      {
        name: "organic matter ratio",
        data: this.carbonEstimates
      }
    ];
  }
}

</script>
