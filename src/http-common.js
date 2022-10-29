import axios from 'axios';

export default axios.create({
    baseURL: 'https://retro.umoiq.com/service',
    headers: {
        'Content-type': 'text/xml',
    }
});
