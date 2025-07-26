import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Check, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiService } from '../lib/api';
import { formatCurrency } from '../lib/utils';

const Pricing = () => {
  const { data: packages, isLoading } = useQuery({
    queryKey: ['packages'],
    queryFn: () => apiService.getPackages(),
    select: (response) => {
      console.log("API Response:", response.data.results);
      return response.data.results || [];
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading pricing packages...</p>
        </div>
      </div>
    );
  }

  const packagesWithDefaults = packages.map(pkg => ({
    ...pkg,
    features: pkg.features || [] // Ensure features is an array
  }));

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
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Choose the perfect plan for your business needs. All plans include our core features
            with no hidden fees or surprises.
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packagesWithDefaults.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                className={`relative bg-card border rounded-lg p-8 ${
                  pkg.is_popular
                    ? 'border-primary shadow-lg scale-105'
                    : 'border-border hover:shadow-lg'
                } transition-all duration-300`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {pkg.is_popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>Most Popular</span>
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.name}</h3>
                  <p className="text-muted-foreground mb-6">{pkg.description}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-foreground">
                      {formatCurrency(pkg.price)}
                    </span>
                    <span className="text-muted-foreground">/{pkg.billing_period}</span>
                  </div>
                </div>
                {/* Features */}
                <div className="space-y-4 mb-8">
                  {Array.isArray(pkg.features) && pkg.features.length > 0 ? (
                    pkg.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))
                  ) : (
                    <p>No features available</p>
                  )}
                </div>
                {/* CTA Button */}
                <Link
                  to="/contact"
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-center transition-colors block ${
                    pkg.is_popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-muted text-foreground hover:bg-accent'
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
          {packagesWithDefaults.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Pricing information will be available soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">
              Have questions about our pricing? We've got answers.
            </p>
          </motion.div>
          <div className="space-y-8">
            {[
              {
                question: "Can I change my plan later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
              },
              {
                question: "Do you offer custom packages?",
                answer: "Absolutely! We understand that every business is unique. Contact us to discuss a custom package tailored to your specific needs."
              },
              {
                question: "What's included in ongoing support?",
                answer: "All plans include email support, regular updates, and basic maintenance. Higher-tier plans include priority support and phone consultations."
              },
              {
                question: "Is there a money-back guarantee?",
                answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with our service, we'll refund your payment."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-card border border-border rounded-lg p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Choose your plan and start building your digital presence today.
              Need help deciding? Our team is here to help.
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
                to="/contact"
                className="border border-primary-foreground/20 text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                Talk to Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
