
import React, { useEffect, useState } from 'react';
import ProblemTracker from '@/components/ProblemTracker';
import { Problem, getProblems } from '@/services/leetcodeService';

const Problems = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const problemsData = await getProblems();
        setProblems(problemsData);
      } catch (error) {
        console.error('Error fetching problems:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="mt-4 text-muted-foreground">Loading problems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Problems</h1>
        <p className="text-muted-foreground">
          Track your progress and manage your problem-solving journey.
        </p>
      </div>
      <ProblemTracker problems={problems} />
    </div>
  );
};

export default Problems;
