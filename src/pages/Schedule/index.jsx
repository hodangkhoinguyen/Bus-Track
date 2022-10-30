import { useEffect, useState } from "react";
import busService from "../../services/bus";
import "./styles.css";
import Table from "react-bootstrap/Table";

function Schedule(props) {
  let agency = "unitrans";
  const [routeList, setRouteList] = useState([]);
  const [route, setRoute] = useState(null);

  const initialize = () => {
    busService
      .routeList(agency)
      .then((result) => {
        setRouteList(result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <div>
      <h1>Schedule</h1>
      <div className="row">
        <div className="lg-3 md-3 sm-3">
          {routeList.map((elem) => (
            <RouteBox
              route={elem}
              key={elem.tag}
              changeRoute={() => {
                setRoute(elem.tag);
              }}
            />
          ))}
        </div>
        <ScheduleView route={route} agency={agency} />
      </div>
    </div>
  );
}

function RouteBox(props) {
  let route = props.route.title;
  return (
    <div
      className="route-box p-2 my-1 rounded border border-secondary"
      onClick={props.changeRoute}
    >
      {route} Line
    </div>
  );
}

function ScheduleView(props) {
  let route = props.route;
  const agency = props.agency;
  const [schedule, setSchedule] = useState([]);
  const [directionList, setDirectionList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [direction, setDirection] = useState(null);
  const [service, setService] = useState(null);
  const [stop, setStop] = useState([]);

  const getStop = () => {
    if (direction && service) {
      const stopList = schedule.filter(
        (elem) => elem.direction === direction && elem.serviceClass === service
      );
      console.log(stopList);
      setStop(stopList[0].stop);
    }
  };
  useEffect(() => {
    const initialize = async () => {
      if (route != null) {
        const result = await busService.schedule(agency, route);

        setSchedule(result);
        const newDirectionList = [
          ...new Set(result.map((elem) => elem.direction)),
        ];
        setDirectionList(newDirectionList);
        setDirection(newDirectionList[0]);
      }
    };
    initialize().catch((err) => console.log(err));
  }, [route]);

  useEffect(() => {
    const newServiceList = schedule
      .filter((elem) => elem.direction === direction)
      .map((elem) => elem.serviceClass);
    setServiceList(newServiceList);
    setService(newServiceList[0]);
    getStop();
  }, [direction]);

  useEffect(() => {
    getStop();
    console.log(direction, service);
  }, [service]);
  function updateDirection(e) {
    setDirection(e.target.value);
  }

  function updateService(e) {
    setService(e.target.value);
  }
  return (
    <div className="col">
      {directionList.length !== 0 ? (
        <div className="col">
          <select onChange={updateDirection}>
            {directionList.map((elem) => (
              <option value={elem} key={elem}>
                {elem}
              </option>
            ))}
          </select>
          <select value={service} onChange={updateService}>
            {serviceList.map((elem) => (
              <option value={elem} key={elem}>
                {elem}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div>No route chosen</div>
      )}
      {stop.length !== 0 ? <ScheduleTable stop={stop} /> : <div></div>}
    </div>
  );
}

function ScheduleTable(props) {
  console.log(props.stop);
  const stop = props.stop;

  return (
    <div className="col">
      <Table striped bordered hover>
        <thead className="thead-dark">
          <tr>
            <th scope="col">Stop</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {stop.map((elem) => (
            <tr key={elem.name}>
              <td>{elem.name}</td>
              {elem.time.map((slot) => (
                <td>{slot}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default Schedule;
