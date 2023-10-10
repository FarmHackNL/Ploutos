<template>
  <div
    id="operations-table-modal"
    uk-modal
  >
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">
        Operations
      </h2>
      <button
        class="uk-modal-close-default"
        type="button"
        uk-close
      />
      <table class="uk-table">
        <caption>
          Operations on parcel
        </caption>
        <thead>
          <tr>
            <th>Date</th>
            <th>Operation</th>
            <th>Treated area</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="operation in operations"
            :key="operation.operation"
          >
            <td>{{ operation.start.toLocaleDateString() }}</td>
            <td>{{ toOperationTypeLabel(operation.operationType) }}</td>
            <td>
              {{
                getTreatedAreaString(operation.treatedAreaValue, operation.unit)
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { uriToOperationTypeLabel } from "../pie-connection/utils";

export default {
  props: {
    operations: {
      type: Array,
      default: undefined
    }
  },
  data() {
    return {
      unitUriToLabel: {
        "http://www.ontology-of-units-of-measure.org/resource/om-2/hectare":
          "ha",
      },
    }
  },
  methods: {
    getTreatedAreaString(numericValue, unit) {
      unit = unit.substring(1, unit.length - 1);
      let val = parseFloat(numericValue);
      let unitSymbol = this.unitUriToLabel[unit];
      if (unitSymbol == undefined) {
        console.warn(`unknown unit URI: ${unit}`);
      }
      return `${val.toFixed(2)} ${unitSymbol}`;
    },
    toOperationTypeLabel: uri => uriToOperationTypeLabel(uri),
  }
}

</script>