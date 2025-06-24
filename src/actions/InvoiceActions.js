"use server"

import { connectMongoDB } from "@/lib/mongodb";
import Invoice from './../models/InvoiceModel';
import { revalidatePath } from "next/cache";

export const getErrorMessages = (error) => {
    let message;
    if (error instanceof Error) {
        message = error.message;
    } else if ( error && typeof error === "Object" && "message" in error) {
        message = String(error.message);
    } else if (typeof error === "string") {
        message = error;
    } else {
        message = "Something went wrong";
    }
}

export const createInvoice = async (formData) => {
    const { customer, amount, status } = formData;
    try {
        if (!customer || !amount || !status) {
            return {
                error: "Please fill all the fields",
            };
        }
        await connectMongoDB()
        await Invoice.create({
            customer,
            amount,
            status
        })
        revalidatePath("/");

        return {
            message: " Invoice Created Successfully",
        }

    } catch (error) {
        console.log(error)
        return {
            error: getErrorMessages(error),
        }
    }
}

export const getInvoices = async (params) => {
    const page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {
        ...(params.search && { 
            $or: [
                { amount: { $regex: params.search, $options: "i"} },
                { status: { $regex: params.search, $options: "i"} },
                { "customers.name": { $regex: params.search, $options: "i"} },
                { "customers.email": { $regex: params.search, $options: "i"} },
            ],
        }),
    };

    try {
        await connectMongoDB()
        const invoices = await Invoice.find(query)
            .skip(skip)
            .limit(limit);
        
        const total = await Invoice.countDocuments(query);
        const pageCount = Math.ceil(total / limit);

        return JSON.stringify({
            total,
            pageCount,
            data: invoices,
        })

    } catch (error) {
        console.log(error)
        return {
            error: getErrorMessages(error),
        }
    }
    
}