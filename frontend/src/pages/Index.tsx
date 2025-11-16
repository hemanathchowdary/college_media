import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Sparkles } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PostCard } from "@/components/feed/PostCard";
import { CreatePostModal } from "@/components/feed/CreatePostModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for demo
const mockPosts = [
  {
    id: "1",
    author: {
      name: "Alex Chen",
      username: "alexchen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
    },
    content: "Just launched my new React project with some amazing animations! The developer experience has been incredible. What's everyone working on this week? 🚀",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&h=400",
    timestamp: "2h",
    likes: 24,
    comments: 8,
    shares: 3,
    isLiked: false,
    isBookmarked: false
  },
  {
    id: "2",
    author: {
      name: "Sarah Wilson",
      username: "sarahwilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
    },
    content: "The future of web development is looking incredibly bright! With new frameworks and tools emerging, we're able to create more performant and beautiful applications than ever before. What trends are you most excited about? 💡",
    timestamp: "4h",
    likes: 42,
    comments: 15,
    shares: 7,
    isLiked: true,
    isBookmarked: true
  },
  {
    id: "3",
    author: {
      name: "David Kim",
      username: "davidkim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david"
    },
    content: "Working on a new social media platform that focuses on meaningful connections and authentic content sharing. The tech stack includes React, TypeScript, and some amazing animation libraries!",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&h=400",
    timestamp: "6h",
    likes: 18,
    comments: 6,
    shares: 2,
    isLiked: false,
    isBookmarked: false
  }
];

const Index = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-6">


        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-overlay border-border/50 mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold gradient-text flex items-center gap-2">
                    <Sparkles className="h-6 w-6" />
                    Welcome to CollegeMedia
                  </CardTitle>
                  <p className="text-muted-foreground mt-2">
                    Connect, share, and discover amazing content with our community
                  </p>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="gradient" 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="btn-glow"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create Post
                  </Button>
                </motion.div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Feed */}
        <div className="space-y-6">
          {mockPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <PostCard {...post} />
            </motion.div>
          ))}
        </div>

        {/* Load more */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-8"
        >
          <Button variant="outline" size="lg" className="hover:scale-105 transition-transform">
            Load More Posts
          </Button>
        </motion.div>
      </div>

      <CreatePostModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </AppLayout>
  );
};

export default Index;
