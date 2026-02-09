"use client"

import React, { useRef, useState } from 'react'
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
import { X, Clock, Share2, Download, Loader2 } from 'lucide-react'
import { Message } from '@/model/User'
import { toast } from 'sonner'
import axios from 'axios'
import dayjs from 'dayjs'
import * as htmlToImage from 'html-to-image'
import ShareableImage from './ShareableImage'

interface MessageCardProps {
  message: Message
  onMessageDelete: (messageId: string) => void
}

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateImage = async (): Promise<Blob | null> => {
    if (!cardRef.current) return null
    try {
      const node = cardRef.current
      const prevPosition = node.style.position
      const prevLeft = node.style.left
      const prevTop = node.style.top
      const prevZIndex = node.style.zIndex

      node.style.position = 'fixed'
      node.style.left = '0px'
      node.style.top = '0px'
      node.style.zIndex = '-9999'

      const blob = await htmlToImage.toBlob(node, {
        width: 1080,
        height: 1920,
        pixelRatio: 1,
        style: {
          transform: 'scale(1)',
        },
      })

      node.style.position = prevPosition
      node.style.left = prevLeft
      node.style.top = prevTop
      node.style.zIndex = prevZIndex

      return blob
    } catch {
      return null
    }
  }

  const handleShare = async () => {
    setIsGenerating(true)
    try {
      const blob = await generateImage()
      if (!blob) {
        toast.error('Failed to generate image. Please try again.')
        return
      }

      const file = new File([blob], 'mystery-message.png', { type: 'image/png' })

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Anonymous Message',
          text: 'I received an anonymous message! Send me one too!',
        })
        toast.success('Shared successfully!')
      } else {
        downloadImage(blob)
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') return
      toast.error('Share failed. Downloading image instead.')
      const blob = await generateImage()
      if (blob) downloadImage(blob)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = async () => {
    setIsGenerating(true)
    try {
      const blob = await generateImage()
      if (!blob) {
        toast.error('Failed to generate image. Please try again.')
        return
      }
      downloadImage(blob)
    } catch {
      toast.error('Failed to download image.')
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadImage = (blob: Blob) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mystery-message-${dayjs().format('YYYY-MM-DD-HHmmss')}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Image downloaded! Share it on Instagram Stories or WhatsApp Status.')
  }

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`/api/delete-messages/${message._id}`);
      if (response.status === 200) {
        toast.success("Message Deleted Successfully");
      }
      onMessageDelete(String(message._id));
    } catch {
      toast.error("Failed to delete message");
    }
  }

  return (
    <>
      <ShareableImage ref={cardRef} message={message} />

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
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                disabled={isGenerating}
                className="h-8 w-8 text-violet-400 hover:bg-violet-500/10 hover:text-violet-300"
                title="Share"
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDownload}
                disabled={isGenerating}
                className="h-8 w-8 text-zinc-400 hover:bg-zinc-600/20 hover:text-zinc-300"
                title="Download as image"
              >
                <Download className="w-4 h-4" />
              </Button>
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
            </div>
          </CardAction>
        </CardHeader>
        <CardContent className="pt-2">
          <p className="text-zinc-200 leading-relaxed font-light text-base">
            {message.content}
          </p>
        </CardContent>
      </Card>
    </>
  )
}

export default MessageCard
