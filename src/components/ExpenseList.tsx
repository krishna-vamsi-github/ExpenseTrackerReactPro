import { useState } from "react";
import List from "../models/List";

interface Props {
  listArray: List[];
  sortAmount: () => void;
}

function ExpenseList({
  listArray,
  sortAmount
}: Props) {
  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th onClick={sortAmount}>Amount</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {listArray.map((item, index) => (
            <tr key={index + 1}>
              <td>{item.description}</td>
              <td>{item.amount}</td>
              <td>{item.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ExpenseList;
