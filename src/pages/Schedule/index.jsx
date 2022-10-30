import {useEffect, useState} from 'react';

import busService from '../../services/bus';
import XMLParser from 'react-xml-parser';

function Schedule() {
    const [xmlText, setXmlText] = useState('');

    useEffect(() => {    
        busService.schedule('unitrans', 'L')
        .then((result) => {
            setXmlText(result);
            parseSchedule(result);           
        })
        .catch(err => console.log(err));
    });

    return (
        <div>Schedule</div>
    )
}

function parseSchedule(xmlText) {
    const xml = new XMLParser().parseFromString(xmlText);
    var routeList = xml.getElementsByTagName('route');
    console.log(directionList(routeList));
}

function directionList(routeList) {
    let directionList = {};
    for (let i of routeList) {
        const route = i.attributes;
        if (!directionList[route.direction])
            directionList[route.direction] = {};
        directionList[route.direction][route.serviceClass] = parseRoute(i.children);
    }
    return directionList;
}

/* return a list of schedule for multiple stops of each route
    0: {stopName: ...., time: .....}
    1: {stopName: ...., time: .....}
*/
function parseRoute(route) {
    const stopList = parseStop(route[0].children);
    const schedule = route.slice(1,).map(turn => {
        let stops = turn.children.map(stop => {
            let tag = stop.attributes.tag;
            let time = stop.getElementsByTagName("stop")[0].value;
            let stopName = stopList[tag];

            return {name: stopName, time: time};
        });
        
        return stops;
    });

    return schedule;
}

/* return a map with key is stop ID and value is stop Name
    {
        11222: Silo Street,
        22333: MU building
    }
*/
function parseStop(stopXml) {
    let stopResult = {};
    for (let elem of stopXml) {
        let tag = elem.attributes.tag;
        let value = elem.getElementsByTagName("stop")[0].value;
        stopResult[tag] = value;
    }
    return stopResult;
}
export default Schedule;
