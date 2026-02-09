"use client"
import { verifySchema } from '@/schemas/verifySchema';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { useState } from 'react';

const VerifyAccountPage = () => {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    setIsSubmitting(true);
    try {
      await axios.post(`/api/verify-code`, {
        username: params.username,
        code: data.code
      })
      toast.success("Verified Successfully", {
        description: "Your account has been verified. You can now sign in.",
        className: "bg-[#18181b] border-zinc-800 text-white"
      })
      router.replace(`/sign-in`)
    }
    catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message ?? "Verification failed";
      toast.error("Verification Failed", {
        description: errorMessage,
        className: "bg-[#18181b] border-zinc-800 text-white"
      })
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#09090b] p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-violet-600/10 rounded-full blur-[120px]" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md bg-[#18181b] border border-zinc-800 rounded-2xl shadow-xl overflow-hidden relative z-10">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600" />
        
        <div className="p-8">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 bg-violet-500/10 rounded-full flex items-center justify-center mb-4 ring-1 ring-violet-500/20">
              <ShieldCheck className="w-8 h-8 text-violet-500" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Verify your account</h1>
            <p className="text-zinc-400 text-sm mt-2">
              Enter the verification code sent to your email to complete registration for <span className="text-zinc-200 font-medium">@{params.username}</span>
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="code"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">Verification Code</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter 6-digit code" 
                        className="bg-[#09090b] border-zinc-800 focus:border-violet-500 focus:ring-violet-500/20 text-white placeholder:text-zinc-600 h-12 text-center text-lg tracking-widest transition-all"
                        maxLength={6}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-11 bg-violet-600 hover:bg-violet-700 text-white font-medium transition-all shadow-[0_0_20px_-5px_rgba(124,58,237,0.5)] hover:shadow-[0_0_25px_-5px_rgba(124,58,237,0.6)]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Account"
                )}
              </Button>
            </form>
          </Form>
        </div>
        
        <div className="bg-[#09090b]/50 p-4 text-center border-t border-zinc-800/50">
          <p className="text-xs text-zinc-500">
            Didn&apos;t receive code? <button type="button" className="text-violet-400 hover:text-violet-300 hover:underline transition-colors" onClick={() => toast.info("Resend feature coming soon!")}>Resend Code</button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default VerifyAccountPage;