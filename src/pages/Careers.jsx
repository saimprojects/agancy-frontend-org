import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Search, MapPin, Clock, DollarSign, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { apiService } from '../lib/api';

const Careers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const { data: jobs, isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => apiService.getJobs(),
    select: (response) => response.data.results || []
  });

  const filteredJobs = jobs?.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || job.job_type === selectedType;
    const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation;
    return matchesSearch && matchesType && matchesLocation;
  });

  const jobTypes = [...new Set(jobs?.map(job => job.job_type) || [])];
  const locations = [...new Set(jobs?.map(job => job.location) || [])];

  const benefits = [
    'Competitive salary and equity',
    'Comprehensive health insurance',
    'Flexible working hours',
    'Remote work options',
    'Professional development budget',
    'Modern office environment',
    'Team building activities',
    'Unlimited PTO policy'
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'We encourage creative thinking and embrace new technologies to solve complex problems.'
    },
    {
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and open communication to achieve great results.'
    },
    {
      title: 'Growth',
      description: 'We invest in our team members\' professional development and career advancement.'
    },
    {
      title: 'Work-Life Balance',
      description: 'We promote a healthy balance between work and personal life for all team members.'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading job opportunities...</p>
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
            Join Our Team
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Be part of a dynamic team that's shaping the future of digital innovation. 
            We're looking for passionate individuals who want to make a difference.
          </motion.p>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Work With Us?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're more than just a workplace - we're a community of innovators, creators, and problem-solvers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Benefits */}
          <motion.div
            className="bg-muted/50 rounded-lg p-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Benefits & Perks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Open Positions</h2>
            <p className="text-xl text-muted-foreground">
              Find your next opportunity and help us build amazing digital experiences.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          {/* Job Cards */}
          <div className="space-y-6">
            {filteredJobs?.map((job, index) => (
              <motion.div
                key={job.id}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">{job.title}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{job.job_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                          </div>
                          {job.salary_range && (
                            <div className="flex items-center space-x-1">
                              <DollarSign className="w-4 h-4" />
                              <span>{job.salary_range}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {job.description}
                    </p>
                  </div>
                  
                  <div className="lg:ml-6">
                    <Link
                      to={`/careers/${job.slug}`}
                      className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center space-x-2"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredJobs?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {jobs?.length === 0 
                  ? "No open positions at the moment. Check back soon!"
                  : "No jobs found matching your criteria."
                }
              </p>
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
              Don't See the Right Role?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals. Send us your resume and let us know how you'd like to contribute.
            </p>
            <Link
              to="/contact"
              className="bg-background text-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-background/90 transition-colors inline-flex items-center space-x-2"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Careers;

