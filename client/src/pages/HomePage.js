import React from "react";
import Layout from "./../components/Layout/Layout";
import { useAuth } from "../context/authContext";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title="EcommeApp Shop-Now">
      <h1>HomePage</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default HomePage;
