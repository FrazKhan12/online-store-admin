import CategoriesTable from "./components/CategoriesTable";

const Categories = () => {
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        <CategoriesTable />
      </div>
    </div>
  );
};

export default Categories;
