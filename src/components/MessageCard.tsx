import React from 'react'
import { Card } from './ui/card'
import {
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { X } from 'lucide-react'
import { Message } from '@/model/User'
import { toast } from 'sonner'
import axios from 'axios'

interface MessageCardProps{
  message: Message
  onMessageDelete: (messageId:string)=>void
}

const MessageCard = ({message,onMessageDelete}:MessageCardProps) => {

  const handleDeleteConfirm = async()=>{
    try{
        const response = await axios.delete(`/api/delete-messages/${message._id}`);
        if(response.status === 200){
          toast.success("Message Deleted Successfully");
        }
        onMessageDelete(String(message._id));
    }catch(error){
      console.error("Error !! ",error);
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction> 
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant = "destructive"><X className="w-12 h-12"/></Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account
                      and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>{message.content}</p>
        </CardContent>
        <CardFooter>
          <p>with love ❤️</p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default MessageCard