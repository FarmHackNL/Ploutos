<template>
  <div class="uk-width-1-1 uk-overlay uk-position-bottom ontop uk-background-muted">
    <button
      type="button"
      aria-label="Close"
      uk-close
      @click="close()"
    />
    <div v-if="operations == undefined || carbonEstimates == undefined">
      Loading operations...
    </div>
    <div v-else>
      <CarbonTrendChart
        :carbon-estimates="carbonEstimates"
        :date-range="dateRange"
      />
      <!-- <OperationChart :operations="operations"></OperationChart> -->
      <OperationTimeline
        :operations="operations"
        :date-range="dateRange"
      />
      <button
        uk-toggle="target: #operations-table-modal"
        class="uk-button"
        type="button"
      >
        Show table
      </button>
      <OperationTableModal :operations="operations" />
    </div>
  </div>
</template>

<script>
import PieConnection from "../pie-connection/pie-connection";
import { generatedOperations, exampleCarbonData } from "../pie-connection/mock-data";
import OperationTableModal from "./OperationTableModal.vue";
import OperationChart from "./OperationChart.vue";
import CarbonTrendChart from "./CarbonTrendChart.vue";
import OperationTimeline from "./OperationTimeline.vue";

export default {
  components: {
    CarbonTrendChart,
    OperationTableModal,
    // OperationChart,
    OperationTimeline
},
  data() {
    return {
      operations: undefined,
      carbonEstimates: undefined,
      pieConnection: undefined,
    };
  },
  async mounted() {
    this.pieConnection = new PieConnection();
    this.operations = await this.pieConnection.getEvents();
    // this.operations = generatedOperations;
    this.carbonEstimates = exampleCarbonData;
    let minDate = undefined;
    let maxDate = undefined;
    this.operations.forEach(operation => {
      if (minDate == undefined) {
        minDate = operation.start;
      }
      if (maxDate == undefined) {
        maxDate = operation.end;
      }
      if (operation.start < minDate) {
        minDate = operation.start;
      }
      if (operation.end > maxDate) {
        maxDate = operation.end;
      }
    });
    this.carbonEstimates.forEach(est => {
      if (est.x < minDate) {
        minDate = est.x;
      }
      if (est.x > maxDate) {
        maxDate = est.x;
      }
    });
    this.dateRange = [minDate, maxDate];
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.ontop {
  z-index: 801;
}
</style>