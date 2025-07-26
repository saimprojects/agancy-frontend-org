import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Plus, Search, Edit, Trash2, Eye, Calendar, User } from 'lucide-react';

import { apiService } from '../../lib/api';
import { formatDate } from '../../lib/utils';

const AdminBlog = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: blogPosts, isLoading } = useQuery({
    queryKey: ['admin-blog-posts'],
    queryFn: () => apiService.getBlogPosts(),
    select: (response) => response.data.results || []
  });

  const filteredPosts = blogPosts?.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await apiService.deleteBlogPost(id);
        // Refetch posts
      } catch (error) {
        console.error('Error deleting blog post:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h1 className="text-3xl font-bold text-foreground">Blog Posts</h1>
              <p className="text-muted-foreground mt-2">Manage your blog content</p>
            </div>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>New Post</span>
            </button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* Blog Posts Table */}
        <motion.div
          className="bg-card border border-border rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Post
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Published
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredPosts?.map((post, index) => (
                  <motion.tr
                    key={post.id}
                    className="hover:bg-muted/30 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
                          {post.featured_image ? (
                            <img
                              src={post.featured_image}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                              <span className="text-primary text-lg font-bold">
                                {post.title.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="max-w-xs">
                          <h3 className="font-medium text-foreground line-clamp-1">{post.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{post.author_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {post.category_name && (
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                          {post.category_name}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        post.is_published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {post.views_count || 0}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.published_at)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(post.id)}
                          className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPosts?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts found.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminBlog;

