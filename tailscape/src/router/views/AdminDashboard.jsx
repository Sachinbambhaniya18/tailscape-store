import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Package, Users, ShoppingCart, IndianRupee } from 'lucide-react';

import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { CardContent } from '../../components/ui/CardContent';
import { CardHeader } from '../../components/ui/CardHeader';
import { CardTitle } from '../../components/ui/CardTitle';

export default function AdminDashboard() {
  const user = useSelector((state) => state.auth.user);

  if (!user || user.role !== 'Admin') {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <Card className="w-96 text-center">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-red-600">Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Admin privileges required to view this page.</p>
            <Link to="/" className="text-indigo-500 hover:underline">
              Return to Home
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const data = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 4500 },
    { name: 'May', sales: 6000 },
    { name: 'Jun', sales: 5500 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<Package className="h-8 w-8 text-indigo-500" />} title="Total Products" value="1,234" />
          <StatCard icon={<Users className="h-8 w-8 text-green-500" />} title="Total Users" value="5,678" />
          <StatCard icon={<IndianRupee className="h-8 w-8 text-yellow-500" />} title="Revenue" value="$12,345" />
          <StatCard icon={<ShoppingCart className="h-8 w-8 text-purple-500" />} title="Orders" value="890" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Button asChild variant="outline" className="h-24 flex flex-col items-center justify-center">
                <Link to="/products/new">
                  <Package className="h-6 w-6 mb-2" />
                  <span>Add Product</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-24 flex flex-col items-center justify-center">
                <Link to="/orders">
                  <ShoppingCart className="h-6 w-6 mb-2" />
                  <span>View Orders</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-24 flex flex-col items-center justify-center">
                <Link to="/users">
                  <Users className="h-6 w-6 mb-2" />
                  <span>Manage Users</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-24 flex flex-col items-center justify-center">
                <Link to="/analytics">
                  <BarChart className="h-6 w-6 mb-2" />
                  <span>Analytics</span>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <Card>
      <CardContent className="flex items-center p-6">
        <div className="rounded-full p-3 bg-gray-100 mr-4">{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-700">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
