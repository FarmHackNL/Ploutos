<template>
  <div v-if="series != undefined">
    <apexchart
      width="100%"
      height="200px"
      type="bar"
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
  },
  data() {
    return {
      options: {
        title: {
          text: "Operations"
        },
        chart: {
          stacked: true,
        },
        xaxis: {
          categories: undefined, // date strings here
        },
        yaxis: [
          {
            title: {
              text: "treated area (ha)",
            },
            labels: {
              formatter: function(val) {
                return val.toFixed(2);
              }
            }
          },
        ],
        dataLabels: {
          formatter: function(val) {
            return val.toFixed(2);
          }
        }
      },
      series: undefined,
    }
  },
  async mounted() {
    let series = this.operations.map((op) => ({
      date: new Date(op.start.toDateString()),
      area: parseFloat(op.treatedAreaValue),
      type: this.toOperationTypeLabel(op.operationType),
    }));
    series.sort((a, b) => a.date.getTime() - b.date.getTime());
    let groupedSeries = series.reduce((acc, curr) => {
      if (
        acc.length > 0 &&
        acc[acc.length - 1].date.getTime() == curr.date.getTime()
      ) {
        const same = acc[acc.length - 1];
        if (Object.hasOwn(same.areasPerType, curr.type)) {
          same.areasPerType[curr.type] += curr.area;
        } else {
          same.areasPerType[curr.type] = curr.area;
        }
      } else {
        const areas = {};
        areas[curr.type] = curr.area;
        acc.push({
          date: curr.date,
          areasPerType: areas,
        });
      }
      return acc;
    }, []);
    for (let i = 0; i < groupedSeries.length - 1 && i < 100; i++) {
      const nextDay = new Date(groupedSeries[i].date);
      nextDay.setDate(nextDay.getDate() + 1);
      if (nextDay.getTime() != groupedSeries[i + 1].date.getTime()) {
        // we need to put a day in between
        groupedSeries.splice(i + 1, 0, { date: nextDay, areasPerType: {} });
      }
    }
    this.options.xaxis.categories = groupedSeries.map((d) =>
      d.date.toLocaleDateString()
    );

    // determine the unique types (labels) used in the data
    const uniqueTypes = [
      ...new Set(groupedSeries.map((d) => Object.keys(d.areasPerType)).flat()),
    ];

    this.series = [];
    // for each type, add a series to the series with the correct data.
    uniqueTypes.forEach((type) => {
      this.series.push({
        name: type,
        data: groupedSeries.map((d) => {
          if (Object.hasOwn(d.areasPerType, type)) {
            return d.areasPerType[type];
          } else {
            return 0;
          }
        }),
      });
    });
  },
  methods: {
    toOperationTypeLabel: uri => uriToOperationTypeLabel(uri),
  }
}

</script>