import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "./images/undraw_reviews_lp8w.svg";
import { NavLink } from 'react-router-dom';
import axios from "axios";

const Home = () => {
  const [profName, setProfName] = useState('');
  const navigate = useNavigate();

  const handleSearchByProf = () => {  
    navigate(`/searchByProfResult?profName=${encodeURIComponent(profName)}`);
  };

  const handleSearchBySchool = () => {
    navigate('/searchBySchoolResult');
  };

  return (

    <div
      className="mainbody flex flex-col w-[100%] items-center  md:flex-row md:mt-[4rem]  gap-15 justify-between px-20 mx-20"
    >

      <img src={logo} alt="" className="image max-w-[55vw] mt-[2rem] md:max-w-[540px]" />


      <div className="searchtab bg-neutral-100  p-10 rounded-xl mt-[2rem] min-w-[60vw] mb-8 md:min-w-[45vw]" style={{ marginLeft: "0px" }}>
        <div className="text-gray-900  text-2xl sm:text-3xl md:text-4xl  font-medium leading-10 text-center mb-8">
          RATE MY PROF LOGO
        </div>

        <div className="form">
          <label
            htmlFor="profsearch"
            className="block text-gray-900 text-opacity-70 text-[16px] font-normal leading-7"
          >
            Find a Professor
          </label>
          <input
            type="text"
            id="profsearch"
            placeholder="Prof's Name"
            className="rounded-lg w-full px-4 text-gray-900 text-[18px] font-normal leading-loose mb-8"
            value={profName}
            onChange={(e) => setProfName(e.target.value)}
          />
        </div>
        <div className="btns flex-column text-[16px] font-semibold leading-normal">
          <div>


  
              {/* <button className="s_prof mb-8 block w-full text-white bg-gray-900 rounded-[38px] h-12" onClick={handleSubmit}> */}
              <button className="s_prof mb-8 block w-full text-white bg-gray-900 rounded-[38px] h-12" onClick={handleSearchByProf}>
                Search Professor
              </button>

          </div>
          <div>
            <NavLink to="/searchBySchoolResult">
              <button className="s_school mb-8 bg-white rounded-[38px] h-12 w-full">
                Search by School
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
