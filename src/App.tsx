import { useEffect, useState } from "react";
import axiosClient, { CanceledError } from "./services/apiClientService";
import userService, { User } from "./services/user-service";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAllUsers();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    // .finally(() => setLoading(false));
    return () => cancel();
  }, []);
  const deleteItem = (id: number) => {
    const originalUsers = [...users];
    setUsers(users.filter((user) => user.id !== id));
    userService.deleteUser(id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };
  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Thala" };
    setUsers([newUser, ...users]);
    userService
      .addUser(newUser)
      .then(({ data: savedData }) => {
        console.log(savedData);
      })
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };
  const updateItem = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: "Mr./Mrs. " + user.name };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    userService.updateUser(user.id, updatedUser).catch((err) => {
      setError(err.name);
      setUsers(originalUsers);
    });
  };
  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-success mb-3" onClick={addUser}>
        Add User
      </button>
      <div className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}{" "}
            <div>
              <button
                className="btn btn-outline-primary mx-3"
                onClick={() => updateItem(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteItem(user.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </div>
    </>
  );
}
export default App;
