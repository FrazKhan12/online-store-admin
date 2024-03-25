import AdminUserTable from "./components/AdminUserTable";

const AdminUsers = () => {
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        <AdminUserTable />
      </div>
    </div>
  );
};

export default AdminUsers;
