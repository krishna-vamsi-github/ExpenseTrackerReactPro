interface Props {
  categories: readonly string[];
  selectedCategory: string;
  changeCategory: (value: string) => void;
}
const ExpensesFilter = ({
  categories,
  selectedCategory,
  changeCategory,
}: Props) => {
  return (
    <>
      <select
        className="form-control"
        name="select"
        value={selectedCategory}
        onChange={(event) => changeCategory(event.target.value)}
      >
        <option key={"All Category"} value="">
          All Category
        </option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </>
  );
};

export default ExpensesFilter;
