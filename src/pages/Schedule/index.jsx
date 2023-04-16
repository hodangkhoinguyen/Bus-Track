import bus from "../../services/bus.js";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./style.css";
function ScheduleDisplay(props) {
    const schedule = props.schedule;
    schedule.forEach(elem => {
            elem.period.start = new Date(elem.period.start);
            elem.period.end = new Date(elem.period.end);
        }
    );

    const dayList = [...new Set(schedule.map(elem => elem.day))];
    const periodList = [...new Set(schedule.filter(elem => elem.day === dayList[0])
                        .map(elem => elem.period))];
    let initCurrSchedule = schedule.filter(elem => (elem.day === dayList[0] 
        && elem.period.start.getTime() === (new Date(periodList[0].start)).getTime()));
    const initState = {
        day: dayList[0],
        periodList: periodList,
        period: periodList[0].start,
        currentSchedule: initCurrSchedule
    }
    const [scheduleState, setScheduleState] = useState(initState);

    function dayChange(e) {        
        let updateScheduleState = {
            ...scheduleState
        };
        updateScheduleState.day = e.target.value;
        let updatePeriodList = schedule.filter(elem => elem.day === e.target.value)
                    .map(elem => elem.period);

        if (!compareTimeLists(updatePeriodList, scheduleState.periodList)) {
            updateScheduleState.periodList = updatePeriodList;
            updateScheduleState.period = updatePeriodList[0].start;
        }

        updateScheduleState.currentSchedule = currentSchedule(e.target.value, updateScheduleState.period);
        setScheduleState(updateScheduleState);
    }

    function compareTimeLists(arr1, arr2) {
        if (arr1.length !== arr2.length)
            return false;
        
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i].start.getTime() !== arr2[i].start.getTime())
                return false;
        }

        return true;
    }

    function periodChange(e) {
        setScheduleState({
            ...scheduleState,
            period: new Date(e.target.value),
            currentSchedule: currentSchedule(scheduleState.day, new Date(e.target.value))
        })
    }

    function currentSchedule(day, period) {
        let result = schedule.filter(elem => (elem.day === day) 
            && (elem.period.start.getTime() === period.getTime()));
        
        if (result.length === 0)
            return null;
        else
            return result;
    }
    return (<div>
        <select onChange={dayChange}>
            {dayList.map(elem => {return <option value={elem} key={elem}>{elem}</option>})}
        </select>
        <select onChange={periodChange}>
            {scheduleState.periodList.map(elem => {return <option value={elem.start.toLocaleDateString()} key={elem.start}>{elem.start.toLocaleDateString() + "-" + elem.end.toLocaleDateString()}</option>})}
        </select>
        <div>{(scheduleState.currentSchedule != null || scheduleState.currentSchedule.length === 0)?<StopDisplay schedule={scheduleState.currentSchedule} />:<div>"No schedule found"</div>}</div>
        <div>
        <iframe src={`https://retro.umoiq.com/googleMap/customGoogleMap.jsp?a=unitrans&onlyDisplayMap&s=0&r=${props.route}`} width="100%" height="350" frameborder="0"></iframe>

        </div>
    </div>)
}

function StopDisplay(props) {
    const schedule = props.schedule;
    console.log(props.schedule);
    return (<div>
        {
            schedule.map(elem => {
                return (
                <div>
                    Direction: {elem.direction}
                    <StopTable stops={elem.stops} />
                </div>
            )})
        }
    </div>);
}

function StopTable(props) {
    const stops = props.stops;
    return (
        <div className="stop-table">
            <table>
                <tbody>
                    {stops.map(elem => {return (<tr>
                        <th>
                            {elem.stop_name}
                        </th>
                        {
                            elem.time.map(t => {
                                return (<td>
                                    {t.slice(0,5)}
                                </td>)
                            })
                        }
                    </tr>
                    )})}
                </tbody>
            </table>
        </div>
    );
}
function Schedule(props) {    
    let {route} = useParams();
    console.log(route);
    const initState = {
        routeList: [],
        schedule: null
    }

    const [routeState, setRouteState] = useState(initState);

    function init() {
        getSchedule()
        .then(result => {
        })
        .catch(err => {
        })
    }

    async function getSchedule() {
        let newRouteState = {
            routeList: [],
            schedule: null
        };
        newRouteState.routeList = await bus.routeList();

        if (route) {
            newRouteState.schedule = await bus.getSchedule(route);
        }
        setRouteState(newRouteState);
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <div className="schedule">
            <div className="route-list">
                {routeState.routeList.map(elem => <RouteBox key={elem.route_id} {...elem} />)}
            </div>
            <div className="stops-schedule">
                {
                    routeState.schedule ?
                    <ScheduleDisplay schedule={routeState.schedule} route={route}/> :
                    <div>No route chosen</div>
                }
            </div>
        </div>    
    )
}

function RouteBox(props) {
    let {route_id, route_long_name} = props;
    return (
        <div className="route_box">
            <a className="route_link" href={"/schedule/" + route_id}>
                <h3>{route_id}</h3>
                <span>{route_long_name}</span>
            </a>
        </div>
    )
}

export default Schedule;