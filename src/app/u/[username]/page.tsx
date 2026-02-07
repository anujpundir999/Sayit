'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { messageSchema } from '@/schemas/messageSchema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
      console.error('Error sending message:', error);
      toast.error('An error occurred while sending the message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Send Anonymous Message</CardTitle>
          <CardDescription>
            Send a message to @{username}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your anonymous message here..."
                        className="resize-none"
                        rows={4}
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
