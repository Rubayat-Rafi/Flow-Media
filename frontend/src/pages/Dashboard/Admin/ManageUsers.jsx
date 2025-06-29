import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useAuth } from "../../../hooks/useAuth";
import { Helmet } from "react-helmet";
import { MdDeleteForever } from "react-icons/md";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/users/${user?.email}`);
      return data;
    },
  });

  const handleRoleChange = async (user, newRole) => {
    try {
      await axiosSecure.patch(`/api/users/role/${user._id}`, { role: newRole });
      // Optionally refetch users or update state
      refetch();
      alert("user role updated");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const res = await axiosSecure.delete(`/api/user/${id}`);
      alert(res.data.message);
      refetch();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Manage Users</title>
      </Helmet>
      <div className="mt-10">
        <h4 className="text-2xl font-bold text-center mb-8">User data</h4>

        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-[var(--secondary)]">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Subscribtion</th>
                <th>Role</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users.map((user, index) => (
                <tr key={user?.id}>
                  <th>{index + 1}</th>
                  <td className="uppercase">{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.subscribe ? "True" : "False"}</td>
                  <td>
                    <select
                      value={user?.role}
                      onChange={(e) => handleRoleChange(user, e.target.value)}
                      className="bg-[var(--secondary)] border rounded px-2 py-1"
                    >
                      <option value="admin">Admin</option>
                      <option value="affiliate">Affiliate</option>
                      <option value="user">User</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user?._id)}
                      className="bg-red-500 hover:bg-red-600 py-1.5 px-4 cursor-pointer"
                    >
                      <MdDeleteForever className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
