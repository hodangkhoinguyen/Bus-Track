import http from '../http-common.js';

class BusService {
    async routeList(agencyTag) {
        let api = await http.get(`/routeList/${agencyTag}`);
        return api.data;
    }
    async schedule(agencyTag, routeTag) {
        let api = await http.get(`/schedule/${agencyTag}/${routeTag}`);
        return api.data;
    }
}

export default new BusService();
