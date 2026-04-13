import React, { useState, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Send, Loader2, X, AlertCircle, Activity } from 'lucide-react';
import { analyzeText, AnalysisResult } from '@/src/lib/gemini';
import { parseFile } from '@/src/lib/fileParser';
import { ScoreCard } from './ScoreCard';
import { AnalysisDetails } from './AnalysisDetails';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { motion, AnimatePresence } from 'motion/react';

export function Authenticator() {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      try {
        setLoading(true);
        const parsedText = await parseFile(selectedFile);
        setText(parsedText);
      } catch (err: any) {
        setError(err.message || 'Failed to parse file');
        setFile(null);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError('Please enter some text or upload a file.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysis = await analyzeText(text);
      setResult(analysis);
    } catch (err: any) {
      setError(err.message || 'An error occurred during analysis.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setText('');
    setFile(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          Naps Cloud <span className="text-indigo-600">Authenticator</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our advanced AI analyzes linguistic patterns to distinguish between human creativity and machine-generated content.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <Tabs defaultValue="paste" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100/50 p-1 rounded-xl">
              <TabsTrigger value="paste" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <FileText className="w-4 h-4 mr-2" />
                Paste Text
              </TabsTrigger>
              <TabsTrigger value="upload" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload File
              </TabsTrigger>
            </TabsList>

            <TabsContent value="paste" className="mt-0">
              <div className="flex gap-2 mb-2">
                <Button 
                  variant="outline" 
                  size="xs" 
                  className="text-[10px] h-6 px-2 rounded-md border-gray-100 text-gray-400 hover:text-indigo-600"
                  onClick={() => setText("The sun dipped below the horizon, painting the sky in shades of bruised purple and fiery gold. A lone hawk circled high above, its silhouette sharp against the fading light. Below, the forest breathed a collective sigh as the nocturnal creatures began their nightly chorus, a symphony of chirps and rustles that signaled the changing of the guard.")}
                >
                  Sample Human Text
                </Button>
                <Button 
                  variant="outline" 
                  size="xs" 
                  className="text-[10px] h-6 px-2 rounded-md border-gray-100 text-gray-400 hover:text-indigo-600"
                  onClick={() => setText("Artificial intelligence is a branch of computer science that aims to create machines capable of performing tasks that typically require human intelligence. These tasks include problem-solving, pattern recognition, and language understanding. In recent years, deep learning and neural networks have significantly advanced the field, leading to breakthroughs in various industries.")}
                >
                  Sample AI Text
                </Button>
              </div>
              <div className="relative">
                <Textarea
                  placeholder="Paste your text here (minimum 50 characters)..."
                  className="min-h-[400px] p-6 text-lg border-none shadow-inner bg-gray-50/50 focus-visible:ring-indigo-500 rounded-2xl resize-none"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <div className="absolute bottom-4 right-4 text-xs font-medium text-gray-400">
                  {text.length} characters
                </div>
              </div>
            </TabsContent>

            <TabsContent value="upload" className="mt-0">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`min-h-[400px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-12 cursor-pointer transition-all ${
                  file ? 'border-indigo-500 bg-indigo-50/30' : 'border-gray-200 hover:border-indigo-400 hover:bg-gray-50'
                }`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept=".pdf,.docx,.txt"
                />
                {file ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-indigo-600" />
                    </div>
                    <p className="text-lg font-semibold text-gray-900 mb-1">{file.name}</p>
                    <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-4 text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        reset();
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-lg font-semibold text-gray-900 mb-2">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PDF, DOCX, or TXT (Max 10MB)</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex items-center gap-4">
            <Button 
              size="lg" 
              className="flex-1 h-14 text-lg font-bold rounded-2xl bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
              onClick={handleAnalyze}
              disabled={loading || !text.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing Linguistic Patterns...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Analyze Authenticity
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-14 px-6 rounded-2xl border-gray-200 hover:bg-gray-50"
              onClick={reset}
            >
              Reset
            </Button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Alert variant="destructive" className="rounded-2xl border-none bg-rose-50 text-rose-900">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <ScoreCard score={result.authenticityScore} verdict={result.verdict} />
                <AnalysisDetails result={result} />
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full min-h-[400px] border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center p-12 text-center"
              >
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <Activity className="w-10 h-10 text-gray-200" />
                </div>
                <h3 className="text-xl font-bold text-gray-400 mb-2">Awaiting Analysis</h3>
                <p className="text-sm text-gray-400 max-w-[240px]">
                  Submit text or a document to see the authenticity score and linguistic breakdown.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
