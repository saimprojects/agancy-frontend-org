import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { apiService } from '../lib/api';
import { formatDate } from '../lib/utils';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: blogPosts, isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: () => apiService.getBlogPosts(),
    select: (response) => response.data.results || []
  });

  const { data: categories } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: () => apiService.getBlogCategories(),
    select: (response) => response.data.results || []
  });

  const filteredPosts = blogPosts?.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           post.category_name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading blog posts...</p>
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
            Our Blog
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Stay updated with the latest insights, trends, and tips from the world of digital technology and business.
          </motion.p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts?.map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="aspect-video bg-muted relative overflow-hidden">
                  {post.featured_image ? (
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <div className="text-primary text-4xl font-bold">
                        {post.title.charAt(0)}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.published_at)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author_name}</span>
                    </div>
                  </div>
                  
                  {post.category_name && (
                    <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full mb-3">
                      {post.category_name}
                    </span>
                  )}
                  
                  <h2 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-muted-foreground mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-primary hover:text-primary/80 font-medium flex items-center space-x-1 group"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    <div className="text-sm text-muted-foreground">
                      {post.views_count} views
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No blog posts found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to get the latest insights and updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
              />
              <button className="w-full sm:w-auto bg-background text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-background/90 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;

