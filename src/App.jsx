import axios from "axios";
import { FixedSizeList } from "react-window";
import moment from "react-moment";
import React, { useEffect, useState } from "react";
import "./App.css";
import Gold from "./component/Gold";
import Silver from "./component/Silver";

function App() {
  // loading
  const [loading, setloading] = useState(true);

  // gold
  const [goldam, setgoldam] = useState([]);
  const [goldpm, setgoldpm] = useState([]);
  // const [gold, setgold] = useState([]);
  const [goldYear, setgoldYear] = useState([]);
  const [filterYear, setFilterYear] = useState("");

  // silver
  const [silver, setsilver] = useState([]);

  const [metaldata, setmetaldata] = useState("gold");

  // handleMetalChange
  const handleMetalChange = (e) => {
    setmetaldata(e.target.value);
    console.log(metaldata);
  };

  // handleselectedYear
  const handleselectedYear = (e) => {
    setFilterYear(e.target.value);
    console.log("yearrrrrrr", filterYear);
  };

  // get unique year
  const getgoldYear = () => {
    // get all year
    let temp = [];
    goldam.map((item) => {
      return temp.push(item.d.slice(0, 4));
    });

    // remove duplicate year
    let uniqueYear = [];
    temp.forEach((c) => {
      if (!uniqueYear.includes(c)) {
        uniqueYear.push(c);
      }
    });
    // set value
    setgoldYear(uniqueYear);
  };

  // getgoldam
  const getgoldam = async () => {
    setloading(true);
    await axios
      .get("https://prices.lbma.org.uk/json/gold_am.json?r=355556583")
      .then(function (response) {
        setgoldam(response.data);
        // console.log("gold am", response.data);
        setloading(false);
        getgoldYear();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  // getgoldpm
  const getgoldpm = async () => {
    setloading(true);
    await axios
      .get("https://prices.lbma.org.uk/json/gold_pm.json?r=205599324")
      .then(function (response) {
        setgoldpm(response.data);
        // console.log("gold pm", response.data);
        setloading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  // silver
  const getsilver = async () => {
    setloading(true);
    await axios
      .get("https://prices.lbma.org.uk/json/silver.json?r=97154045")
      .then(function (response) {
        setsilver(response.data);
        // console.log("silver", response.data);
        setloading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    getgoldam();
    getgoldpm();
    // getsilver();
    // getallGold();
    getgoldYear();
  }, [metaldata]);

  const Row = ({ index, style }) => {
    return (
      <div className="price-wrapper d-flex mt-4" style={style}>
        <div className="am">
          {loading == false
            ? [<h4 className="text-white text-capitalize">data is loading</h4>]
            : goldam
                .filter((year) => year.d.includes("1968"))
                .map((item, index) => {
                  return (
                    <div
                      className="d-flex justify-content-end w-100 mb-4"
                      key={index}
                    >
                      <h5 className="text-uppercase text-white  w-30 text-center">
                        {item.d}
                      </h5>

                      {item.v.map((item2) => {
                        return (
                          <div className="w-100 d-flex justify-content-center">
                            <h5 className="text-uppercase text-white w-100 text-center">
                              {item2}
                            </h5>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
        </div>
        <div className="pm">
          {loading == true
            ? [<h4 className="text-white text-capitalize">data is loading</h4>]
            : goldpm
                .filter((year) => year.d.includes("1968"))
                .map((item, index) => {
                  return (
                    <div
                      className="d-flex justify-content-end w-100 mb-4"
                      key={index}
                    >
                      <h5 className="text-uppercase text-white  w-30 text-center opacity-0">
                        {item.d}
                      </h5>

                      {item.v.map((item2) => {
                        return (
                          <div className="w-100 d-flex justify-content-center">
                            <h5 className="text-uppercase text-white w-100 text-center">
                              {item2}
                            </h5>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="lbma-section">
        <div className="container p-4">
          <div className="table">
            {/* navbar */}
            <div className="d-flex mb-5">
              <div className="me-4">
                <select
                  value={metaldata}
                  className="text-white"
                  onChange={handleMetalChange}
                >
                  <option className="text-dark" key={1} defaultValue="gold">
                    Gold
                  </option>
                  <option className="text-dark" key={2} defaultValue="silver">
                    Silver
                  </option>
                  <option
                    className="text-dark"
                    key={3}
                    defaultValue="gofo_libor"
                  >
                    GOFO/LIBOR
                  </option>
                  <option className="text-dark" key={4} defaultValue="platinum">
                    Platinum
                  </option>
                  <option
                    className="text-dark"
                    key={5}
                    defaultValue="palladium"
                  >
                    Palladium
                  </option>
                </select>
              </div>

              <div className="me-4">
                <select className="text-white" onChange={handleselectedYear}>
                  {goldYear.map((item, idx) => {
                    return (
                      <>
                        <option className="text-dark" value={item} key={idx}>
                          {item}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>

              <div className="me-4">
                <button className="text-white btn btn-info">Daily</button>
                <button className="text-white btn btn-info">Monthly</button>
              </div>

              <button className="btn btn-primary">Download data</button>
            </div>

            {/* gold */}
            <Gold
              loading={loading}
              goldam={goldam}
              filterYear={filterYear}
              goldpm={goldpm}
            />

            {/* {metaldata == "gold" ? (
              <Gold
                loading={loading}
                goldam={goldam}
                filterYear={filterYear}
                goldpm={goldpm}
              />
            ) : metaldata == "silver" ? (
              "hello am silver"
            ) : metaldata == "gofo_libor" ? (
              "hello am gofo_libor"
            ) : metaldata == "platinum" ? (
              "hello am platinum"
            ) : metaldata == "palladium" ? (
              "hello am palladium"
            ) : (
              "no data"
            )} */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
