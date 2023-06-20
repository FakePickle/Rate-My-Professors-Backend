import React from 'react';
import "../App.css";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

const Home = () => {
  let url = "http://127.0.0.1:8000/home/check"
  const handleSubmit = async () => {
    try{
      await axios.post(url, "Data has been posted");
    }
    catch(error){
      console.error(error);
    }
    
  }
  return (
    <>
      <div
      style={{
        backgroundImage: "url(https://mdbcdn.b-cdn.net/img/new/fluid/nature/012.webp)",
        backgroundSize: "cover",
        height: "100vh",
        
      }}
    >
      <section className="intro" style={{margin:0,padding:0}}>
        
          <div className="mask d-flex align-items-center h-100">
            <div className="container">
              <div className="card mask-custom p-4">
                <div className="card-body">
                  <p className="h1 font-weight-bold mb-4 text-white">Find Your Professor</p>
                  <div className="row justify-content-center">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <div  className="form-outline form-white">
                        <input type="text" id="form1" className="form-control form-control-lg" placeholder="Professor's Name" autoComplete='off'/>
                        {/* <label className="form-label" htmlfor="form1"><b>Professor's Name</b></label> */}
                      </div>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0">
                      <div className="form-outline form-white">
                      <input type="text" id="form1" className="form-control form-control-lg" placeholder="College's Name" autoComplete='off'/>
                        {/* <label className="form-label" htmlfor="form2"><b>College's Name</b></label> */}
                      </div>
                    </div>
                    <div className="col-md-2">
                      <input className="btn btn-info btn-block btn-lg" onClick={handleSubmit} type="submit" value="Search" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
      </section>
      
      </div>
    </>
  );
};

export default Home;
