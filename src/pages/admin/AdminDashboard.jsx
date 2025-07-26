import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { 
  Users, 
  Briefcase, 
  MessageSquare, 
  TrendingUp, 
  Calendar,
  Eye,
  Mail,
  Phone
} from 'lucide-react';

import { apiService } from '../../lib/api';

const AdminDashboard = () => {
  // Mock data queries - in real app these would fetch from API
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => ({
      totalProjects: 150,
      activeProjects: 12,
      totalClients: 120,
      newInquiries: 8,
      monthlyRevenue: 45000,
      revenueGrowth: 12.5
    })
  });

  const { data: recentInquiries } = useQuery({
    queryKey: ['recent-inquiries'],
    queryFn: async () => [
      {
        id: 1,
        name: 'John Smith',
        email: 'john@example.com',
        company: 'Tech Corp',
        message: 'Interested in web development services...',
        created_at: '2024-01-15T10:30:00Z'
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah@startup.com',
        company: 'Startup Inc',
        message: 'Need help with mobile app development...',
        created_at: '2024-01-14T15:45:00Z'
      }
    ]
  });

  const { data: recentProjects } = useQuery({
    queryKey: ['recent-projects'],
    queryFn: async () => [
      {
        id: 1,
        title: 'E-commerce Platform',
        client: 'Retail Co',
        status: 'In Progress',
        progress: 75,
        deadline: '2024-02-15'
      },
      {
        id: 2,
        title: 'Corporate Website',
        client: 'Business Ltd',
        status: 'Review',
        progress: 90,
        deadline: '2024-01-30'
      }
    ]
  });

  const statCards = [
    {
      title: 'Total Projects',
      value: stats?.totalProjects || 0,
      icon: Briefcase,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Active Projects',
      value: stats?.activeProjects || 0,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Total Clients',
      value: stats?.totalClients || 0,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'New Inquiries',
      value: stats?.newInquiries || 0,
      icon: MessageSquare,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-2">Welcome back! Here's what's happening with your business.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                className="bg-card border border-border rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Revenue Card */}
        <motion.div
          className="bg-card border border-border rounded-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Monthly Revenue</h3>
              <p className="text-3xl font-bold text-foreground">${stats?.monthlyRevenue?.toLocaleString() || 0}</p>
              <p className="text-sm text-green-600 mt-1">
                +{stats?.revenueGrowth || 0}% from last month
              </p>
            </div>
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Inquiries */}
          <motion.div
            className="bg-card border border-border rounded-lg p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>Recent Inquiries</span>
            </h3>
            <div className="space-y-4">
              {recentInquiries?.map((inquiry) => (
                <div key={inquiry.id} className="border-b border-border pb-4 last:border-b-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{inquiry.name}</h4>
                      <p className="text-sm text-muted-foreground">{inquiry.company}</p>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {inquiry.message}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="text-xs text-primary hover:text-primary/80 flex items-center space-x-1"
                    >
                      <Mail className="w-3 h-3" />
                      <span>Reply</span>
                    </a>
                    <button className="text-xs text-muted-foreground hover:text-foreground flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Projects */}
          <motion.div
            className="bg-card border border-border rounded-lg p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
              <Briefcase className="w-5 h-5" />
              <span>Active Projects</span>
            </h3>
            <div className="space-y-4">
              {recentProjects?.map((project) => (
                <div key={project.id} className="border-b border-border pb-4 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">{project.title}</h4>
                      <p className="text-sm text-muted-foreground">{project.client}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.status === 'In Progress' 
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-foreground">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                    </div>
                    <button className="text-primary hover:text-primary/80">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

