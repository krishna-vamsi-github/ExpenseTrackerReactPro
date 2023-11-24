import { useState } from "react";
import List from "../models/List";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import getExpensesList from "../services/expenseService";
import {categories} from "../services/categoryService";
import ExpensesFilter from "./ExpensesFilter";

function ExpensesTracker() {
  const [listArray, setListArray] = useState<List[]>(getExpensesList());
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  console.log("rendering data", listArray, selectedCategory);
  const filteredExpenses = selectedCategory
    ? listArray.filter((expense) => expense.category === selectedCategory)
    : listArray;
  const sortAmount = () => {
    let arr = [...listArray];
    arr = arr.sort((a, b) => a.amount - b.amount);
    setListArray(arr);
  };
  const handleChangeCategory = (value: string) => {
    setSelectedCategory(value);
  };
  
  return (
    <>
      <div className="mb-3">
        <ExpenseForm categories={categories} saveData={data => setListArray([...listArray,{...data,id: listArray.length+1}])} />
      </div>
      <div className="mb-3">
        <ExpensesFilter
          categories={categories}
          selectedCategory={selectedCategory}
          changeCategory={handleChangeCategory}
        />
      </div>
      <ExpenseList listArray={filteredExpenses} sortAmount={sortAmount} />
    </>
  );
}

export default ExpensesTracker;
