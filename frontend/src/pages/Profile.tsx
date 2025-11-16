import { motion } from "framer-motion";
import { MapPin, Calendar, Link as LinkIcon, Settings, UserPlus } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PostCard } from "@/components/feed/PostCard";

const mockUserPosts = [
  {
    id: "1",
    author: {
      name: "John Doe",
      username: "johndoe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe"
    },
    content: "Building something amazing with React and TypeScript! The future of web development is here 🚀",
    timestamp: "1h",
    likes: 15,
    comments: 4,
    shares: 2,
    isLiked: true,
    isBookmarked: false
  }
];

const Profile = () => {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-overlay border-border/50">
            <CardHeader className="pb-6">
              <div className="flex flex-col md:flex-row gap-6">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Avatar className="h-24 w-24 ring-4 ring-primary/20">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe" />
                    <AvatarFallback className="text-2xl">JD</AvatarFallback>
                  </Avatar>
                </motion.div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold text-foreground">John Doe</h1>
                      <p className="text-muted-foreground">@johndoe</p>
                    </div>
                    
                    <div className="flex gap-2 mt-4 md:mt-0">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" size="sm">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Follow
                        </Button>
                      </motion.div>
                      
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                  
                  <p className="text-foreground mb-4">
                    Full-stack developer passionate about creating beautiful and functional web applications. 
                    Always learning, always building! 💻✨
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      San Francisco, CA
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined March 2023
                    </div>
                    <div className="flex items-center gap-1">
                      <LinkIcon className="h-4 w-4" />
                      <a href="#" className="text-primary hover:underline">johndoe.dev</a>
                    </div>
                  </div>
                  
                  <div className="flex gap-6">
                    <div>
                      <span className="font-semibold text-foreground">1,234</span>
                      <span className="text-muted-foreground ml-1">Following</span>
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">5,678</span>
                      <span className="text-muted-foreground ml-1">Followers</span>
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">89</span>
                      <span className="text-muted-foreground ml-1">Posts</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Skills/Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <h3 className="font-semibold text-foreground">Skills & Interests</h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "GraphQL", "Design Systems"].map((skill) => (
                  <motion.div
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* User Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-foreground mb-6">Recent Posts</h3>
          <div className="space-y-6">
            {mockUserPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PostCard {...post} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Profile;