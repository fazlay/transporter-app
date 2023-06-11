import React, { useState, useEffect } from "react";
import TableComponent from "../component/TableComponent";
import axios from "axios";
import Navbar from "../component/Navbar";

interface TarnsporterDashboardProps {
  userData: any;
}
const TarnsporterDashboard: React.FC<TarnsporterDashboardProps> = ({
  userData,
}) => {
  const [fetchedOrders, setFetchedOrders] = useState<any[]>([]);
  const fetchOrders = () => {
    axios
      .get(
        `http://localhost:5000/transporter-post-order?transporter=${userData?.name}`
      )
      .then((res) => {
        console.log({ res });
        setFetchedOrders(res.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="pt-24">
        <TableComponent rowData={fetchedOrders} userData={userData} />
      </div>
    </div>
  );
};

export default TarnsporterDashboard;
