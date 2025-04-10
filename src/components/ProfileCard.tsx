
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Award, Star } from 'lucide-react';

const ProfileCard = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pt-6 flex flex-row justify-center">
        <Avatar className="h-24 w-24">
          <AvatarImage src="" alt="Profile" />
          <AvatarFallback className="bg-leetcode-primary text-white text-2xl">
            JS
          </AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="space-y-2 text-center">
        <h3 className="font-bold text-xl">John Smith</h3>
        <p className="text-sm text-muted-foreground">JavaScript Developer</p>
        
        <div className="flex flex-wrap gap-2 justify-center pt-2">
          <Badge variant="secondary" className="gap-1">
            <Trophy size={14} className="text-yellow-500" />
            Gold
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <Award size={14} className="text-leetcode-primary" />
            100-day Streak
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <Star size={14} className="text-yellow-500" />
            Top Performer
          </Badge>
        </div>
        
        <div className="grid grid-cols-3 gap-2 pt-4">
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">85</span>
            <span className="text-xs text-muted-foreground">Solved</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">7</span>
            <span className="text-xs text-muted-foreground">Streak</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">12</span>
            <span className="text-xs text-muted-foreground">Contests</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
