import React from "react";

export default function Silver({ loading, silver, filterYear }) {
  return (
    <>
      <h4 className="my-4 text-white">LBMA Gold Prices</h4>
      <div className="pepper-responsive-table">
        {/* for gold */}
        <div className="gold-wrapper mt-4">
          {/* price header */}
          <div className="gold-header">
            <div className="custom-col-6 text-center">
              <h5 className="text-uppercase text-white">am</h5>
            </div>
            <div className="custom-col-6 text-center">
              <h5 className="text-uppercase text-white">pm</h5>
            </div>
          </div>

          {/* price header wrapper */}
          <div className="price-wrapper d-flex mt-4">
            <div className="am">
              <h5 className="text-uppercase text-white opacity-0">12/11/5</h5>
              <h5 className="text-uppercase text-white">USD $</h5>
              <h5 className="text-uppercase text-white">GBP £</h5>
              <h5 className="text-uppercase text-white">EUR €</h5>
            </div>
            <div className="pm">
              <h5 className="text-uppercase text-white opacity-0">12/11/5</h5>
              <h5 className="text-uppercase text-white">USD $</h5>
              <h5 className="text-uppercase text-white">GBP £</h5>
              <h5 className="text-uppercase text-white">EUR €</h5>
            </div>
          </div>

          {/* price wrapper */}
          {/* <FixedSizeList height={600} itemCount={10} itemSize={100}>
                  {Row}
                </FixedSizeList> */}

          <div className="price-wrapper d-flex mt-4">
            <h3>hello there</h3>
            {/* <div className="am">
              {loading == true
                ? [
                    <h4 className="text-white text-capitalize">
                      data is loading
                    </h4>,
                  ]
                : goldam
                    .filter((year) => year.d.includes(filterYear))
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
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
