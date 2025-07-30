import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Star,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import Hero3D from "../components/Hero3D";
import { apiService } from "../lib/api";
import { formatNumber } from "../lib/utils";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef();
  const statsRef = useRef();
  const servicesRef = useRef();
  const projectsRef = useRef();
  const testimonialsRef = useRef();

  // Fetch data
  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: () => apiService.getServices(),
    select: (response) => response.data.results?.slice(0, 4) || [],
  });

  const { data: projects } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: () => apiService.getProjects({ is_featured: true }),
    select: (response) => response.data.results?.slice(0, 3) || [],
  });

  const { data: testimonials } = useQuery({
    queryKey: ["featured-testimonials"],
    queryFn: () => apiService.getTestimonials({ is_featured: true }),
    select: (response) => response.data.results?.slice(0, 3) || [],
  });

  useEffect(() => {
    // Hero animations
    const heroTl = gsap.timeline();
    heroTl
      .from(".hero-title", {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: "power3.out",
      })
      .from(
        ".hero-subtitle",
        {
          duration: 1,
          y: 50,
          opacity: 0,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .from(
        ".hero-cta",
        {
          duration: 1,
          y: 30,
          opacity: 0,
          ease: "power3.out",
        },
        "-=0.5"
      );

    // Stats counter animation
    ScrollTrigger.create({
      trigger: statsRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(".stat-number", {
          duration: 2,
          textContent: (i, target) => {
            const endValue = target.getAttribute("data-value");
            return Math.round(endValue);
          },
          ease: "power2.out",
          snap: { textContent: 1 },
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const stats = [
    { label: "Projects Completed", value: 150, icon: Award },
    { label: "Happy Clients", value: 120, icon: Users },
    { label: "Years Experience", value: 8, icon: TrendingUp },
    { label: "Team Members", value: 25, icon: Star },
  ];

  const features = [
    "Custom Web Development",
    "Mobile App Development",
    "Digital Marketing",
    "UI/UX Design",
    "24/7 Support",
    "SEO Optimization",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background 3D Scene */}
        <div className="absolute inset-0 z-0">
          <Hero3D />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-transparent z-10" />

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            Welcome to{" "}
            <span className="text-blue-600">Grow Peak Digital Agancy</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your Digital Success Partner. We help businesses grow with
            cutting-edge digital solutions, innovative web development, and
            strategic marketing.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-base md:text-lg font-semibold shadow-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Get Started
            </Link>
            <Link
              to="/projects"
              className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg text-base md:text-lg font-semibold shadow-lg hover:bg-gray-100 transition-colors duration-300"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div
                    className="stat-number text-3xl lg:text-4xl font-bold text-foreground mb-2"
                    data-value={stat.value}
                  >
                    0
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We offer comprehensive digital solutions to help your business
              thrive in the digital age.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services?.map((service, index) => (
              <motion.div
                key={service.id}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <div className="w-6 h-6 bg-primary rounded" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {service.short_description}
                </p>
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

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link
              to="/services"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center space-x-2"
            >
              <span>View All Services</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section ref={projectsRef} className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover some of our most successful projects and the impact we've
              made for our clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="aspect-video bg-muted relative overflow-hidden">
                  {project.featured_image && (
                    <img
                      src={project.featured_image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {project.short_description}
                  </p>
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

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link
              to="/projects"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center space-x-2"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients
              have to say about our work.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials?.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.testimonial_text}"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    {testimonial.photo ? (
                      <img
                        src={testimonial.photo}
                        alt={testimonial.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-medium">
                        {testimonial.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.designation} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve your digital goals and
              grow your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="bg-background text-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-background/90 transition-colors flex items-center space-x-2"
              >
                <span>Get Started Today</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/pricing"
                className="border border-primary-foreground/20 text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
