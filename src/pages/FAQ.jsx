import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState(new Set([0])); // First item open by default

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqCategories = [
    {
      title: 'General Questions',
      faqs: [
        {
          question: 'What services does Saim Enterprises offer?',
          answer: 'We offer a comprehensive range of digital services including web development, mobile app development, digital marketing, UI/UX design, e-commerce solutions, and ongoing maintenance and support.'
        },
        {
          question: 'How long has Saim Enterprises been in business?',
          answer: 'Saim Enterprises was founded in 2016 and has been serving clients for over 8 years. We have successfully completed 150+ projects and served 120+ happy clients worldwide.'
        },
        {
          question: 'What industries do you work with?',
          answer: 'We work with businesses across various industries including healthcare, finance, e-commerce, education, real estate, technology, and more. Our diverse experience allows us to adapt to different industry requirements.'
        },
        {
          question: 'Do you work with startups or only established businesses?',
          answer: 'We work with businesses of all sizes, from startups to large enterprises. We understand that each business has unique needs and budget constraints, and we tailor our services accordingly.'
        }
      ]
    },
    {
      title: 'Project Process',
      faqs: [
        {
          question: 'What is your typical project timeline?',
          answer: 'Project timelines vary depending on scope and complexity. A simple website might take 4-6 weeks, while a complex web application could take 3-6 months. We provide detailed timelines during the proposal phase.'
        },
        {
          question: 'How do you handle project communication?',
          answer: 'We maintain regular communication through weekly progress reports, scheduled calls, and a dedicated project management platform where you can track progress, provide feedback, and communicate with our team.'
        },
        {
          question: 'Can I make changes during the development process?',
          answer: 'Yes, we understand that requirements can evolve. We accommodate reasonable changes during development, though significant scope changes may affect timeline and budget. We discuss all changes transparently.'
        },
        {
          question: 'Do you provide ongoing support after project completion?',
          answer: 'Yes, we offer various support and maintenance packages to ensure your digital solution continues to perform optimally. This includes updates, security patches, and technical support.'
        }
      ]
    },
    {
      title: 'Pricing & Payment',
      faqs: [
        {
          question: 'How do you determine project pricing?',
          answer: 'Our pricing is based on project scope, complexity, timeline, and required resources. We provide detailed, transparent quotes with no hidden fees. We offer both fixed-price and hourly billing options.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept various payment methods including bank transfers, credit cards, and online payment platforms. Payment terms are typically structured with an initial deposit and milestone-based payments.'
        },
        {
          question: 'Do you offer payment plans?',
          answer: 'Yes, we offer flexible payment plans for larger projects. We can structure payments based on project milestones or monthly installments to help manage your cash flow.'
        },
        {
          question: 'Is there a money-back guarantee?',
          answer: 'We offer a 30-day satisfaction guarantee. If you\'re not satisfied with our initial deliverables, we\'ll work to address your concerns or provide a refund according to our terms.'
        }
      ]
    },
    {
      title: 'Technical Questions',
      faqs: [
        {
          question: 'What technologies do you use?',
          answer: 'We use modern, industry-standard technologies including React, Node.js, Python, Django, WordPress, Shopify, and more. We choose the best technology stack based on your specific requirements.'
        },
        {
          question: 'Do you provide hosting services?',
          answer: 'While we don\'t provide hosting directly, we can recommend reliable hosting providers and assist with setup and deployment. We also offer managed hosting solutions through our partners.'
        },
        {
          question: 'Will my website be mobile-friendly?',
          answer: 'Absolutely! All our websites are built with responsive design principles, ensuring they work perfectly on all devices including smartphones, tablets, and desktops.'
        },
        {
          question: 'Do you help with SEO?',
          answer: 'Yes, we include basic SEO optimization in all our web development projects. We also offer comprehensive SEO services including keyword research, content optimization, and ongoing SEO management.'
        }
      ]
    }
  ];

  const allFaqs = faqCategories.flatMap((category, categoryIndex) =>
    category.faqs.map((faq, faqIndex) => ({
      ...faq,
      category: category.title,
      globalIndex: categoryIndex * 100 + faqIndex
    }))
  );

  const filteredFaqs = allFaqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Find answers to common questions about our services, process, and policies. 
            Can't find what you're looking for? Feel free to contact us.
          </motion.p>

          {/* Search */}
          <motion.div
            className="relative max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {searchQuery ? (
            /* Search Results */
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Search Results ({filteredFaqs.length})
              </h2>
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.globalIndex}
                  className="bg-card border border-border rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <button
                    onClick={() => toggleItem(faq.globalIndex)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <h3 className="font-semibold text-foreground">{faq.question}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{faq.category}</p>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground transition-transform ${
                        openItems.has(faq.globalIndex) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openItems.has(faq.globalIndex) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 text-muted-foreground">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
              {filteredFaqs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No FAQs found matching your search.</p>
                </div>
              )}
            </div>
          ) : (
            /* Category View */
            <div className="space-y-12">
              {faqCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                >
                  <h2 className="text-2xl font-bold text-foreground mb-6">{category.title}</h2>
                  <div className="space-y-4">
                    {category.faqs.map((faq, faqIndex) => {
                      const globalIndex = categoryIndex * 100 + faqIndex;
                      return (
                        <div
                          key={globalIndex}
                          className="bg-card border border-border rounded-lg overflow-hidden"
                        >
                          <button
                            onClick={() => toggleItem(globalIndex)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                          >
                            <h3 className="font-semibold text-foreground">{faq.question}</h3>
                            <ChevronDown
                              className={`w-5 h-5 text-muted-foreground transition-transform ${
                                openItems.has(globalIndex) ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          <AnimatePresence>
                            {openItems.has(globalIndex) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-6 pb-4 text-muted-foreground">
                                  {faq.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
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
            <MessageCircle className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Our team is here to help. Get in touch and we'll answer any questions you have about our services.
            </p>
            <Link
              to="/contact"
              className="bg-background text-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-background/90 transition-colors inline-flex items-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Contact Us</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;

