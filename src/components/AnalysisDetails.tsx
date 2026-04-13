import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnalysisResult } from '@/src/lib/gemini';
import { Brain, Zap, Activity, FileText } from 'lucide-react';

interface AnalysisDetailsProps {
  result: AnalysisResult;
}

export function AnalysisDetails({ result }: AnalysisDetailsProps) {
  const patterns = [
    {
      label: 'Perplexity',
      value: result.linguisticPatterns.perplexity,
      icon: Brain,
      desc: 'Randomness of word choice and complexity.',
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      label: 'Burstiness',
      value: result.linguisticPatterns.burstiness,
      icon: Zap,
      desc: 'Variation in sentence structure and length.',
      color: 'bg-amber-50 text-amber-600'
    },
    {
      label: 'Consistency',
      value: result.linguisticPatterns.consistency,
      icon: Activity,
      desc: 'Uniformity of style throughout the text.',
      color: 'bg-emerald-50 text-emerald-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {patterns.map((p) => (
          <Card key={p.label} className="border-none shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${p.color}`}>
                  <p.icon className="w-5 h-5" />
                </div>
                <span className="font-semibold text-gray-900">{p.label}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Level</span>
                <span className={`text-sm font-bold ${p.value === 'High' ? 'text-indigo-600' : p.value === 'Medium' ? 'text-amber-600' : 'text-gray-600'}`}>
                  {p.value}
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-lg bg-white">
        <CardHeader className="flex flex-row items-center gap-3 pb-2">
          <FileText className="w-5 h-5 text-indigo-600" />
          <CardTitle className="text-lg font-bold text-gray-900">Linguistic Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-indigo max-w-none">
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {result.analysis}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
