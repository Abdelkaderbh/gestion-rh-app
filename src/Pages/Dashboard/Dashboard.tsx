import React from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import PaidIcon from '@mui/icons-material/Paid';
import SmsIcon from '@mui/icons-material/Sms';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PageTitle from '@/components/Titles/PageTitle';
import Card from '@/components/Cards/Card';




const Dashboard: React.FC = () =>{
return (
    <>
      <PageTitle>Dashboard</PageTitle>

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
      <Card title="Total clients" value="6389">
        <GroupsIcon
          component="svg"
          className="mr-4 text-orange-500 dark:text-orange-100 bg-orange-100 dark:bg-orange-500"
        />
      </Card>

      <Card title="Account balance" value="$ 46,760.89">
        <PaidIcon
          component="svg"
          className="mr-4 text-green-500 dark:text-green-100 bg-green-100 dark:bg-green-500"
        />
      </Card>

      <Card title="New sales" value="376">
        <ShoppingCartIcon
          component="svg"
          className="mr-4 text-blue-500 dark:text-blue-100 bg-blue-100 dark:bg-blue-500"
        />
      </Card>

      <Card title="Pending contacts" value="35">
        <SmsIcon
          component="svg"
          className="mr-4 text-teal-500 dark:text-teal-100 bg-teal-100 dark:bg-teal-500"
        />
      </Card>
      </div>

     
    </>
  );
}

export default Dashboard;
