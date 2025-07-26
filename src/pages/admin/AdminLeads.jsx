import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Search, Mail, Phone, Calendar, Eye, Trash2, Filter } from 'lucide-react';

import { apiService } from '../../lib/api';
import { formatDate } from '../../lib/utils';

const AdminLeads = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: leads, isLoading } = useQuery({
    queryKey: ['admin-leads'],
    queryFn: () => apiService.getContactSubmissions(),
    select: (response) => response.data.results || []
  });

  const filteredLeads = leads?.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.company?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await apiService.deleteContactSubmission(id);
        // Refetch leads
      } catch (error) {
        console.error('Error deleting lead:', error);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await apiService.updateContactSubmissionStatus(id, newStatus);
      // Refetch leads
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'qualified':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading leads...</p>
        </div>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold text-foreground">Leads</h1>
            <p className="text-muted-foreground mt-2">Manage contact form submissions and inquiries</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="closed">Closed</option>
          </select>
        </motion.div>

        {/* Leads Table */}
        <motion.div
          className="bg-card border border-border rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredLeads?.map((lead, index) => (
                  <motion.tr
                    key={lead.id}
                    className="hover:bg-muted/30 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <h3 className="font-medium text-foreground">{lead.name}</h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <a
                            href={`mailto:${lead.email}`}
                            className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary"
                          >
                            <Mail className="w-3 h-3" />
                            <span>{lead.email}</span>
                          </a>
                          {lead.phone && (
                            <a
                              href={`tel:${lead.phone}`}
                              className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary"
                            >
                              <Phone className="w-3 h-3" />
                              <span>{lead.phone}</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {lead.company || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {lead.budget_range || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status || 'new'}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className={`text-xs font-medium px-2 py-1 rounded-full border-0 focus:ring-2 focus:ring-primary ${getStatusColor(lead.status || 'new')}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(lead.created_at)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <a
                          href={`mailto:${lead.email}?subject=Re: Your inquiry&body=Hi ${lead.name},%0D%0A%0D%0AThank you for your inquiry...`}
                          className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          title="Reply via Email"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                        <button 
                          onClick={() => handleDelete(lead.id)}
                          className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLeads?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No leads found.</p>
            </div>
          )}
        </motion.div>

        {/* Lead Details Modal would go here */}
      </div>
    </div>
  );
};

export default AdminLeads;

