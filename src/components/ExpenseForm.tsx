import { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import List from "../models/List";
import { categories } from "../services/categoryService";

interface Props {
  categories: readonly string[];
  saveData: (data: List) => void;
}
const schema = z.object({
  description: z.string().min(3, { message: "Minimus 3 characters required." }),
  amount: z
    .number({ invalid_type_error: "Amount field is required" })
    .min(0, { message: "Amount cannot be negative" }),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required." }),
  }),
});
type FormData = z.infer<typeof schema>;
function ExpenseForm({ categories, saveData }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <>
      <h1>Expense Tracker Form</h1>
      <form
        className="form"
        onSubmit={handleSubmit((data) => {
          saveData(data);
          reset();
        })}
      >
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            {...register("description")}
            id="description"
            type="text"
            className="form-control"
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            id="amount"
            type="number"
            className="form-control"
          />
          {errors.amount && (
            <p className="text-danger">{errors.amount.message}</p>
          )}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="dropDown">Category</label>
          <select
            className="form-control"
            id="dropDown"
            {...register("category")}
            onChange={(event) => {
              console.log("yes");
              setSelectedCategory(event.target.value);
            }}
            value={selectedCategory}
          >
            <option value=""></option>
            {categories.map((cat) => (
              <option value={cat} key={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </>
  );
}

export default ExpenseForm;
