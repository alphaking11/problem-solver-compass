
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatisticsCard from './StatisticsCard';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { UserStats, Problem } from '@/services/leetcodeService';
import { Calendar, Code2, Clock, BrainCircuit, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardProps {
  stats: UserStats;
  recentProblems: Problem[];
}

const Dashboard: React.FC<DashboardProps> = ({ stats, recentProblems }) => {
  // Mock data for the activity chart
  const activityData = [
    { day: 'Mon', problems: 2 },
    { day: 'Tue', problems: 3 },
    { day: 'Wed', problems: 1 },
    { day: 'Thu', problems: 4 },
    { day: 'Fri', problems: 2 },
    { day: 'Sat', problems: 5 },
    { day: 'Sun', problems: 3 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Solved</CardTitle>
            <Code2 className="h-4 w-4 opacity-75" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalSolved}
              <span className="text-sm font-normal opacity-75 ml-1">
                / {stats.totalProblems}
              </span>
            </div>
            <p className="text-xs opacity-75 mt-1">
              {((stats.totalSolved / stats.totalProblems) * 100).toFixed(1)}% completion
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.streak} days</div>
            <p className="text-xs text-muted-foreground mt-1">
              Last solved: {stats.lastSolvedDate || 'Today'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24 min</div>
            <p className="text-xs text-muted-foreground mt-1">
              Per medium difficulty problem
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Weekly Activity</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activityData}>
                    <XAxis 
                      dataKey="day" 
                      stroke="#888888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="#888888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `${value}`} 
                    />
                    <Tooltip 
                      formatter={(value) => [`${value} problems`, 'Solved']} 
                      labelFormatter={(label) => `${label}day`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="problems" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2} 
                      dot={{ strokeWidth: 4 }} 
                      activeDot={{ r: 6, strokeWidth: 0 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Recently Solved</CardTitle>
              <Button variant="ghost" className="text-sm flex items-center gap-1">
                View all <ArrowUpRight size={14} />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProblems
                  .filter(problem => problem.status === "Solved")
                  .slice(0, 3)
                  .map((problem) => (
                    <div key={problem.id} className="flex justify-between items-start border-b pb-3 last:border-0 last:pb-0">
                      <div>
                        <h4 className="font-medium">{problem.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            problem.difficulty === 'Easy' ? 'bg-leetcode-easy/10 text-leetcode-easy' :
                            problem.difficulty === 'Medium' ? 'bg-leetcode-medium/10 text-leetcode-medium' :
                            'bg-leetcode-hard/10 text-leetcode-hard'
                          }`}>
                            {problem.difficulty}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock size={12} />
                            {problem.timeSpent} min
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {problem.solvedDate}
                      </span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <StatisticsCard stats={stats} />
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Next Practice</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-accent rounded-md border text-center">
                <BrainCircuit className="w-8 h-8 mx-auto mb-2 text-leetcode-primary" />
                <h4 className="font-semibold">Daily Challenge</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Today's challenge is ready for you
                </p>
                <Button className="w-full mt-3">Start Challenge</Button>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-2">Recommended problems</h4>
                {recentProblems
                  .filter(problem => problem.status === "Todo")
                  .slice(0, 2)
                  .map((problem) => (
                    <div key={problem.id} className="flex justify-between items-center py-2 border-b last:border-0">
                      <div>
                        <p className="font-medium text-sm">{problem.title}</p>
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                          problem.difficulty === 'Easy' ? 'bg-leetcode-easy/10 text-leetcode-easy' :
                          problem.difficulty === 'Medium' ? 'bg-leetcode-medium/10 text-leetcode-medium' :
                          'bg-leetcode-hard/10 text-leetcode-hard'
                        }`}>
                          {problem.difficulty}
                        </span>
                      </div>
                      <Button size="sm" variant="ghost">Solve</Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
