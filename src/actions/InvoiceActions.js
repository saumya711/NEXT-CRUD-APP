"user server"

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
    const { name, amount, status } = formData;
    try {
        if (!name || !amount || !status) {
            return {
                error: "Please fill all the fields",
            };
        }
        await connectMongoDB()
        await Invoice.create({
            name,
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