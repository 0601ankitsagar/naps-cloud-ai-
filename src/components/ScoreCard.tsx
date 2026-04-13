import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';

interface ScoreCardProps {
  score: number;
  verdict: string;
}

export function ScoreCard({ score, verdict }: ScoreCardProps) {
  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-emerald-600';
    if (s >= 50) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getProgressColor = (s: number) => {
    if (s >= 80) return 'bg-emerald-500';
    if (s >= 50) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <Card className="overflow-hidden border-none shadow-xl bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-widest">Authenticity Score</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center py-8">
        <div className="relative flex items-center justify-center mb-6">
          <svg className="w-48 h-48 transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-gray-100"
            />
            <motion.circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={552.92}
              initial={{ strokeDashoffset: 552.92 }}
              animate={{ strokeDashoffset: 552.92 - (552.92 * score) / 100 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={getScoreColor(score)}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className={`text-5xl font-bold tracking-tighter ${getScoreColor(score)}`}>
              {score}%
            </span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Human</span>
          </div>
        </div>
        
        <div className="text-center">
          <Badge variant="outline" className={`px-4 py-1 text-sm font-semibold rounded-full border-2 ${getScoreColor(score)} bg-white shadow-sm`}>
            {verdict}
          </Badge>
          <p className="mt-4 text-sm text-gray-500 max-w-[240px] leading-relaxed">
            This score indicates the likelihood that the content was authored by a human.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
