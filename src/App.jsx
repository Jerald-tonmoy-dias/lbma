import axios from "axios";
import { FixedSizeList } from "react-window";
import moment from "react-moment";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  // loading
  const [loading, setloading] = useState(true);

  // gold
  const [goldam, setgoldam] = useState([]);
  const [goldpm, setgoldpm] = useState([]);
  const [gold, setgold] = useState([]);
  const [goldYear, setgoldYear] = useState([]);

  // silver
  const [silver, setsilver] = useState([]);

  const [metaldata, setmetaldata] = useState("gold");

  // handleSelectChange
  const handleSelectChange = (e) => {
    setmetaldata(e.target.value);
  };

  // get unique year
  const getgoldYear = () => {
    let temp = [];
    goldam.map((item) => {
      return temp.push(item.d.slice(0, 4));
      // return <moment format="YYYY">temp.push(item.d)</moment>;
    });

    let uniqueYear = [];

    temp.forEach((c) => {
      if (!uniqueYear.includes(c)) {
        uniqueYear.push(c);
      }
    });
    setgoldYear(uniqueYear);
    console.log("eita filter kora temp theke", goldYear);
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

  // all gold
  // const getallGold = () => {

  //   let tempArr = [];

  //   tempArr.push(getgoldam);
  //   tempArr.push(getgoldpm);

  //   setgold(tempArr);
  //   console.log('all gold', gold);
  // }
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

  // get back for todat json
  // https://prices.lbma.org.uk/json/today.json

  useEffect(() => {
    getgoldam();
    getgoldpm();
    getsilver();
    // getallGold();
  }, []);

  getgoldYear();

  const Row = ({ index, style }) => {
    return (
      <div className="price-wrapper d-flex mt-4" style={style}>
        <div className="am">
          {loading == true
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
            <div className="d-flex mb-5">
              <div className="me-4">
                <select className="text-white" onChange={handleSelectChange}>
                  <option className="text-dark" value="gold">
                    Gold
                  </option>
                  <option className="text-dark" value="silver">
                    Silver
                  </option>
                </select>
              </div>

              <div className="me-4">
                <select className="text-white">
                  <option className="text-dark" value="2022" key="2022">
                    2022
                  </option>
                  <option className="text-dark" value="2021" key="2021">
                    2021
                  </option>
                </select>
              </div>

              <div className="me-4">
                <button className="text-white btn btn-info">Daily</button>
                <button className="text-white btn btn-info">Monthly</button>
              </div>

              <button className="btn btn-primary">Download data</button>
            </div>

            <h4 className="my-4 text-white">LBMA Gold Prices</h4>

            <div className="pepper-responsive-table">
              {/* for gold */}
              <div className="gold-wrapper mt-4">
                {/* price header */}
                {/* <div className="gold-header">
                  <div className="custom-col-6 text-center">
                    <h5 className="text-uppercase text-white">am</h5>
                  </div>
                  <div className="custom-col-6 text-center">
                    <h5 className="text-uppercase text-white">pm</h5>
                  </div>
                </div> */}

                {/* price header wrapper */}
                {/* <div className="price-wrapper d-flex mt-4">
                  <div className="am">
                    <h5 className="text-uppercase text-white opacity-0">
                      12/11/5
                    </h5>
                    <h5 className="text-uppercase text-white">USD $</h5>
                    <h5 className="text-uppercase text-white">GBP £</h5>
                    <h5 className="text-uppercase text-white">EUR €</h5>
                  </div>
                  <div className="pm">
                    <h5 className="text-uppercase text-white opacity-0">
                      12/11/5
                    </h5>
                    <h5 className="text-uppercase text-white">USD $</h5>
                    <h5 className="text-uppercase text-white">GBP £</h5>
                    <h5 className="text-uppercase text-white">EUR €</h5>
                  </div>
                </div> */}

                {/* price wrapper */}
                {/* <FixedSizeList height={600} itemCount={10} itemSize={100}> */}
                {/* {Row} */}
                {/* </FixedSizeList> */}

                {/* <div className="price-wrapper d-flex mt-4">
                  <div className="am">
                    {loading == true
                      ? [
                          <h4 className="text-white text-capitalize">
                            data is loading
                          </h4>,
                        ]
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
                      ? [
                          <h4 className="text-white text-capitalize">
                            data is loading
                          </h4>,
                        ]
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
