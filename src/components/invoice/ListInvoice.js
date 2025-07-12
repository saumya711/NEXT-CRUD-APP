import React from 'react'
import Search from '../widgets/Search'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

const ListInvoice = ({ total, pageNumber, invoices: data}) => {
  return (
    <div>
      <div className='flex-between border-b-[1px] border-gray-400 pb-3'>
        <p>{total} Invoices</p>
        <p><Search /></p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S/N</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((invoice,index) => (
            <TableRow key={invoice._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <div className='flex-start space-x-2'>
                  <span>
                    <Avatar>
                      <AvatarImage src={invoice?.customer?.image} alt="image" />
                      <AvatarFallback>{invoice?.customer?.name?.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                  </span>
                  <span>
                    {invoice?.customer?.name}
                  </span>
                </div>
              </TableCell>
              <TableCell>{invoice?.customer.email}</TableCell>
              <TableCell>{invoice?.amount}</TableCell>
              <TableCell>{format(new Date(invoice?.createdAt), "MMM dd, yyyy")}</TableCell>
              <TableCell>
                <Badge variant={invoice?.status === "paid" ? "default" : "destructive"}>
                  {invoice?.status}
                </Badge>
              </TableCell>
              <TableCell>
                Edit
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ListInvoice
