const expenseList = [
  {
    id: 1,
    description: "Electricity",
    amount: 5,
    category: "Utilities",
  },
  {
    id: 2,
    description: "Milk",
    amount: 2,
    category: "Groceries",
  },
  {
    id: 3,
    description: "Movies",
    amount: 6,
    category: "Entertainment",
  },
  {
    id: 4,
    description: "Milk",
    amount: 1,
    category: "Groceries",
  },
];

export default function getExpensesList() {
    return expenseList;
}
