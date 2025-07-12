"use client"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z  from "zod"
import React, {useState } from 'react'
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoaderCircle } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { signInSchema } from "@/schemas/signInSchema"
import { signIn } from "next-auth/react"

const LoginPage = () => {

  const [isSubmitting,setIsSubmitting] = useState(false);
  const router = useRouter();

  //zod implementation
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
    console.log("Username",result,data.username,data.password)

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-3 ">Welcome Back!</h3>
          <p className="mb-2 text-gray-500 text-sm">Sign in with your username and password..  </p>
        </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} 
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
                    <FormLabel>
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="password" type="password"  {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {
                  isSubmitting?(
                    <>
                    <LoaderCircle className="animate-spin mr-2"/>Please wait
                    </>
                  ):"Sign In"
                }
              </Button>
            </form>
          </Form>
      </div>
    </div>
  )
}                                                                                                                                                                                                                                                                                                                                                                                      

export default LoginPage