import React from "react";
import { Layout } from "../components/Layout";

function about() {
  return (
    <Layout>
      <div className="text-center p-10">

      <h1 className="font-bold text-2xl my-4">About</h1>

      <p className="text-gray-300">
        Simple CRUD application with sort and search feature
      </p>
      </div>
    </Layout>
  );
}

export default about;
