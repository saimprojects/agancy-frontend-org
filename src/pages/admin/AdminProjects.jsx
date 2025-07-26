import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Plus, Search, Edit, Trash2, Eye, ExternalLink } from 'lucide-react';

import { apiService } from '../../lib/api';

const AdminProjects = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: projects, isLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: () => apiService.getProjects(),
    select: (response) => response.data.results || []
  });

  const filteredProjects = projects?.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.client_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await apiService.deleteProject(id);
        // Refetch projects
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading projects...</p>
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
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h1 className="text-3xl font-bold text-foreground">Projects</h1>
              <p className="text-muted-foreground mt-2">Manage your project portfolio</p>
            </div>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects?.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="aspect-video bg-muted relative">
                {project.featured_image ? (
                  <img
                    src={project.featured_image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <div className="text-primary text-4xl font-bold">
                      {project.title.charAt(0)}
                    </div>
                  </div>
                )}
                
                {project.is_featured && (
                  <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
                
                {project.project_url && (
                  <a
                    href={project.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 w-8 h-8 bg-background/80 rounded-lg flex items-center justify-center text-foreground hover:bg-background transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{project.title}</h3>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {project.client_name} • {project.industry_name}
                </p>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.short_description}
                </p>
                
                {/* KPIs */}
                {(project.after_traffic || project.after_conversion) && (
                  <div className="grid grid-cols-2 gap-2 mb-4 p-2 bg-muted/50 rounded">
                    {project.after_traffic && (
                      <div className="text-center">
                        <div className="text-sm font-bold text-primary">
                          {project.after_traffic.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">Traffic</div>
                      </div>
                    )}
                    {project.after_conversion && (
                      <div className="text-center">
                        <div className="text-sm font-bold text-primary">
                          {project.after_conversion}%
                        </div>
                        <div className="text-xs text-muted-foreground">Conversion</div>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {new Date(project.created_at).toLocaleDateString()}
                  </span>
                  
                  <div className="flex items-center space-x-1">
                    <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(project.id)}
                      className="p-1.5 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProjects;

