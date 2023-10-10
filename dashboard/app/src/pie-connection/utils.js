import { Literal, Node } from "rdflib";

export function parseRdfLiteral(valueAndDatatype) {
  // Define the regular expression pattern
  const pattern = /^"(.+)"\^\^<(.+)>$/;

  // Match the input string against the pattern
  const match = valueAndDatatype.match(pattern);

  // Extract the values from the matched groups
  const lexicalValue = match[1];
  const dataType = match[2];

  const lit = new Literal(lexicalValue, undefined, dataType);
  return Node.toJS(lit);
}

export function uriToOperationTypeLabel(uri) {
  // TODO: do this with the ontology
  switch (uri.substring(1, uri.length - 1)) {
    case "https://www.tno.nl/agrifood/ontology/ploutos/common#SoilManagementOperation":
      return "soil management";
    case "https://www.tno.nl/agrifood/ontology/ploutos/common#CropProtectionOperation":
      return "crop protection";
    case "https://www.tno.nl/agrifood/ontology/ploutos/common#FertilizationOperation":
      return "fertilization";
    default:
      console.warn(`unknown operation: ${uri.substring(1, uri.length - 1)}`);
      return "unknown operation";
  }
}

export function randomUri(base) {
  if (base == undefined) {
    base = "https://example.org/"
  }
  return base + crypto.randomUUID();
}

export function randomFloatBetween(a, b) {
  return a + (b - a) * Math.random();
}

export function randomDateBetween(a, b) {
  let date = new Date();
  date.setTime(a.getTime() + (b.getTime() - a.getTime()) * Math.random());
  return date;
}

export function pickFrom(...options) {
  let i = Math.floor(options.length * Math.random());
  return options[i];
}