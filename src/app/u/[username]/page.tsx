'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { messageSchema } from '@/schemas/messageSchema';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import { z } from 'zod';
import { Shield, Send, Sparkles, MessageSquare } from 'lucide-react';
import Image from 'next/image';

type MessageFormInputs = z.infer<typeof messageSchema>;

export default function SendMessagePage() {
  const params = useParams();
  const username = params.username as string;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<MessageFormInputs>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = async (data: MessageFormInputs) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          content: data.content,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || 'Failed to send message');
        return;
      }

      toast.success('Message sent successfully!');
      form.reset();
    } catch (error) {
      toast.error('An error occurred while sending the message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <div className="w-full max-w-lg z-10 space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-6 opacity-80">
                <Image src="/images/logo.png" width={40} height={40} alt="Logo" className="w-8 h-8 object-contain" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-200 to-indigo-200 tracking-wide uppercase">Sayit</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Send a Secret
            </h1>
            <p className="text-zinc-400 text-lg">
                to <span className="text-violet-400 font-semibold">@{username}</span>
            </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#18181b]/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative">
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2 text-zinc-300 text-sm font-medium ml-1">
                                <MessageSquare className="w-4 h-4 text-violet-500" />
                                Your Anonymous Message
                            </FormLabel>
                            <FormControl>
                            <div className="relative">
                                <Textarea
                                    placeholder="Write something nice, ask a question, or confess a secret..."
                                    className="resize-none bg-[#27272a]/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-600 min-h-[160px] rounded-2xl focus:border-violet-500 focus:ring-violet-500/20 text-lg p-4 leading-relaxed"
                                    {...field}
                                    value={field.value || ''}
                                />
                                <Sparkles className="absolute bottom-4 right-4 w-5 h-5 text-indigo-500/30 pointer-events-none" />
                            </div>
                            </FormControl>
                            <FormMessage className="text-red-400" />
                        </FormItem>
                        )}
                    />
                    
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl shadow-lg shadow-violet-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2 animate-pulse">
                                Sending...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                Send Message <Send className="w-5 h-5" />
                            </span>
                        )}
                    </Button>
                </form>
            </Form>
        </div>

        {/* Footer Trust Indicators */}
        <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2 text-zinc-500 text-sm bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-800/50">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span>100% Anonymous & Secure</span>
            </div>
            
            <p className="text-zinc-600 text-xs max-w-xs leading-relaxed">
                We promise! Your identity is never revealed to {username}. 
                Be kind and respectful.
            </p>
        </div>
      </div>
    </div>
  );
}
