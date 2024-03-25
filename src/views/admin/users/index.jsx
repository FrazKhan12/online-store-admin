import UserTable from "./components/UserTable";

const Users = () => {
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        <UserTable />
      </div>
    </div>
  );
};

export default Users;
