import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
interface TableComponentProps {
  rowData: any[];
  userData: any;
}

const TableComponent: React.FC<TableComponentProps> = ({
  rowData,
  userData,
}) => {
  const [orderPrice, setOrderPrice] = useState<string>("");
  const handleSetorderPrice = (e: React.ChangeEvent<HTMLInputElement>, id) => {
    const orderSubmitPayload: any = {
      orderId: id,
      price: orderPrice,
    };
    axios
      .put(`http://localhost:5000/manufacturer-post-order`, orderSubmitPayload)
      .then((res) => {
        console.log({ res });
        if (res.data.acknowledged) {
          Swal.fire("Good job!", "You Price is Sent!", "success");
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>From</th>
            <th>To</th>
            <th>Transporter</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rowData.map((data) => {
            return (
              <tr>
                <th>{data?._id}</th>
                <td>{data?.from}</td>
                <td>{data?.to}</td>
                <td>{data?.transporter}</td>
                <td>
                  <div>
                    {data?.price || (
                      <>
                        {userData?.role === "Transporter" ? (
                          <>
                            <input
                              type="number"
                              className="ml-0 p-2"
                              placeholder="Set Price"
                              onChange={(e) => setOrderPrice(e.target.value)}
                            />
                            <button
                              className="btn btn-primary ml-5 my-5"
                              onClick={(e) => handleSetorderPrice(e, data?._id)}
                            >
                              Set
                            </button>
                          </>
                        ) : (
                          "Not Set"
                        )}
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
