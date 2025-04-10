
import React, { useEffect, useState } from 'react';
import Dashboard from '@/components/Dashboard';
import { Problem, UserStats, getProblems, getUserStats } from '@/services/leetcodeService';

const Index = () => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await getUserStats();
        const problemsData = await getProblems();
        
        setStats(statsData);
        setProblems(problemsData);
      } catch (error) {
        console.error('Error fetching data:', error);
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
          <p className="mt-4 text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {stats && <Dashboard stats={stats} recentProblems={problems} />}
    </div>
  );
};

export default Index;
