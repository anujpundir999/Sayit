"use client"

import { Message } from '@/model/User'
import { useCallback, useEffect, useState } from "react"
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
import { Loader2, RefreshCcw, Copy, MessageSquare, Power, User as UserIcon } from 'lucide-react'
import MessageCard from '@/components/MessageCard'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const Dashboard = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => String(message._id) !== messageId))
  }

  const { data: session, status } = useSession()

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema)
  })

  const { register, watch, setValue } = form;
  const acceptMessages = watch('acceptMessages')
  
  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true)
    try {
      const response = await axios.get<ApiResponse>('/api/accept-messages')
      setValue('acceptMessages', response.data!.isAcceptingMessage ?? false)
    } catch {
      toast.error("Failed to fetch accept message status")
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue])

  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true)
    setIsSwitchLoading(false)
    try {
      const response = await axios.get<ApiResponse>('/api/get-messages');
      setMessages(response.data.messages ?? [])
      if (refresh) {
        toast.success("Messages refreshed Successfully");
      }
    } catch {
      toast.error("Failed to fetch messages")
    } finally {
      setIsLoading(false);
      setIsSwitchLoading(false);
    }
  }, [setMessages, setIsLoading])

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user) return;
    fetchMessages()
    fetchAcceptMessage()
  }, [session, setValue, fetchAcceptMessage, fetchMessages, status])

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>(`/api/accept-messages`, {
        acceptMessages: !acceptMessages
      })
      setValue('acceptMessages', !acceptMessages)
      toast(response.data.message);

    }catch {
        toast.error("Failed to Fetch message settings")
    }
  }

  if (status === 'loading') {
    return (
        <div className="flex justify-center items-center min-h-screen bg-[#09090b]">
            <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
        </div>
    );
  }

  if (!session?.user) {
    return (
        <div className="flex justify-center items-center min-h-screen bg-[#09090b] text-white">
            Please log in to view the dashboard.
        </div>
    );
  }

  const { username } = session?.user as { username?: string }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'localhost:3000';
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      toast.success("Link copied to clipboard!");
    }
    catch {
      toast.error("Failed to Copy");
    }
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-6 md:p-8 pt-24 md:pt-32">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Dashboard</h1>
                <p className="text-zinc-400">Manage your messages and profile settings.</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <Card className="bg-[#18181b] border-zinc-800 text-white lg:col-span-2">
                <CardHeader>
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                        <UserIcon className="h-5 w-5 text-violet-500" />
                        Your Unique Link
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                        Share this link to receive anonymous messages
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2 bg-[#27272a] p-2 rounded-md border border-zinc-700">
                        <input 
                            type="text"
                            value={profileUrl}
                            disabled
                            className="bg-transparent border-none text-zinc-300 w-full focus:outline-none px-2 text-sm"
                        />
                        <Button onClick={copyToClipboard} size="sm" className="bg-violet-600 hover:bg-violet-700 text-white shrink-0">
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                 <Card className="bg-[#18181b] border-zinc-800 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Message Status</CardTitle>
                        <Power className={`h-4 w-4 ${acceptMessages ? "text-green-500" : "text-zinc-500"}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-2xl font-bold">
                                {acceptMessages ? "Active" : "Inactive"}
                            </span>
                            <Switch
                                {...register('acceptMessages')}
                                checked={acceptMessages}
                                onCheckedChange={handleSwitchChange}
                                disabled={isSwitchLoading}
                                className="data-[state=checked]:bg-green-500"
                            />
                        </div>
                        <p className="text-xs text-zinc-500 mt-1">
                            {acceptMessages ? "You are accepting new messages" : "Messages are currently disabled"}
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-[#18181b] border-zinc-800 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
                        <MessageSquare className="h-4 w-4 text-violet-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mt-2">{messages.length}</div>
                        <p className="text-xs text-zinc-500 mt-1">
                            Messages received so far
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>

        <Separator className="bg-zinc-800" />

        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-white">Your Messages</h2>
                <Button
                    variant="outline"
                    onClick={(e) => {
                        e.preventDefault();
                        fetchMessages(true);
                    }}
                    disabled={isLoading}
                    className="border-zinc-700 bg-[#18181b] text-zinc-300 hover:bg-[#27272a] hover:text-white"
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                        <RefreshCcw className="h-4 w-4 mr-2" />
                    )}
                    Refresh
                </Button>
            </div>

            {messages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {messages.map((message) => (
                        <MessageCard
                            key={message.id || String(message._id)}
                            message={message}
                            onMessageDelete={handleDeleteMessage}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-[#18181b] rounded-xl border border-zinc-800 border-dashed">
                    <MessageSquare className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-zinc-300">No messages yet</h3>
                    <p className="text-zinc-500 max-w-sm mx-auto mt-2">
                        Share your profile link to start receiving anonymous messages from your friends!
                    </p>
                </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard