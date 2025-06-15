"use client";
import React, { useState } from 'react'
import ActionModal from '../widgets/ActionModal'
import { Button } from '../ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

const CreateInvoice = () => {
  const[open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(values) {
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
        <h1>Invoice</h1>
      </ActionModal>
    </div>
  )
}

export default CreateInvoice
