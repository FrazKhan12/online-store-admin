import RolesTable from "./components/RoleTable";

const Roles = () => {
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        <RolesTable />
      </div>
    </div>
  );
};

export default Roles;
