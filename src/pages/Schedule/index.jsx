import {useEffect, useState} from 'react';
import busService from '../../services/bus';

function Schedule() {
    const [routeList, setRouteList] = useState('nothing');
    useEffect(() => {    
        busService.schedule('unitrans', 'L')
        .then((result) => {
            setRouteList(result);
        })
        .catch(err => console.log(err));
    }, []);
    console.log(routeList);

    return (
        <div>Schedule</div>
    )
}

export default Schedule;
