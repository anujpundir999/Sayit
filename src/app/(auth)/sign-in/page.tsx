"use client"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z  from "zod"
import React, {useState } from 'react'
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { signInSchema } from "@/schemas/signInSchema"
import { signIn } from "next-auth/react"
import Link from "next/link"

const LoginPage = () => {

  const [isSubmitting,setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver : zodResolver(signInSchema),
  });

  const onSubmit = async (data:z.infer<typeof signInSchema>)=>{
    setIsSubmitting(true);
    const result = await signIn("credentials",{
      redirect:false,
      username:data.username,
      password:data.password
    })

    if(result?.error){
      toast("Login Failed",{
        description:"Incorrect Username or Password",
        className:"bg-red-500 text-white"
      })
    }
    setIsSubmitting(false);
    if(result?.url){
      router.replace(`/dashboard`);
    }
  }

  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-screen bg-[#09090b]">
        {/* Left Side - Visual */}
        <div className="hidden lg:flex flex-col relative justify-between p-12 bg-[#18181b] text-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 p-8 z-20">
                <Link href="/" className="group flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                    Back to website
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </Link>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 mt-auto">
                <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">
                    Sayit
                </h1>
                <h2 className="text-2xl font-medium text-zinc-200 mb-4">
                    Pure honesty,<br />
                    delivered anonymously.
                </h2>
                <div className="flex gap-2 mt-8">
                    <div className="w-8 h-1 bg-white rounded-full"></div>
                    <div className="w-2 h-1 bg-zinc-600 rounded-full"></div>
                    <div className="w-2 h-1 bg-zinc-600 rounded-full"></div>
                </div>
            </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex items-center justify-center p-8 bg-[#09090b]">
            <div className="w-full max-w-[400px] space-y-8">
                <div className="space-y-2">
                    <h3 className="text-3xl font-semibold tracking-tight text-white">Welcome back</h3>
                    <p className="text-sm text-zinc-400">
                        Don&apos;t have an account? <Link href="/sign-up" className="text-violet-400 hover:text-violet-300 underline-offset-4 hover:underline">Sign up</Link>
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-zinc-300">
                                    Username
                                    </FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="Enter username" 
                                            className="bg-[#27272a] border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-violet-500"
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-zinc-300">
                                    Password
                                    </FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input 
                                                placeholder="Enter password" 
                                                type={showPassword ? "text" : "password"}
                                                className="bg-[#27272a] border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-violet-500 pr-10"
                                                {...field} 
                                            />
                                        </FormControl>
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-200"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>

                        <Button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-6 text-base"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin mr-2"/> Signing in...
                                </>
                            ) : "Sign in"}
                        </Button>
                    </form>
                </Form>






            </div>
        </div>
    </div>
  )
}                                                                                                                                                                                                                                                                                                                                                                                      

export default LoginPage