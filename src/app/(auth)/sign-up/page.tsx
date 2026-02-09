"use client"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z  from "zod"
import React, { useEffect, useState } from 'react'
import { useDebounceCallback } from 'usehooks-ts'
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios,{AxiosError} from 'axios'
import { ApiResponse } from "@/types/ApiResponse"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2, Eye, EyeOff, Check, X, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Page = () => {
  const [username,setUsername] = useState('');
  const [usernameMessage,setUsernameMessage] = useState('')
  const [isCheckingUsername,setIsCheckingUsername] = useState(false)
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const debounced = useDebounceCallback(setUsername,300);
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver : zodResolver(signUpSchema),
    defaultValues : {
      username : '',
      email: '',
      password: ''
    }
  });
  
  useEffect(() => {
    if (!username) {
      setUsernameMessage('');
      return;
    }
    const checkUserNameUnique = async () => {
      setIsCheckingUsername(true);
      setUsernameMessage('');
      try {
        const response = await axios.get(`/api/check-username-unique?username=${username}`);
        const message = response.data.message;
        setUsernameMessage(message);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        setUsernameMessage(
          axiosError.response?.data.message ?? "Error Checking Username"
        );
      } finally {
        setIsCheckingUsername(false);
      }
    };
    checkUserNameUnique();
  }, [username]);

  const onSubmit = async (data:z.infer<typeof signUpSchema>)=>{
    setIsSubmitting(true)
    try{
      const response = await axios.post<ApiResponse>('/api/sign-up',data)
      toast('Success',{
        description:response.data.message,
      })
      router.replace(`/verify/${username}`)
      setIsSubmitting(false)
    }catch(error){
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message
      toast("SignUp Failed",{
        description:errorMessage
      })
      setIsSubmitting(false)
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
                    <h3 className="text-3xl font-semibold tracking-tight text-white">Create an account</h3>
                    <p className="text-sm text-zinc-400">
                        Already have an account? <Link href="/sign-in" className="text-violet-400 hover:text-violet-300 underline-offset-4 hover:underline">Log in</Link>
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
                                    <div className="relative">
                                        <FormControl>
                                            <Input 
                                                placeholder="Enter username" 
                                                className="bg-[#27272a] border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-violet-500"
                                                {...field} 
                                                onChange={(e)=>{
                                                    field.onChange(e)
                                                    debounced(e.target.value)
                                                }}
                                            />
                                        </FormControl>
                                        <div className="absolute right-3 top-2.5 h-4 w-4">
                                            {isCheckingUsername && <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />}
                                            {!isCheckingUsername && usernameMessage === "Username is unique" && <Check className="h-4 w-4 text-green-500" />}
                                            {!isCheckingUsername && usernameMessage && usernameMessage !== "Username is unique" && <X className="h-4 w-4 text-red-500" />}
                                        </div>
                                    </div>
                                    {usernameMessage && (
                                        <p className={`text-xs mt-1 ${usernameMessage==="Username is unique"?"text-green-500":"text-red-500"}`}>
                                            {usernameMessage}
                                        </p>
                                    )}
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-zinc-300">
                                    Email
                                    </FormLabel>
                                    <FormControl>
                                    <Input 
                                        placeholder="Enter email" 
                                        type="email" 
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
                                                placeholder="Create a password" 
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

                        <div className="flex items-center space-x-2">
                        </div>

                        <Button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-6 text-base"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin mr-2"/> Creating account...
                                </>
                            ) : "Create account"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    </div>
  )
}                                                                                                                                                                                                                                                                                                                                                                                      

export default Page