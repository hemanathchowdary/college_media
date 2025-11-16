import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface PostCardProps {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export const PostCard = ({ 
  author, 
  content, 
  image, 
  timestamp, 
  likes, 
  comments, 
  shares, 
  isLiked = false, 
  isBookmarked = false 
}: PostCardProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="card-hover bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                  <AvatarImage src={author.avatar} alt={author.name} />
                  <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </motion.div>
              
              <div>
                <h4 className="font-semibold text-foreground">{author.name}</h4>
                <p className="text-sm text-muted-foreground">@{author.username} • {timestamp}</p>
              </div>
            </div>
            
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pb-4">
          <p className="text-foreground mb-4 leading-relaxed">{content}</p>
          
          {image && (
            <motion.div
              className="rounded-lg overflow-hidden mb-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <img 
                src={image} 
                alt="Post content" 
                className="w-full h-auto object-cover max-h-96"
              />
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={`flex items-center gap-2 ${
                    liked 
                      ? 'text-red-500 hover:text-red-600' 
                      : 'text-muted-foreground hover:text-red-500'
                  }`}
                >
                  <motion.div
                    animate={liked ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
                  </motion.div>
                  <span className="text-sm">{likeCount}</span>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  <span className="text-sm">{comments}</span>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  <Share className="h-4 w-4 mr-2" />
                  <span className="text-sm">{shares}</span>
                </Button>
              </motion.div>
            </div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBookmark}
                className={`${
                  bookmarked 
                    ? 'text-primary hover:text-primary/80' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};