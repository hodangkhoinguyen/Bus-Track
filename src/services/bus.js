import http from '../http-common.js';

class BusService {
    async routeList(agencyTag) {
        let api = await http.get(`/routeList`);
        return api.data;
    }

    async getSchedule(routeId) {
        let api = await http.get(`/schedule/${routeId}`);
        return api.data;
    }
}

export default new BusService();
