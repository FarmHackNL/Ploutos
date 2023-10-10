import { TkeClient } from "./tke-client";
import { parseRdfLiteral } from "./utils";

const PIE_REST_ENDPOINT = "http://localhost:8000/rest";
const PLOUTOS_SIP8 = "https://ploutos-h2020.eu/data/sip8/";

const PATTERN = "?farm ploutos:hasParcel ?parcel . ?operation a ?operationType . ?operationType rdfs:subClassOf ploutos:Operation . ?operation ploutos:isOperatedOn ?parcel . ?operation ploutos:hasStartDatetime ?start . ?operation ploutos:hasEndDatetime ?end . ?operation s4agri:hasTreatedArea ?treatedAreaMeasure . ?treatedAreaMeasure om:hasUnit ?unit . ?treatedAreaMeasure om:hasNumericalValue ?treatedAreaValue .";
const PREFIXES = {
  "ploutos": "https://www.tno.nl/agrifood/ontology/ploutos/common#",
  "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
  "om": "http://www.ontology-of-units-of-measure.org/resource/om-2/",
  "s4agri": "https://saref.etsi.org/saref4agri/",
};

export default class PieConnection {
  constructor() {
    this.tkeClient = undefined;
    this.kbId = `${PLOUTOS_SIP8}dashboard/${crypto.randomUUID()}`;
    this.kb = undefined;
  }

  async getEvents() {
    if (this.tkeClient == undefined) {
      this.tkeClient = new TkeClient(PIE_REST_ENDPOINT);
      this.kb = await this.tkeClient.registerKnowledgeBase(this.kbId, "SIP 8 Dashboard", "A dashboard that displays a map and agronomic activities on parcels", true, 30);
      this.askKi = await this.kb.registerAskKnowledgeInteraction(PATTERN, PREFIXES);
    }

    let results = await this.askKi([{}]);
    results.bindingSet.forEach((b) => {
      b.start = parseRdfLiteral(b.start);
      b.end = parseRdfLiteral(b.end);
    })
    return results.bindingSet;
  }
}

