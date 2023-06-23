import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
//import Carousal from '../components/Carousal';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      setFoodItem(data[0]);
      setFoodCat(data[1]);
    } catch (error) {
      console.log("Error fetching food data:", error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-caption" style={{ zIndex: "9" }} />

          <div className="d-flex justify-content-center">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block  w-100"  style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block  w-100"  style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900x700/?biriyani" className="d-block  w-100"  style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className='container'>
        {foodCat.map((category) => (
          <div className='row mb-3' key={category._id}>
            <div className='fs-3 m-3'>{category.CategoryName}</div>
            <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
            {foodItem
              .filter((item) => item.CategoryName === category.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
              .map((item) => (
                <div key={item._id} className="col-12 col-md-6 col-lg-3">
                  <Card
                    foodItem={item}
                    options={item.options[0]}
                  />
                </div>
              ))}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
