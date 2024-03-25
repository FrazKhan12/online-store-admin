import TotalSpent from "views/admin/dashboard/components/TotalSpent";
import PieChartCard from "views/admin/dashboard/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { MdBarChart } from "react-icons/md";

import Widget from "components/widget/Widget";
import { useEffect, useState } from "react";
import { getUsers } from "actions/userActions";
import { getAllProducts } from "actions/productActions";

const Dashboard = () => {
  const [users, setUsers] = useState();
  const [products, setProducts] = useState();

  const getUsersData = async () => {
    try {
      const res = await getUsers();
      if (res?.data) {
        setUsers(res?.data?.data);
      }
    } catch (error) {}
  };

  const getProductsData = async () => {
    try {
      const res = await getAllProducts();
      if (res?.data) {
        setProducts(res?.data?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUsersData();
    getProductsData();
  }, []);

  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-3">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Earnings"}
          subtitle={"$0"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Users"}
          subtitle={users?.length}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Total Products"}
          subtitle={products?.length}
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <PieChartCard />
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Traffic chart & Pie Chart */}

        {/* <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
