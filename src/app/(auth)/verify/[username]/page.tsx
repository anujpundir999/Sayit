"use client"
import { verifySchema } from '@/schemas/verifySchema';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import {useParams, useRouter} from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const VerifyAccountPage = ()=>{
  const router = useRouter();
  const params = useParams<{username:string}>();
  // const [code,setCode] = useState('');
  const form = useForm<z.infer<typeof verifySchema>>({
      resolver : zodResolver(verifySchema)
  });

  const onSubmit = async (data:z.infer<typeof verifySchema>)=>{
    try {
      console.log("Data verifying",data);
      const response  = await axios.post(`/api/verify-code`,{
        username : params.username,
        code : data.code
      })
      //when the user is verified successfully
      toast('Success',{
              description:"User Verified Successfully",
              className:"bg-green-600 text-white"
      })
      router.replace(`/sign-in`)
      console.log("response from verify code",response);
    }
    catch(error){
      console.error("error in verifying user",error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message
      toast("SignUp Failed",{
        description:errorMessage,
        className:"bg-red-600 text-white"
      })
    }
  }
  return(
      <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-3 ">Verify Code to proceed !</h3>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="code"
                control={form.control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>
                      Verification Code
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="code"  {...field} onChange={(e) => {
                        field.onChange(e);
                      }}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className='w-full bg-blue-400'>Submit</Button>
            </form>
          </Form>
        </div>
      </div>
  )
}

export default VerifyAccountPage;