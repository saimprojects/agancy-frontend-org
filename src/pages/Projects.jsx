import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

import { apiService } from '../lib/api';

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => apiService.getProjects(),
    select: (response) => response.data.results || []
  });

  const { data: industries } = useQuery({
    queryKey: ['industries'],
    queryFn: () => apiService.getIndustries?.() || Promise.resolve({ data: { results: [] } }),
    select: (response) => response.data.results || []
  });

  const filteredProjects = projects?.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = selectedIndustry === 'all' || 
                           project.industry_name === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-4xl lg:text-5xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Projects
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our portfolio of successful projects and see how we've helped businesses 
            achieve their digital goals with innovative solutions.
          </motion.p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Industries</option>
              {industries?.map((industry) => (
                <option key={industry.id} value={industry.name}>
                  {industry.name}
                </option>
              ))}
            </select>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects?.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="aspect-video bg-muted relative overflow-hidden">
                  {project.featured_image ? (
                    <img
                      src={project.featured_image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <div className="text-primary text-4xl font-bold">
                        {project.title.charAt(0)}
                      </div>
                    </div>
                  )}
                  
                  {project.is_featured && (
                    <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {project.title}
                    </h3>
                    {project.project_url && (
                      <a
                        href={project.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {project.client_name} • {project.industry_name}
                  </p>
                  
                  <p className="text-muted-foreground mb-4">
                    {project.short_description}
                  </p>
                  
                  {/* KPIs */}
                  {(project.after_traffic || project.after_conversion || project.after_revenue) && (
                    <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-muted/50 rounded-lg">
                      {project.after_traffic && (
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">
                            {project.after_traffic.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">Monthly Traffic</div>
                        </div>
                      )}
                      {project.after_conversion && (
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">
                            {project.after_conversion}%
                          </div>
                          <div className="text-xs text-muted-foreground">Conversion Rate</div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <Link
                    to={`/projects/${project.slug}`}
                    className="text-primary hover:text-primary/80 font-medium flex items-center space-x-1 group"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProjects?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No projects found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Let's create something amazing together. Get in touch to discuss your project requirements.
            </p>
            <Link
              to="/contact"
              className="bg-background text-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-background/90 transition-colors inline-flex items-center space-x-2"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projects;

