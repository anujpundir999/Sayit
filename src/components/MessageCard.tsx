import React from 'react'
import { Card, CardContent, CardAction, CardHeader, CardTitle } from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from './ui/button'
import { X, Clock } from 'lucide-react'
import { Message } from '@/model/User'
import { toast } from 'sonner'
import axios from 'axios'
import dayjs from 'dayjs'

interface MessageCardProps {
  message: Message
  onMessageDelete: (messageId: string) => void
}

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`/api/delete-messages/${message._id}`);
      if (response.status === 200) {
        toast.success("Message Deleted Successfully");
      }
      onMessageDelete(String(message._id));
    } catch (error) {
      console.error("Error !! ", error);
      toast.error("Failed to delete message");
    }
  }

  return (
    <Card className="bg-[#27272a] border-zinc-700 text-white transition-all hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10">
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="text-lg font-medium text-zinc-100">Hidden Message</CardTitle>
          <div className="flex items-center text-sm text-zinc-500 gap-2">
            <Clock className="w-3 h-3" />
            <span>{dayjs(message.createdAt).format('MMM D, YYYY h:mm A')}</span>
          </div>
        </div>
        <CardAction>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="destructive" 
                size="icon"
                className="h-8 w-8 bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-400 shadow-none"
              >
                <X className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Message</AlertDialogTitle>
                <AlertDialogDescription className="text-zinc-400">
                  Are you sure you want to delete this message? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700 hover:text-white">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 text-white hover:bg-red-700">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardAction>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="text-zinc-200 leading-relaxed font-light text-base">
          {message.content}
        </p>
      </CardContent>
    </Card>
  )
}

export default MessageCard
