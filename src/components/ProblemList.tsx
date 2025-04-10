
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Problem } from '@/services/leetcodeService';
import { Search, Filter, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ProblemListProps {
  problems: Problem[];
}

const ProblemList: React.FC<ProblemListProps> = ({ problems }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulties, setSelectedDifficulties] = useState<Difficulty[]>(['Easy', 'Medium', 'Hard']);
  const [selectedStatus, setSelectedStatus] = useState<string[]>(['Solved', 'Attempted', 'Todo']);
  
  type Difficulty = 'Easy' | 'Medium' | 'Hard';

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-leetcode-easy text-white';
      case 'Medium':
        return 'bg-leetcode-medium text-black';
      case 'Hard':
        return 'bg-leetcode-hard text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Solved':
        return 'bg-green-100 text-green-800';
      case 'Attempted':
        return 'bg-yellow-100 text-yellow-800';
      case 'Todo':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulties.includes(problem.difficulty);
    const matchesStatus = selectedStatus.includes(problem.status);
    
    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  const toggleDifficulty = (difficulty: Difficulty) => {
    if (selectedDifficulties.includes(difficulty)) {
      setSelectedDifficulties(selectedDifficulties.filter(d => d !== difficulty));
    } else {
      setSelectedDifficulties([...selectedDifficulties, difficulty]);
    }
  };

  const toggleStatus = (status: string) => {
    if (selectedStatus.includes(status)) {
      setSelectedStatus(selectedStatus.filter(s => s !== status));
    } else {
      setSelectedStatus([...selectedStatus, status]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search problems..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter size={16} />
                Difficulty
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem
                checked={selectedDifficulties.includes('Easy')}
                onCheckedChange={() => toggleDifficulty('Easy')}
              >
                Easy
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedDifficulties.includes('Medium')}
                onCheckedChange={() => toggleDifficulty('Medium')}
              >
                Medium
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedDifficulties.includes('Hard')}
                onCheckedChange={() => toggleDifficulty('Hard')}
              >
                Hard
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <CheckCircle2 size={16} />
                Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem
                checked={selectedStatus.includes('Solved')}
                onCheckedChange={() => toggleStatus('Solved')}
              >
                Solved
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedStatus.includes('Attempted')}
                onCheckedChange={() => toggleStatus('Attempted')}
              >
                Attempted
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedStatus.includes('Todo')}
                onCheckedChange={() => toggleStatus('Todo')}
              >
                Todo
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>
              <TableHead>Problem</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Activity</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProblems.map((problem) => (
              <TableRow key={problem.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{problem.title}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {problem.tags.slice(0, 2).map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {problem.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{problem.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(problem.status)}`}>
                    {problem.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {problem.solvedDate || problem.lastAttemptDate ? (
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-muted-foreground" />
                      <span className="text-sm">
                        {problem.solvedDate || problem.lastAttemptDate}
                      </span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">-</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProblemList;
