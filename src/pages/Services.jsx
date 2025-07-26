import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { apiService } from '../lib/api';
import { cn } from '../lib/utils';

const Services = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: () => apiService.getServices(),
    select: (response) => response.data.results || []
  });

  const filteredServices = services?.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'featured' && service.is_featured);
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading services...</p>
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
            Our Services
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We offer comprehensive digital solutions to help your business thrive in the digital age.
            From web development to digital marketing, we've got you covered.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Services</option>
              <option value="featured">Featured</option>
            </select>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices?.map((service, index) => (
              <motion.div
                key={service.id}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  {service.icon ? (
                    <img src={service.icon} alt={service.title} className="w-6 h-6" />
                  ) : (
                    <div className="w-6 h-6 bg-primary rounded" />
                  )}
                </div>
                
                {service.is_featured && (
                  <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full mb-3">
                    Featured
                  </span>
                )}
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  {service.short_description}
                </p>
                
                {service.price_starting_from && (
                  <p className="text-sm text-muted-foreground mb-4">
                    Starting from <span className="font-semibold text-foreground">${service.price_starting_from}</span>
                  </p>
                )}
                
                <Link
                  to={`/services/${service.slug}`}
                  className="text-primary hover:text-primary/80 font-medium flex items-center space-x-1 group"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredServices?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No services found matching your criteria.</p>
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
              Need a Custom Solution?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Don't see exactly what you're looking for? We create custom solutions tailored to your specific needs.
            </p>
            <Link
              to="/contact"
              className="bg-background text-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-background/90 transition-colors inline-flex items-center space-x-2"
            >
              <span>Get Custom Quote</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;

