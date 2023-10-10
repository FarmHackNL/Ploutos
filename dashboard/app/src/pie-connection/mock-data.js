import { randomUri, randomDateBetween, randomFloatBetween, pickFrom } from "./utils";

export let generatedOperations = generateOperations(new Date("2022-04-01T00:00:00.000Z"), new Date("2022-04-08T12:00:00.000Z"), 100);
export let generatedCarbonData = generateCarbonData(new Date("2022-04-01T00:00:00.000Z"), new Date("2022-04-09T00:00:00.000Z"), 2);

export let exampleCarbonData = [
  {x: new Date("2022"), y: 4.03},
  {x: new Date("2023"), y: 4.06},
  {x: new Date("2024"), y: 4.08},
  {x: new Date("2025"), y: 4.13},
];

function generateOperations(start, end, samples) {
  const operations = []
  for (let i = 0; i < samples; i++) {
    let date = randomDateBetween(start, end);
    operations.push({
      unit: "<http://www.ontology-of-units-of-measure.org/resource/om-2/hectare>",
      parcel: "<https://ploutos-h2020.eu/data/sip8/parcel1>",
      treatedAreaValue: randomFloatBetween(0.3, 1.8),
      start: date,
      farm: "<https://ploutos-h2020.eu/data/sip8/farm1>",
      treatedAreaMeasure: `<${randomUri()}>`,
      end: date,
      operationType: pickFrom("<https://www.tno.nl/agrifood/ontology/ploutos/common#CropProtectionOperation>", "<https://www.tno.nl/agrifood/ontology/ploutos/common#SoilManagementOperation>"),
      operation: `<${randomUri()}>`,
    });
  }

  return operations;
}

function generateCarbonData(start, end, walkDistance) {
  const carbonData = [];
  let currentDate = new Date(start.toDateString());
  currentDate.setMinutes(currentDate.getMinutes() - currentDate.getTimezoneOffset());
  let currentCarbon = 0;
  const endDate = new Date(end.toDateString());
  while (currentDate.getTime() < endDate.getTime()) {
    carbonData.push({
      x: currentDate.getTime(),
      y: currentCarbon
    });
    currentDate.setDate(currentDate.getDate() + 1);
    currentCarbon += randomFloatBetween(-walkDistance, walkDistance);
  }
  return carbonData;
}