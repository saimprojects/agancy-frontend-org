import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, MapPin, Clock, DollarSign, Send } from 'lucide-react';

import { apiService } from '../lib/api';

const JobDetail = () => {
  const { slug } = useParams();

  const { data: job, isLoading, error } = useQuery({
    queryKey: ['job', slug],
    queryFn: () => apiService.getJob(slug),
    select: (response) => response.data
  });

  const parseToArray = (data, fallback) => {
    if (!data) return fallback;
    if (Array.isArray(data)) return data;
    if (typeof data === 'string') return data.split(',').map(item => item.trim());
    return fallback;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Job Not Found</h1>
          <p className="text-muted-foreground mb-8">The job you're looking for doesn't exist.</p>
          <Link
            to="/careers"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Careers</span>
          </Link>
        </div>
      </div>
    );
  }

  const responsibilities = parseToArray(job.responsibilities, [
    'Collaborate with cross-functional teams to deliver high-quality solutions',
    'Participate in code reviews and maintain coding standards',
    'Contribute to technical documentation and knowledge sharing',
    'Stay updated with industry trends and best practices'
  ]);

  const requirements = parseToArray(job.requirements, [
    'Bachelor\'s degree in relevant field or equivalent experience',
    'Strong problem-solving and analytical skills',
    'Excellent communication and teamwork abilities',
    'Passion for learning and professional growth'
  ]);

  const niceToHave = parseToArray(job.nice_to_have, [
    'Experience with modern development tools and frameworks',
    'Previous experience in a similar role',
    'Contributions to open source projects',
    'Industry certifications'
  ]);

  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
            <span className="text-muted-foreground">/</span>
            <Link to="/careers" className="text-muted-foreground hover:text-foreground">Careers</Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{job.title}</span>
          </nav>
        </div>
      </div>

      {/* Job Header */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/careers"
              className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Careers</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  {job.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>{job.job_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                  </div>
                  {job.salary_range && (
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-5 h-5" />
                      <span>{job.salary_range}</span>
                    </div>
                  )}
                </div>

                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-xl mb-8">{job.description}</p>
                </div>
              </div>

              {/* Apply Card */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Ready to Apply?</h3>
                  <p className="text-muted-foreground mb-6">
                    Join our team and help us build amazing digital experiences.
                  </p>
                  <Link
                    to="/contact"
                    className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Apply Now</span>
                  </Link>
                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    Please mention this position in your message
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Job Details */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Responsibilities */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Responsibilities</h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground">
                    <ul className="space-y-2">
                      {responsibilities.map((responsibility, index) => (
                        <li key={index}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Requirements</h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground">
                    <ul className="space-y-2">
                      {requirements.map((requirement, index) => (
                        <li key={index}>{requirement}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Nice to Have */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Nice to Have</h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground">
                    <ul className="space-y-2">
                      {niceToHave.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Company Info */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-card border border-border rounded-lg p-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold text-foreground mb-4">About Saim Enterprises</h3>
                <p className="text-muted-foreground mb-6">
                  We're a passionate team of digital innovators dedicated to helping businesses 
                  thrive in the digital age. Join us in creating exceptional digital experiences.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Company Size</h4>
                    <p className="text-muted-foreground">25+ employees</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Industry</h4>
                    <p className="text-muted-foreground">Digital Agency</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Founded</h4>
                    <p className="text-muted-foreground">2016</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
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
              Ready to Join Our Team?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Take the next step in your career and help us build the future of digital innovation.
            </p>
            <Link
              to="/contact"
              className="bg-background text-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-background/90 transition-colors inline-flex items-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Apply for This Position</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default JobDetail;
