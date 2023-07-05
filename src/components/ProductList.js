import "../components/ProductList.css";
import img from "../assets/buildingImg.webp";
import heart from "../assets/heart.svg"
import serachIcon from "../assets/searchIcon.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MultiRangeSlider from "multi-range-slider-react";
import priceTage from "../assets/priceTag.webp";
import fuelImg from "../assets/fuel.webp";
import RTOimage from "../assets/RTO.webp";
import modalYearImg from "../assets/modalYear.webp";
import TransmissionImg from "../assets/transmisson.webp";
import ownerImg from "../assets/owner.webp";
import kmsImg from "../assets/kmsdriven.webp";
import redSearchIcon from "../assets/redSearchIcon.svg"



const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [filters, setFilters] = useState({
    "Hyundai Creta": false,
    "Renault Kwid": false,
    "Maruti Baleno": false,
    "Tata Tiago": false,
    "Kia Seltos": false,
    "Hyundai Elite i20": false,
    "Maruti New Wagon-R": false,
    "Mahindra Thar": false,
    "Hyundai i20": false,
    "Tata Zest": false,
    "Hyundai Verna": false,

    "Hyundai": false,
    "Mahindra": false,
    "Kia": false,
    "Maruti": false,
    "Tata": false,
    "PETROL": false,
    "CNG": false,
    "Diesel": false,
    "HR-26": false,
    "HR-30": false,
    "HR": false,
    "DL": false,
    "Manual": false,
    "Automatic": false,
    "1ST OWNER": false,
    "2ND OWNER": false,

  });

  const [initialProductList, setInitialProductList] = useState([]); // New state to store the initially fetched product list

  const [minValue, set_minValue] = useState(100000);
  const [maxValue, set_maxValue] = useState(2000000);
  const [minValue1, set_minValue1] = useState(2010);
  const [maxValue1, set_maxValue1] = useState(2023);
  const [minValue2, set_minValue2] = useState(0);
  const [maxValue2, set_maxValue2] = useState(140000);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen11, setIsOpen11] = useState(false);
  const [isOpen12, setIsOpen12] = useState(false);
  const [isOpen13, setIsOpen13] = useState(false);



  const [underThreeLakh, setUnderThreeLakh] = useState(false); // Step 1: New state variable
  const [aboveTenLakh, setAboveTenLakh] = useState(false);
  const [threeToFiveLakh, setThreeToFiveLakh] = useState(false)
  const [fiveToSevenLakh, setFiveToSevenLakh] = useState(false);
  const [sevenToTenLakh, setSevenToTenLakh] = useState(false);
  const [isOpenFuel, setIsOpenFuel] = useState(false);
  const [isOpenModalYear, setIsOpenModalYear] = useState(false);
  const [isOpenRTO, setIsOpenRTO] = useState(false);
  const [isOpenTransmission, setIsOpenTransmission] = useState(false);
  const [isOpenOwner, setIsOpenOwner] = useState(false);
  const [isOpenKMS, setIsOpenKMS] = useState(false);

  const productsCount = productList.length;




  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleToggle1 = () => {
    setIsOpen1(!isOpen1);
  };
  const handleToggle11 = () => {
    setIsOpen11(!isOpen11);
  };

  const handleToggle12 = () => {
    setIsOpen12(!isOpen12);
  };

  const handleToggle13 = () => {
    setIsOpen13(!isOpen13);
  };

  const handleToggle2 = () => {
    setIsOpen2(!isOpen2);
  };
  const handleToggle3 = () => {
    setIsOpen3(!isOpen3);
  };
  const handleToggle4 = () => {
    setIsOpen4(!isOpen4);
  };

  const handleToggleFuel = () => {
    setIsOpenFuel(!isOpenFuel);
  };

  const handleToggleModalYear = () => {
    setIsOpenModalYear(!isOpenModalYear);
  };

  const handleToggleRTO = () => {
    setIsOpenRTO(!isOpenRTO);
  };

  const handleToggleTransmisson = () => {
    setIsOpenTransmission(!isOpenTransmission);
  };

  const handleToggleOwner = () => {
    setIsOpenOwner(!isOpenOwner);
  };

  const handleToggleKMS = () => {
    setIsOpenKMS(!isOpenKMS);
  };



  useEffect(() => {
    getJobs();
  }, []);


  const getJobs = async () => {
    try {
      const response = await axios.get("https://phase1-zpnw.onrender.com/products");
      setProductList(response.data);
      setInitialProductList(response.data); // Store the initially fetched product list
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  const handleBrandCheckboxChange1 = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };


  useEffect(() => {
    filterProducts();
  }, [filters, minValue, maxValue, minValue1, maxValue1, minValue2, maxValue2, underThreeLakh, aboveTenLakh, threeToFiveLakh, fiveToSevenLakh, sevenToTenLakh]); // Include minValue and maxValue in the dependency array

  const filterProducts = () => {
    try {
      const selectedBrands = Object.keys(filters).filter((filter) => filters[filter]);
      let filteredProducts = [...initialProductList];

      if (selectedBrands.length > 0) {
        filteredProducts = filteredProducts.filter(
          (item) => selectedBrands.includes(item.ModalName) || selectedBrands.includes(item.Brand) || selectedBrands.includes(item.CarCatogaries2) || selectedBrands.includes(item.CarCatogaries3) || selectedBrands.includes(item.RTO) || selectedBrands.includes(item.CarCatogaries4) || selectedBrands.includes(item.Transmission)

        );
      }



      filteredProducts = filteredProducts.filter((item) => {
        const price = parseInt(item.Price.replace(/\D/g, ""));
        return price >= minValue && price <= maxValue;
      });

      filteredProducts = filteredProducts.filter((item) => {
        const carCatogaries1 = parseInt(item.CarCatogaries1.replace(/\D/g, ""));
        return carCatogaries1 >= minValue2 && carCatogaries1 <= maxValue2;
      });

      const minValueAsNumber = parseInt(minValue1, 10);
      const maxValueAsNumber = parseInt(maxValue1, 10);
      console.log("Parsed values:", minValueAsNumber, maxValueAsNumber);

      if (isNaN(minValueAsNumber) || isNaN(maxValueAsNumber)) {
        set_minValue1(2010);
        set_maxValue1(2023);
        return; // Stop filtering as the values are invalid
      }

      // Apply the additional filter for the years
      filteredProducts = filteredProducts.filter(
        (item) => item.ModalYear >= minValueAsNumber && item.ModalYear <= maxValueAsNumber
      );







      if (underThreeLakh) {
        filteredProducts = filteredProducts.filter((item) => {
          const price = parseInt(item.Price.replace(/\D/g, ""));
          return price < 300000;
        });
      }

      if (aboveTenLakh) {
        filteredProducts = filteredProducts.filter((item) => {
          const price = parseInt(item.Price.replace(/\D/g, ""));
          return price > 1000000;
        });
      }

      if (threeToFiveLakh) {
        filteredProducts = filteredProducts.filter((item) => {
          const price = parseInt(item.Price.replace(/\D/g, ""));
          return price >= 300000 && price <= 500000;
        });
      }

      if (fiveToSevenLakh) {
        filteredProducts = filteredProducts.filter((item) => {
          const price = parseInt(item.Price.replace(/\D/g, ""));
          return price >= 500000 && price <= 700000;
        });
      }

      if (sevenToTenLakh) {
        filteredProducts = filteredProducts.filter((item) => {
          const price = parseInt(item.Price.replace(/\D/g, ""));
          return price >= 700000 && price <= 1000000;
        });
      }

      if (fiveToSevenLakh) {
        filteredProducts = filteredProducts.filter((item) => {
          const price = parseInt(item.Price.replace(/\D/g, ""));
          return price >= 500000 && price <= 700000;
        });
      }


      setProductList(filteredProducts);
    } catch (error) {
      console.error("Error filtering products:", error);
    }
  };



  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  const handleInput2 = (e) => {
    set_minValue2(e.minValue);
    set_maxValue2(e.maxValue);
  };

  const handleInput1 = (e) => {
    const minValue = parseInt(e.minValue, 10);
    const maxValue = parseInt(e.maxValue, 10);
    set_minValue1(minValue);
    set_maxValue1(maxValue);
  };


  const formatNumberWithCommas = (number) => {
    return number.toLocaleString("en-IN");
  };

  const formatNumberWithCommas2 = (number) => {
    return number.toLocaleString("en-IN");
  };

  const formatNumberWithCommas1 = (number) => {
    if (typeof number === "number") {
      return String(number); // Return the number as a string without formatting
    } else {
      return "Invalid Number";
    }
  };


  const handleUserRTOSearch = async (event) => {
    let key = event.target.value;
    if (key) {
      try {
        const response = await axios.get(`https://phase1-zpnw.onrender.com/search/${key}`);
        setProductList(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      getJobs();
    }
  };



  return (
    <div>

      <div className="filters">
        <p className="textFilter">FILTERS</p>
        <p className="text1">MAKE & MODEL</p>
        <img src={img} className="building" alt="" />
        <div className="AllFilter">
          <input type="text" placeholder="search by brand or model" className="search1" onChange={handleUserRTOSearch} />
          <img src={serachIcon} className="searchIcon" alt="" />
          <div className="brandSection">
            <p className="text2">SUGGESTIONS</p>
            <label className="checkBox1">
              <input
                type="checkbox"
                name="Hyundai Creta"
                className="box1"
                checked={filters["Hyundai Creta"]}
                onChange={handleCheckboxChange}
              />
              Hyundai Creta(1)
            </label>

            <label className="checkBox2">
              <input
                type="checkbox"
                name="Renault Kwid"
                className="box2"
                checked={filters["Renault Kwid"]}
                onChange={handleCheckboxChange}
              />
              Renault Kwid(1)
            </label>

            <label className="checkBox3">
              <input
                type="checkbox"
                name="Maruti Baleno"
                className="box3"
                checked={filters["Maruti Baleno"]}
                onChange={handleCheckboxChange}
              />
              Maruti Baleno(1)
            </label>

            <label className="checkBox4">
              <input
                type="checkbox"
                name="Tata Tiago"
                className="box4"
                checked={filters["Tata Tiago"]}
                onChange={handleCheckboxChange}
              />
              Tata Tiago(1)
            </label>

            <label className="checkBox5">
              <input
                type="checkbox"
                name="Kia Seltos"
                className="box5"
                checked={filters["Kia Seltos"]}
                onChange={handleCheckboxChange}
              />
              KiaSeltos(1)
            </label>

            <label className="checkBox6">
              <input
                type="checkbox"
                name="Mahindra Thar"
                className="box6"
                checked={filters["Mahindra Thar"]}
                onChange={handleCheckboxChange}
              />
              Mahindra Thar(1)
            </label>

              <p className="text3">ALL BRANDS</p>
              <div className="checkbox-dropdown1">
                <input type="checkbox" name="Hyundai" checked={filters["Hyundai"]} onChange={handleBrandCheckboxChange1}
                  className="checkName1" />
                <button className="toggleButton1" onClick={handleToggle}>
                  Hyundai(5)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {isOpen ? " ▲" : "▼"}
                </button>
                {isOpen && (
                  <div className="dropdown-content">
                    <div>
                      <label>
                        <input type="checkbox" name="Hyundai Creta" checked={filters["Hyundai Creta"]} onChange={handleCheckboxChange} />
                        Creta
                      </label>
                    </div>
                    <div>
                      <label>
                        <input type="checkbox" name="Hyundai Verna" checked={filters["Hyundai Verna"]} onChange={handleCheckboxChange} value="Option 2" />
                        Verna
                      </label>
                    </div>
                    <div>
                      <label>
                        <input type="checkbox" name="Hyundai i20" checked={filters["Hyundai i20"]} onChange={handleCheckboxChange} value="Option 3" className="i20Class" />
                        i20
                      </label>
                    </div>
                    <div>
                      <label>
                        <input type="checkbox" name="Hyundai Elite i20" checked={filters["Hyundai Elite i20"]} onChange={handleCheckboxChange} value="Option 4" className="i20Elite" />
                        Elite i20
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <div className="checkbox-dropdown2">
                <input type="checkbox" name="Kia" checked={filters["Kia"]} onChange={handleBrandCheckboxChange1}
                  className="checkName2" />
                <button className="toggleButton2" onClick={handleToggle1}>
                  Kia(1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {isOpen1 ? " ▲" : "▼"}
                </button>
                {isOpen1 && (
                  <div className="dropdown-content">
                    <div>
                      <label>
                        <input type="checkbox" name="Kia Seltos" checked={filters["Kia Seltos"]} onChange={handleCheckboxChange} value="Option 1" />
                        Seltos(1)
                      </label>
                    </div>

                  </div>
                )}
              </div>
              <div className="checkbox-dropdown3">
                <input type="checkbox" name="Tata" checked={filters["Tata"]} onChange={handleBrandCheckboxChange1} className="checkName3" />
                <button className="toggleButton3" onClick={handleToggle2}>
                  Tata(2)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {isOpen2 ? " ▲" : "▼"}
                </button>
                {isOpen2 && (
                  <div className="dropdown-content">
                    <div>
                      <label>
                        <input type="checkbox" name="Tata Zest" checked={filters["Tata Zest"]} onChange={handleCheckboxChange} value="Option 1" />
                        Zest(1)
                      </label>
                    </div>
                    <div>
                      <label>
                        <input type="checkbox" name="Tata Tiago" checked={filters["Tata Tiago"]} onChange={handleCheckboxChange} value="Option 2" />
                        Tiago(2)
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <div className="checkbox-dropdown4">
                <input type="checkbox" name="Maruti" checked={filters["Maruti"]} onChange={handleBrandCheckboxChange1} className="checkName4" />
                <button className="toggleButton4" onClick={handleToggle3}>
                  Maruti(2)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {isOpen3 ? " ▲" : "▼"}
                </button>
                {isOpen3 && (
                  <div className="dropdown-content">
                    <div>
                      <label>
                        <input type="checkbox" name="Maruti Baleno" checked={filters["Maruti Baleno"]} onChange={handleCheckboxChange} value="Option 1" />
                        Baleno(1)
                      </label>
                    </div>
                    <div>
                      <label>
                        <input type="checkbox" name="Maruti New Wagon-R" checked={filters["Maruti New Wagon-R"]} onChange={handleCheckboxChange} value="Option 2" />
                        New Wagon-R(1)
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <div className="checkbox-dropdown5">
                <input type="checkbox" name="Mahindra" checked={filters["Mahindra"]} onChange={handleBrandCheckboxChange1} className="checkName5" />
                <button className="toggleButton5" onClick={handleToggle4}>
                  Mahindra(1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {isOpen4 ? " ▲" : "▼"}
                </button>
                {isOpen4 && (
                  <div className="dropdown-content">
                    <div>
                      <label>
                        <input type="checkbox" name="Mahindra Thar" checked={filters["Mahindra Thar"]} onChange={handleCheckboxChange} value="Option 1" />
                        Thar(1)
                      </label>
                    </div>
                  </div>
                )}
              </div>


          </div>
          <img src={priceTage} className="tag" alt="" />
          <p className="budget">BUDGET</p>
          <MultiRangeSlider
            className="slider"
            min={100000}
            max={1500000}
            step={50000}
            minValue={minValue}
            maxValue={maxValue}
            onInput={(e) => {
              handleInput(e);
            }}
          />
          <p className="overWord">min</p>
          <p className="overWord2">max</p>
          <p className="minValue">₹{formatNumberWithCommas(minValue)}</p>
          <p className="maxValue">₹{formatNumberWithCommas(maxValue)}</p>
        </div>

        <p className="suggestionText">SUGGESTIONS</p>
        <label className="Under3Lakh" onClick={() => setUnderThreeLakh(!underThreeLakh)}>
          Under 3 Lakh
        </label>

        <label className="threeToFiveLakh" onClick={() => setThreeToFiveLakh(!threeToFiveLakh)}>
          From 3 lakh - 5 lakh
        </label>

        <label className="fiveToSevenLakh" onClick={() => setFiveToSevenLakh(!fiveToSevenLakh)}>
          From 5 lakh - 7 lakh
        </label>

        <label className="sevenTOTenLakh" onClick={() => setSevenToTenLakh(!sevenToTenLakh)}>
          From 7 lakh - 10 lakh
        </label>

        <label className="aboveTenLakh" onClick={() => setAboveTenLakh(!aboveTenLakh)}>
          Above 10 lakh
        </label>

        <div className="fuelSection">
          <img src={fuelImg} className="fuelImg" alt="" />
          <button className="toggleButtonForFuel" onClick={handleToggleFuel}>
            FUEL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {isOpenFuel ? " ▲" : "▼"}
          </button>
          {isOpenFuel && (
            <div className="dropdown-content">
              <div>
                <label>
                  <input type="checkbox" name="PETROL" checked={filters["PETROL"]} onChange={handleBrandCheckboxChange1} value="Option 1" />
                  Petrol(7)
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox" name="CNG" checked={filters["CNG"]} onChange={handleBrandCheckboxChange1} value="Option 1" />
                  CNG(2)
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox" name="Diesel" checked={filters["Diesel"]} onChange={handleBrandCheckboxChange1} value="Option 1" />
                  Diesel(3)
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="modalYearSection">
          <img src={modalYearImg} className="modalYearImg" alt="" />
          <button className="toggleButtonForFuel1" onClick={handleToggleModalYear}>
            MODAL YEAR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {isOpenModalYear ? " ▲" : "▼"}
          </button>
          {isOpenModalYear && (
            <div className="dropdown-content">
              <MultiRangeSlider
                className="slider1"
                min={2010}
                max={2023}
                step={1}
                minValue={minValue1}
                maxValue={maxValue1}
                onInput={handleInput1}

              />
              <p className="overWord1">min</p>
              <p className="overWord22">max</p>
              <p className="minValue">{formatNumberWithCommas1(minValue1)}</p>
              <p className="maxValue">{formatNumberWithCommas1(maxValue1)}</p>

            </div>
          )}

        </div>

        <div className="RTOSection">
          <img src={RTOimage} className="RtoImage" alt="" />
          <button className="toggleButtonForRto" onClick={handleToggleRTO}>
            RTO&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {isOpenRTO ? " ▲" : "▼"}
          </button>
          {isOpenRTO && (
            <div className="dropdown-content">
              <input src="text" placeholder="Search by RTO" className="searchRTO" onChange={handleUserRTOSearch} />
              <img src={serachIcon} className="searching1" alt="" />
              <div className="checkbox-dropdown21">
                <input type="checkbox" name="HR" checked={filters["HR"]} onChange={handleBrandCheckboxChange1}
                  className="checkName11" />
                <button className="toggleButton11" onClick={handleToggle11}>
                  HR(4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {isOpen11 ? " ▲" : "▼"}
                </button>
                {isOpen11 && (
                  <div className="dropdown-content00">
                    <di>
                      <label>
                        <input type="checkbox" name="HR-26" checked={filters["HR-26"]} onChange={handleBrandCheckboxChange1} value="Option 2" />
                        HR 26 - Gurgaon(2)
                      </label>
                    </di>
                    <div>
                      <label>
                        <input type="checkbox" name="HR-30" checked={filters["HR-30"]} onChange={handleBrandCheckboxChange1} value="Option 2" />
                        HR 30 - Faridabad(1)
                      </label>
                    </div>

                  </div>
                )}
              </div>

              <div className="checkbox-dropdown22">
                <input type="checkbox" name="DL" checked={filters["DL"]} onChange={handleBrandCheckboxChange1}
                  className="checkName12" />
                <button className="toggleButton12" onClick={handleToggle12}>
                  DL(8)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {isOpen12 ? " ▲" : "▼"}
                </button>
                {isOpen12 && (
                  <div className="dropdown-content0011">
                    <di>
                      <label>
                        <input type="checkbox" name="DL-3C" checked={filters["DL-3C"]} onChange={handleCheckboxChange} />
                        DL 3C - Noida(2)
                      </label>
                    </di>
                    <div>
                      <label>
                        <input type="checkbox" name="DL-10" checked={filters["DL-10"]} onChange={handleCheckboxChange} value="Option 2" />
                        DL 10 - Gaziabad(2)
                      </label>
                    </div>

                  </div>
                )}
              </div>

            </div>
          )}



        </div>

        <div className="TransmissionSection">
          <img src={TransmissionImg} className="transmissionImg" alt="" />
          <button className="toggleButton13" onClick={handleToggle4}>
            TRANSMISSION&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {isOpen4 ? " ▲" : "▼"}
          </button>
          {isOpen4 && (
            <div className="dropdown-content0012">
              <div>
                <label>
                  <input type="checkbox" name="Manual" checked={filters["Manual"]} onChange={handleCheckboxChange} value="Option 1" />
                  Manual(10)
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox" name="Automatic" checked={filters["Automatic"]} onChange={handleCheckboxChange} value="Option 1" />
                  Automatic(2)
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="ownerSection">
          <img src={ownerImg} className="ownerImg" alt="" />
          <button className="toggleButton14" onClick={handleToggle13}>
            OWNER&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {isOpen13 ? " ▲" : "▼"}
          </button>
          {isOpen13 && (
            <div className="dropdown-content0012">
              <div>
                <label>
                  <input type="checkbox" name="1ST OWNER" checked={filters["1ST OWNER"]} onChange={handleCheckboxChange} value="Option 1" />
                  1ST OWNER(7)
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox" name="2ND OWNER" checked={filters["2ND OWNER"]} onChange={handleCheckboxChange} value="Option 1" />
                  2ND OWNER(5)
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="kmsSection">
          <img src={kmsImg} className="kmsImg" alt="" />

          <button className="toggleButtonKMS" onClick={handleToggleKMS}>
            KMS DRIVEN&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {isOpenKMS ? " ▲" : "▼"}
          </button>
          {isOpenKMS && (
            <div className="dropdown-content13">
              <MultiRangeSlider
                className="slider2"
                min={0}
                max={140000}
                step={10000}
                minValue={minValue2}
                maxValue={maxValue2}
                onInput={handleInput2}

              />
              <p className="overWord11">min</p>
              <p className="overWord23">max</p>
              <p className="minValue22">{formatNumberWithCommas2(minValue2)} KM</p>
              <p className="maxValue22">{formatNumberWithCommas2(maxValue2)} KM</p>

            </div>
          )}

        </div>


      </div>

      <div className="searchPortion">
        <input type="text" placeholder="Search for your favourite cars......." className="mainSearch" autoFocus onChange={handleUserRTOSearch} />
        <img src={redSearchIcon} className="redIcon" alt="" />
        <p className="productsLength">{productsCount}  Used cars in New Delhi</p>

      </div>

      <div className="products">
        {productList.length > 0 ? (
          <ul>
            {productList.map((item, index) => (
              <li className="productFormate" key={index}>
                <img src={item.CarImageURL} className="carImage" alt="" />
                <p className="modalYear">{item.ModalYear}</p>
                <p className="modalName">{item.ModalName}</p>
                <p className="FluidType">{item.FluidType} </p>
                <p className="dot">.</p>
                <p className="Transmission">{item.Transmission}</p>
                <p className="CarCatogaries1">{item.CarCatogaries1} KM</p>
                <p className="CarCatogaries2">{item.CarCatogaries2}</p>
                <p className="CarCatogaries3">{item.CarCatogaries3}</p>
                <p className="CarCatogaries4">{item.CarCatogaries4}</p>
                <p className="EMI">{item.EMI}</p>
                <p className="Price">{item.Price}</p>
                <img src={heart} className="heart" alt="" />



              </li>
              
            ))}

          </ul>
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
      
    </div>
  )
}

export default ProductList
