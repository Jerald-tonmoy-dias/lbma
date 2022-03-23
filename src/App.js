import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [goldam, setgoldam] = useState([]);

  useEffect(() => {
    axios.get('https://prices.lbma.org.uk/json/gold_am.json?r=20220323160413')
      .then(function (response) {
        // handle success
        setgoldam(response.data)
        console.log("hello", response.data.map((item) => item));
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }, []);


  return (
    <>
      <div className='lbma-section'>
        <div className='container p-4'>
          <div className="table">
            <div className='d-flex'>
              <div className="me-4">
                <select className='text-white'>
                  <option className='text-dark' value="Gold" key="gold">Gold</option>
                  <option className='text-dark' value="Silver" key="silver">Silver</option>
                </select>
              </div>

              <div className="me-4">
                <select className='text-white'>
                  <option className='text-dark' value="2022" key="2022">2022</option>
                  <option className='text-dark' value="2021" key="2021">2021</option>
                </select>
              </div>

              <div className="me-4">
                <button className='text-white btn btn-info'>Daily</button>
                <button className='text-white btn btn-info'>Monthly</button>
              </div>

              <button className="btn btn-primary">
                Download data
              </button>
            </div>

            <h4 className='my-4 text-white'>LBMA Gold Prices</h4>

            <div className="pepper-responsive-table">
              <table className='table table-striped table-hover'>
                <thead>
                  <tr>
                    <th colSpan="2" className="top_th blank_th text-white"></th>
                    <th colSpan="1" className=" text-white">AM</th>
                    <th colSpan="1" className=" text-white">PM</th>
                    {/* <th colSpan="2" className="top_th text-white">USD $</th>
                    <th colSpan="2" className="top_th text-white">GBP £</th>
                    <th colSpan="2" className="top_th text-white">EUR €</th> */}
                  </tr>

                  <tr>
                    <th colSpan="2" className="blank_th text-white"></th>
                    <th colSpan="1" className="top_th text-white">USD $</th>
                    <th colSpan="1" className="top_th text-white">GBP £</th>
                    <th colSpan="1" className="top_th text-white">EUR €</th>
                    {/* <th colSpan="1" className=" text-white">AM</th>
                    <th colSpan="1" className=" text-white">PM</th>
                    <th colSpan="1" className=" text-white">AM</th> */}
                    {/* <th colSpan="1" className=" text-white">PM</th>
                    <th colSpan="1" className=" text-white">AM</th>
                    <th colSpan="1" className=" text-white">PM</th> */}
                  </tr>

                </thead>

                {/* monthly */}
                <tbody>

                  {goldam.map((item) => {
                    return (
                      <>
                        <tr>
                          <td className="-index0 text-white">{item.d}</td>
                          {item.v.map((item2) => {

                            return (
                              <>
                                <td colSpan="1" className="text-white">{item2}</td>
                              </>
                            )


                          })}
                          {/* <td className="-index3 text-white">2039.05</td>
                    <td className="-index4 text-white">1531.02</td>
                    <td className="-index5 text-white">1553.35</td>
                    <td className="-index6 text-white">1849.31</td>
                    <td className="-index7 text-white">1870.22</td> */}
                        </tr>


                      </>
                    )
                  })}
                </tbody>
                {/* monthly */}
                {/* <tbody>
                  <tr>
                    <td className="-index0 text-white">03-2022</td>
                    <td className="-index1 text-white">HIGH</td>
                    <td className="-index2 text-white">2017.15</td>
                    <td className="-index3 text-white">2039.05</td>
                    <td className="-index4 text-white">1531.02</td>
                    <td className="-index5 text-white">1553.35</td>
                    <td className="-index6 text-white">1849.31</td>
                    <td className="-index7 text-white">1870.22</td>
                  </tr>
                  <tr>
                    <td className="-index0 text-white"></td>
                    <td className="-index1 text-white">LOW</td>
                    <td className="-index2 text-white">1918.75</td>
                    <td className="-index3 text-white">1913.20</td>
                    <td className="-index4 text-white">1434.00</td>
                    <td className="-index5 text-white">1435.54</td>
                    <td className="-index6 text-white">1719.57</td>
                    <td className="-index7 text-white">1724.23</td>
                  </tr>
                  <tr>
                    <td className="-index0 text-white"></td>
                    <td className="-index1 text-white">AVG</td>
                    <td className="-index2 text-white">1918.75</td>
                    <td className="-index3 text-white">1913.20</td>
                    <td className="-index4 text-white">1434.00</td>
                    <td className="-index5 text-white">1435.54</td>
                    <td className="-index6 text-white">1719.57</td>
                    <td className="-index7 text-white">1724.23</td>
                  </tr>
                </tbody> */}


              </table>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default App;
