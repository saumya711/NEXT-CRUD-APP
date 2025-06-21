"use client";
import React, { useState } from 'react'
import ActionModal from '../widgets/ActionModal'
import { Button } from '../ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SelectGroup, SelectLabel } from '@radix-ui/react-select';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { LoadingButton } from '../widgets/Loader';

const customers = [
  {
    id: 1,
    name: "Niroshani Saumya",
    image: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-women-cartoon-avatar-in-flat-style-png-image_6110776.png",
    email: "saumyan@gmail.com"
  },
  {
    id: 2,
    name: "Mangala Karunarathne",
    image: "https://t4.ftcdn.net/jpg/08/08/37/31/360_F_808373133_lrCrFLLTXF0A2WQK7QKMCNAzKCjX7kvb.jpg",
    email: "mangalak@gmail.com"
  },
  {
    id: 3,
    name: "Lakshika Madushani",
    image: "https://static.vecteezy.com/system/resources/thumbnails/004/899/680/small/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg",
    email: "lakshikam@gmail.com"
  }

]

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required",
  }),
  status: z.string().min(2, {
    message: "Status is required",
  }),
  amount: z.string().min(2, {
    message: "Amount is required",
  }),
})

const CreateInvoice = () => {
  const[open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: "",
      status: "unpaid"
    },
  })

  const isLoading = form.formState.isSubmitting;

  function onSubmit(values) {
    const { name, amount, status } = values
    console.log(values)
  }
  return (
    <div>
      <ActionModal
        title="Create Invoive"
        desc="Create a new Invoice"
        trigger={
          <Button className="text-white space-x-1">
            <span>Create Invoice</span>
            <span className='text-lg'>+</span>
          </Button>
        }
        open={open}
        setOpen={setOpen}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a customer" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {/* <SelectLabel>Customer</SelectLabel> */}
                      <>
                        {customers?.map((item) => {
                          const { name } = item
                          return (
                            <SelectItem  key={item.id} value={name}>{name}</SelectItem>
                          )
                        })}
                      </>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="Amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col"
                  >
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="unpaid" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Unpaid
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="paid" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Paid
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isLoading ? (
            <LoadingButton btnText={"Loading"} btnClass={"w-full"} btnVariant={"outline"}/>
          ) : (
            <Button className="w-full" type="submit">Submit</Button>
          )}
          
        </form>
      </Form>
      </ActionModal>
    </div>
  )
}

export default CreateInvoice
