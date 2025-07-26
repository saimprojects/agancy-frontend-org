import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar, User, Eye, Tag } from 'lucide-react';

import { apiService } from '../lib/api';
import { formatDate } from '../lib/utils';

const BlogPost = () => {
  const { slug } = useParams();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => apiService.getBlogPost(slug),
    select: (response) => response.data
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
            <span className="text-muted-foreground">/</span>
            <Link to="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Article */}
      <article className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blog</span>
            </Link>

            {/* Article Header */}
            <header className="mb-12">
              {post.category_name && (
                <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full mb-4">
                  {post.category_name}
                </span>
              )}
              
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{post.author_name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.published_at)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>{post.views_count} views</span>
                </div>
              </div>

              {post.featured_image && (
                <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-8">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none text-muted-foreground mb-12">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Tags */}
            {post.tags_list && post.tags_list.length > 0 && (
              <div className="border-t border-border pt-8 mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags_list.map((tag) => (
                    <span
                      key={tag.id}
                      className="bg-muted text-muted-foreground text-sm px-3 py-1 rounded-full hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            <div className="border-t border-border pt-8">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-primary">
                    {post.author_name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {post.author_name}
                  </h3>
                  <p className="text-muted-foreground">
                    Content writer and digital marketing specialist at Saim Enterprises. 
                    Passionate about helping businesses succeed in the digital world.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </article>

      {/* Related Posts CTA */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Enjoyed This Article?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover more insights and tips on our blog to help your business grow.
            </p>
            <Link
              to="/blog"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center space-x-2"
            >
              <span>Read More Articles</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;

