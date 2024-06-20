import React, { useEffect, useState } from "react";

import Layout from "../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";

const HomePage = () => {
  const [CatFilter, setCatFilter] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [radio, setRadio] = useState([]);
  // Get all Category
  const GetAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-all-category");
      if (data?.success) {
        setCategory(data?.category)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in getting categorys")
    }
  }

  //  Get All Products
  const GetAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-products");
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong")
    }
  }

  // filer By Category
  const CatFilterProducts = (value, id) => {
    let all = [...CatFilter];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((e) => e !== id)
    }
    setCatFilter(all)
  }

  // Filter functions

  const FilterProducts = async () => {
    try {
      const res = await axios.post(`/api/v1/product/filter-product`, {
        radio,
        CatFilter
      })
      if (res.status == 200) {

        const { data } = res;
        setProducts(data?.products);
      } else {
        console.log('something went wrong, please try again later')
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (!radio.length || !CatFilter.length) GetAllProducts();
    else if (radio.length || CatFilter.length) {
      FilterProducts();
    }
    GetAllCategory();
  }, [radio.length, CatFilter.length])
  return (
    <Layout title={"ALl Products - Best offers "}>
      <div className="row mt-3 " style={{ marginLeft: "10px" }}>
        <div className="col-md-2 ">
          <div className="text-center">
            <h3>Filter By Category</h3>
            <div className="d-flex flex-wrap flex-column ">
              {
                category?.map((item) => (
                  <Checkbox key={item?._id} onChange={(e) => CatFilterProducts(e.target.checked, item?._id)}>{item?.name}</Checkbox>
                ))
              }
            </div>
          </div>
          {/* filter By Prices */}
          <div className="text-center mt-2">
            <h3>Filter By Prices</h3>
            <div className="">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {
                  Prices?.map((item) => (
                    <div key={item?.id}>
                      <Radio value={item?.array} >{item?.name}</Radio>
                    </div>
                  ))
                }
              </Radio.Group>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="text-center">
            <h1>All Products</h1>
          </div>
          {JSON.stringify(radio, null, 4)}
          <div className="d-flex flex-wrap">
            {products?.map((p) => (

              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/get-picture/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                </div>
                <div className="btn">
                  <button className="btn btn-primary ms-1">More Details </button>
                  <button className="btn btn-secondary  ms-1">Add To Cart</button>
                </div>
              </div>

            ))}
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default HomePage;