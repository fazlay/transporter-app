import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import axios from "axios";
import TableComponent from "../component/TableComponent";
import Swal from "sweetalert2";
interface MarchentDashboardProps {
  userData: any;
}
const MarchentDashboard: React.FC<MarchentDashboardProps> = ({ userData }) => {
  ///manufacturer-post-order
  const [fromWhere, setFromWhere] = useState<string>("");
  const [toWhere, setToWhere] = useState<string>("");
  const [fetchedOrders, setFetchedOrders] = useState<any[]>([]);
  const [allTransporters, setAllTransporters] = useState<any[]>([]);
  const [selectedTransporter, setSelectedTransporter] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  const handleFromWhere = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromWhere(e.target.value);
  };
  const handleToWhere = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToWhere(e.target.value);
  };
  const handleTransporterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("Transporter", e.target.value);
    setSelectedTransporter(e.target.value);
  };
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ fromWhere, toWhere });
    const orderSubmitPayload: any = {
      from: fromWhere,
      to: toWhere,
      transporter: selectedTransporter,
      address: userData?.address,
      price: null,
    };
    axios
      .post("http://localhost:5000/manufacturer-post-order", orderSubmitPayload)
      .then((res) => {
        console.log({ res });
        if (res?.data?.acknowledged) {
          Swal.fire("Good job!", "You Order is Saved!", "success");
          fetchOrders();
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const fetchOrders = () => {
    axios
      .get("http://localhost:5000/manufacturer-post-order")
      .then((res) => {
        console.log({ res });
        setFetchedOrders(res.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  const fetchAllTransporters = () => {
    axios
      .get("http://localhost:5000/transporter")
      .then((res) => {
        console.log({ res });
        setAllTransporters(res.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  useEffect(() => {
    fetchOrders();
    fetchAllTransporters();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <form className="form-control" onSubmit={handleSubmit}>
          <div className="flex">
            <div className="p-4">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">From Where</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Address "
                  className="input input-bordered w-full max-w-xs"
                  required
                  onChange={handleFromWhere}
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">To Where</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Address "
                  className="input input-bordered w-full max-w-xs"
                  required
                  onChange={handleToWhere}
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Address "
                  className="input input-bordered w-full max-w-xs"
                  required
                  disabled
                  value={userData?.address}
                />
              </div>
            </div>
            <div className="p-4">
              <div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Quantity</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Quantity "
                    className="input input-bordered w-full max-w-xs"
                    required
                    onChange={handleQuantityChange}
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Select Transporter</span>
                    </label>
                    <select
                      className="select select-bordered"
                      onChange={handleTransporterChange}
                    >
                      <option disabled selected>
                        Select One
                      </option>
                      {allTransporters.map((data) => {
                        return <option key={data.name}>{data.name}</option>;
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 mt-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit Order
            </button>
          </div>
        </form>
      </div>
      <TableComponent rowData={fetchedOrders} userData={userData} />
    </div>
  );
};

export default MarchentDashboard;
