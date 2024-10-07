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
    <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-500 mr-4">
      <GroupsIcon className="w-5 h-5 text-orange-500 dark:text-orange-100" />
    </div>
  </Card>

  <Card title="Account balance" value="$ 46,760.89">
    <div className="p-2 rounded-full bg-green-100 dark:bg-green-500 mr-4">
      <PaidIcon className="w-5 h-5 text-green-500 dark:text-green-100" />
    </div>
  </Card>

  <Card title="New sales" value="376">
    <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-500 mr-4">
      <ShoppingCartIcon className="w-5 h-5 text-blue-500 dark:text-blue-100" />
    </div>
  </Card>

  <Card title="Pending contacts" value="35">
    <div className="p-2 rounded-full bg-teal-100 dark:bg-teal-500 mr-4">
      <SmsIcon className="w-5 h-5 text-teal-500 dark:text-teal-100" />
    </div>
  </Card>
</div>


     
    </>
  );
}

export default Dashboard;
