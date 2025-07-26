import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ExternalLink, Calendar, Users, TrendingUp } from 'lucide-react';

import { apiService } from '../lib/api';

const ProjectDetail = () => {
  const { slug } = useParams();

  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', slug],
    queryFn: () => apiService.getProject(slug),
    select: (response) => response.data
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Link
            to="/projects"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
            <span className="text-muted-foreground">/</span>
            <Link to="/projects" className="text-muted-foreground hover:text-foreground">Projects</Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{project.title}</span>
          </nav>
        </div>
      </div>

      {/* Project Header */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Projects</span>
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  {project.title}
                </h1>
                
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-muted-foreground">Client:</span>
                  <span className="font-semibold text-foreground">{project.client_name}</span>
                  {project.project_url && (
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                
                <p className="text-xl text-muted-foreground mb-8">
                  {project.short_description}
                </p>
                
                {/* Project Stats */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {project.duration_months && (
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-sm text-muted-foreground">Duration</div>
                        <div className="font-semibold">{project.duration_months} months</div>
                      </div>
                    </div>
                  )}
                  
                  {project.team_size && (
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-sm text-muted-foreground">Team Size</div>
                        <div className="font-semibold">{project.team_size} members</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="relative">
                {project.featured_image ? (
                  <img
                    src={project.featured_image}
                    alt={project.title}
                    className="w-full h-96 object-cover rounded-lg shadow-lg"
                  />
                ) : (
                  <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                    <div className="text-primary text-6xl font-bold">
                      {project.title.charAt(0)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* KPIs Section */}
      {(project.before_traffic || project.before_conversion || project.before_revenue) && (
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">Results Achieved</h2>
              <p className="text-xl text-muted-foreground">
                Here's how we helped {project.client_name} achieve their goals.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {project.before_traffic && project.after_traffic && (
                <motion.div
                  className="bg-card border border-border rounded-lg p-6 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <TrendingUp className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Monthly Traffic</h3>
                  <div className="flex items-center justify-center space-x-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Before</div>
                      <div className="text-xl font-bold">{project.before_traffic.toLocaleString()}</div>
                    </div>
                    <div className="text-primary">→</div>
                    <div>
                      <div className="text-sm text-muted-foreground">After</div>
                      <div className="text-xl font-bold text-primary">{project.after_traffic.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-green-600">
                    +{Math.round(((project.after_traffic - project.before_traffic) / project.before_traffic) * 100)}% increase
                  </div>
                </motion.div>
              )}

              {project.before_conversion && project.after_conversion && (
                <motion.div
                  className="bg-card border border-border rounded-lg p-6 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <TrendingUp className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Conversion Rate</h3>
                  <div className="flex items-center justify-center space-x-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Before</div>
                      <div className="text-xl font-bold">{project.before_conversion}%</div>
                    </div>
                    <div className="text-primary">→</div>
                    <div>
                      <div className="text-sm text-muted-foreground">After</div>
                      <div className="text-xl font-bold text-primary">{project.after_conversion}%</div>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-green-600">
                    +{(project.after_conversion - project.before_conversion).toFixed(1)}% improvement
                  </div>
                </motion.div>
              )}

              {project.before_revenue && project.after_revenue && (
                <motion.div
                  className="bg-card border border-border rounded-lg p-6 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <TrendingUp className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Monthly Revenue</h3>
                  <div className="flex items-center justify-center space-x-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Before</div>
                      <div className="text-xl font-bold">${project.before_revenue.toLocaleString()}</div>
                    </div>
                    <div className="text-primary">→</div>
                    <div>
                      <div className="text-sm text-muted-foreground">After</div>
                      <div className="text-xl font-bold text-primary">${project.after_revenue.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-green-600">
                    +{Math.round(((project.after_revenue - project.before_revenue) / project.before_revenue) * 100)}% increase
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Project Description */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">Project Overview</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>{project.description}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">Project Gallery</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.images.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="aspect-video bg-muted rounded-lg overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <img
                    src={image.image}
                    alt={image.caption || project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

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
              Inspired by This Project?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can create similar success for your business.
            </p>
            <Link
              to="/contact"
              className="bg-background text-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-background/90 transition-colors inline-flex items-center space-x-2"
            >
              <span>Start Your Project</span>
              <ExternalLink className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;

