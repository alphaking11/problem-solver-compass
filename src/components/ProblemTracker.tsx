
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Problem, UserStats } from '@/services/leetcodeService';
import ProblemList from './ProblemList';
import { CalendarRange, ListChecks, Tags } from 'lucide-react';

interface ProblemTrackerProps {
  problems: Problem[];
}

const ProblemTracker: React.FC<ProblemTrackerProps> = ({ problems }) => {
  const [activeTab, setActiveTab] = useState('all');

  // Filter problems by status
  const allProblems = problems;
  const solvedProblems = problems.filter(problem => problem.status === 'Solved');
  const attemptedProblems = problems.filter(problem => problem.status === 'Attempted');
  const todoProblems = problems.filter(problem => problem.status === 'Todo');

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-xl">Problem Tracker</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Tags size={16} />
              Topics
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <CalendarRange size={16} />
              Date Range
            </Button>
            <Button size="sm" className="gap-1">
              <ListChecks size={16} />
              Add Problem
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">
              All ({allProblems.length})
            </TabsTrigger>
            <TabsTrigger value="solved">
              Solved ({solvedProblems.length})
            </TabsTrigger>
            <TabsTrigger value="attempted">
              Attempted ({attemptedProblems.length})
            </TabsTrigger>
            <TabsTrigger value="todo">
              Todo ({todoProblems.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <ProblemList problems={allProblems} />
          </TabsContent>
          <TabsContent value="solved">
            <ProblemList problems={solvedProblems} />
          </TabsContent>
          <TabsContent value="attempted">
            <ProblemList problems={attemptedProblems} />
          </TabsContent>
          <TabsContent value="todo">
            <ProblemList problems={todoProblems} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProblemTracker;
