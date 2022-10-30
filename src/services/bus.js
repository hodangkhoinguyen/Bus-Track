import http from '../http-common.js';
import XMLParser from 'react-xml-parser';

class BusService {
    async agencyList() {
        let api = await http.get("publicXMLFeed?command=agencyList");
        return parseXml(api.data, "agency");
    }

    async routeList(agencyTag) {
        let api = await http.get(`publicXMLFeed?command=routeList&a=${agencyTag}`);
        return parseXml(api.data, "route");
    }

    async routeConfig(agencyTag, routeTag) {
        let api = await http.get(`publicXMLFeed?command=routeConfig&a=${agencyTag}&r=${routeTag}`);
        return parseXml(api.data, "route");
    }

    async prediction(agencyTag, stopId) {
        let api = await http.get(`command=predictions&a=${agencyTag}&stopId=${stopId}`);
        return parseXml(api.data, "prediction");
    }

    async predictionRouteTag(agencyTag, stopId, routeTag) {
        let api = await http.get(`command=predictions&a=${agencyTag}&stopId=${stopId}&routeTag=${routeTag}`);
        return parseXml(api.data, "prediction");
    }

    async schedule(agencyTag, routeTag) {
        let api = await http.get(`publicXMLFeed?command=schedule&a=${agencyTag}&r=${routeTag}`);
        return api.data;
    }
}

function parseXml(xmlText, tagName) {
    var xml = new XMLParser().parseFromString(xmlText);
    var list = xml.getElementsByTagName(tagName);
    return list;
}
export default new BusService();
