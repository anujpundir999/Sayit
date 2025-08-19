"use client"
import { Message, User } from '@/model/User'
import {useCallback, useEffect, useState} from "react"
import { toast } from 'sonner'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { acceptMessageSchema } from '@/schemas/acceptMessageSchema'
import axios from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Loader2, RefreshCcw } from 'lucide-react'
import MessageCard from '@/components/MessageCard'
import { useSession } from 'next-auth/react'

const Dashboard = () => {
  const [messages,setMessages]= useState<Message[]>([])
  const [isLoading,setIsLoading]= useState(false)
  const [isSwitchLoading,setIsSwitchLoading] = useState(false)
  const handleDeleteMessage = (messageId:string)=>{
    setMessages(messages.filter((message)=>message.id!==messageId))
  }

  const {data:session,status} = useSession()

  const form = useForm({
    resolver:zodResolver(acceptMessageSchema)
  })

  const {register,watch,setValue} = form;
  const acceptMessages = watch('acceptMessages')
  const fetchAcceptMessage = useCallback(async()=>{
    setIsSwitchLoading(true)
    try{
      const response = await axios.get<ApiResponse>('/api/accept-messages')
      setValue('acceptMessages', response.data!.isAcceptingMessage ?? false)
    }catch(error){
      console.error("Error Fetching Accept Messages:",error);
      toast.error("Failed to fetch accept message status")
    }finally{
      setIsSwitchLoading(false);
    }
  },[setValue])

  const fetchMessages = useCallback(async (refresh:boolean=false)=>{
    setIsLoading(true)
    setIsSwitchLoading(false)
    try{
      const response = await axios.get<ApiResponse>('/api/get-messages');
      setMessages(response.data.messages ?? [])
      if(refresh){
        toast.success("Messages refreshed Successfully");
      }
    }catch(error){
      console.log("Error Fetching Messages:",error);
      toast.error("Failed to fetch messages")
    }finally{
      setIsLoading(false);
      setIsSwitchLoading(false);
    }
  },[setMessages,setIsLoading])

  useEffect(()=>{
    if (status === "loading") return;
    if(!session.user||!session)return;
    fetchMessages()
    fetchAcceptMessage()
  },[session,setValue,fetchAcceptMessage,fetchMessages,status])

  const handleSwitchChange = async()=>{
    try{
      const response = await axios.post<ApiResponse>(`/api/accept-messages`,{
        acceptMessages : !acceptMessages
      })
      setValue('acceptMessages',!acceptMessages)
      toast(response.data.message);

    }catch(error){
      console.error("Error Changing Switch:",error);
      toast.error("Failed to Fetch message settings")
    }
  }


  if (status === 'loading') {
    console.log("Loading session...");
    return <p>Loading...</p>;
  }
  console.log("Session",session)
  if (!session?.user || !session) {
    return <div>Please log in to view the dashboard.</div>
  }
  const {username} = session?.user as User
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'localhost:3000';
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = async()=>{
    try{
      await navigator.clipboard.writeText(profileUrl);
      toast.success("Copied successfully!");
    }catch(error){
      console.error("Error Copying to ClipBoard:",error);
      toast.error("Failed to Copy");
    }
  }

  console.log("error",session);
  if(!session.user||!session){
    return <div>Please log in to view the dashboard.</div>
  }
  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{" "}
        <div className="flex items-center space-x-2">
          <input 
          type="text"
          placeholder="Your unique link"
          value={profileUrl}
          disabled
          className="input input-bordered w-full p-2 mr-2"
             />
          <Button onClick={copyToClipboard} variant={"outline"}>
            Copy
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <Switch
        {...register('acceptMessages')}
        checked={acceptMessages}
        onCheckedChange={handleSwitchChange}
        disabled={isSwitchLoading}
        />
        <span className="ml-2">
          Accept Messages:{acceptMessages?'On':'Off'}
        </span>
      </div>
      <Separator/>

      <Button
        className="mt-4"
        variant="outline"
        onClick={(e)=>{
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {isLoading?(
          <Loader2 className="h-4 w-4 animate-spin"/>
        ):(
          <RefreshCcw className="h-4 w-4"/>
        )}
      </Button>
      <div>
        {messages.length >0?(
          messages.map((message,index)=>(
            <MessageCard
            key={index}
            message={message}
            onMessageDelete={handleDeleteMessage}
            />
          ))
        ):(
          <p>No Messages to display..</p>
        )}

      </div>
    </div>
  )
}

export default Dashboard