
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { UserStats } from '@/services/leetcodeService';

interface StatisticsCardProps {
  stats: UserStats;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ stats }) => {
  const calculatePercentage = (solved: number, total: number) => {
    return (solved / total) * 100;
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Problem Solving Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Easy</span>
            <span className="text-sm text-leetcode-easy font-semibold">
              {stats.easy.solved} / {stats.easy.total}
            </span>
          </div>
          <Progress value={calculatePercentage(stats.easy.solved, stats.easy.total)} className="h-2 bg-muted" />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Medium</span>
            <span className="text-sm text-leetcode-medium font-semibold">
              {stats.medium.solved} / {stats.medium.total}
            </span>
          </div>
          <Progress value={calculatePercentage(stats.medium.solved, stats.medium.total)} className="h-2 bg-muted" />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Hard</span>
            <span className="text-sm text-leetcode-hard font-semibold">
              {stats.hard.solved} / {stats.hard.total}
            </span>
          </div>
          <Progress value={calculatePercentage(stats.hard.solved, stats.hard.total)} className="h-2 bg-muted" />
        </div>
        
        <div className="pt-2 flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-sm">Current Streak</span>
            <span className="font-semibold">{stats.streak} days</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Total Solved</span>
            <span className="font-semibold">{stats.totalSolved} / {stats.totalProblems}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
