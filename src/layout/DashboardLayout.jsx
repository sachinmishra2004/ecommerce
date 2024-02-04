import React from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      <Outlet /> {/*yaha se error hai*/}
    </div>
  );
};

export default DashboardLayout;
