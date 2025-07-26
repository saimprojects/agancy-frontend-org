import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Users, Award, Target, Heart, Linkedin, Twitter, Github } from 'lucide-react';

import { apiService } from '../lib/api';

const About = () => {
  const { data: teamMembers, isLoading } = useQuery({
    queryKey: ['team-members'],
    queryFn: () => apiService.getTeamMembers(),
    select: (response) => response.data.results || []
  });

  const values = [
    {
      icon: Target,
      title: 'Innovation',
      description: 'We stay ahead of the curve with cutting-edge technologies and creative solutions.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work closely with our clients as partners to achieve shared success.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We deliver high-quality work that exceeds expectations every time.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'We love what we do and it shows in every project we undertake.'
    }
  ];

  const stats = [
    { label: 'Years in Business', value: '8+' },
    { label: 'Projects Completed', value: '150+' },
    { label: 'Happy Clients', value: '120+' },
    { label: 'Team Members', value: '25+' }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                About Grow Peak
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                We are a passionate team of digital innovators dedicated to helping businesses 
                thrive in the digital age. Since our founding, we've been committed to delivering 
                exceptional digital solutions that drive real results.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-12 h-12 text-primary" />
                  </div>
                  <p className="text-muted-foreground">Our Amazing Team</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">Our Story</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-6">
                Founded in 2016, Grow Peak began as a small team of passionate developers 
                and designers who believed that every business deserves access to world-class 
                digital solutions. What started as a vision to democratize digital excellence 
                has grown into a thriving agency that serves clients across the globe.
              </p>
              <p className="mb-6">
                Over the years, we've evolved from a startup to a trusted partner for businesses 
                of all sizes. Our journey has been marked by continuous learning, adaptation, 
                and an unwavering commitment to our clients' success. We've weathered market 
                changes, embraced new technologies, and consistently delivered results that 
                exceed expectations.
              </p>
              <p>
                Today, we're proud to be a team of 25+ talented professionals who share a 
                common goal: helping businesses achieve their digital aspirations through 
                innovative solutions, strategic thinking, and exceptional execution.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These core values guide everything we do and shape how we work with our clients and each other.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  className="text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get to know the talented individuals who make Grow Peak what it is today.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading team members...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {teamMembers?.map((member, index) => (
                <motion.div
                  key={member.id}
                  className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-muted">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                  
                  {/* Social Links */}
                  <div className="flex items-center justify-center space-x-3">
                    {member.linkedin_url && (
                      <a
                        href={member.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.twitter_url && (
                      <a
                        href={member.twitter_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {member.github_url && (
                      <a
                        href={member.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {teamMembers?.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Team information will be available soon.</p>
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
              Want to Join Our Team?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for digital excellence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/careers"
                className="bg-background text-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-background/90 transition-colors"
              >
                View Open Positions
              </a>
              <a
                href="/contact"
                className="border border-primary-foreground/20 text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;

