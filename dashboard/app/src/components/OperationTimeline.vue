<template>
  <div v-if="series != undefined">
    <apexchart
      width="100%"
      height="200px"
      type="rangeBar"
      :options="options"
      :series="series"
    />
  </div>
</template>

<script>
import { uriToOperationTypeLabel } from "../pie-connection/utils";
export default {
  props: {
    operations: {
      type: Array,
      default: undefined
    },
    dateRange: {
      type: Array,
      default: undefined,
    },
  },
  data() {
    return {
      options: {
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        xaxis: {
          type: 'datetime',
          min: this.dateRange ? this.dateRange[0].getTime() : undefined,
          max: this.dateRange ? this.dateRange[1].getTime() : undefined,
        },
        tooltip: {
          y: {
            title: {
              formatter: function(value, ctx) {
                if (ctx != undefined && ctx.w != undefined) {
                  const data = ctx.w.globals.initialSeries[ctx.seriesIndex].data[ctx.dataPointIndex];
                  return data.treatedAreaString;
                } else {
                  return value;
                }
              }
            }
          }
        }
      },
      series: [],
    }
  },
  async mounted() {
    let data = [];

    this.operations.forEach((operation) => {
      data.push({
        x: uriToOperationTypeLabel(operation.operationType),
        y: [
          operation.start.getTime(),
          operation.end.getTime() + (24 * 60 * 60 * 1000), // end of the day
        ],
        fillColor: this.fillColorForOperationType(operation.operationType.substring(1, operation.operationType.length - 1)),
        treatedAreaString: this.getTreatedAreaString(operation.treatedAreaValue, operation.unit)
      })
    });

    this.series.push({
      data: data
    });
  },
  methods: {
    fillColorForOperationType(operationType) {
      switch (operationType) {
        case "https://www.tno.nl/agrifood/ontology/ploutos/common#FertilizationOperation":
          return "#593908";
        case "https://www.tno.nl/agrifood/ontology/ploutos/common#SoilManagementOperation":
          return "#64BD55";
        default:
          return "#6290B5";
      }
    },
    getTreatedAreaString(numericValue, unit) {
      unit = unit.substring(1, unit.length - 1);
      let val = parseFloat(numericValue);
      let unitSymbol = this.unitUriToLabel(unit);
      if (unitSymbol == undefined) {
        console.warn(`unknown unit URI: ${unit}`);
      }
      return `${val.toFixed(2)} ${unitSymbol}`;
    },
    unitUriToLabel(uri) {
      let options = {
        "http://www.ontology-of-units-of-measure.org/resource/om-2/hectare": "ha",
      };
      return options[uri];
    }
  }
}

</script>