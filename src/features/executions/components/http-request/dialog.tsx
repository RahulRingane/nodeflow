"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button, Input } from "@base-ui/react";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    endpoint: z.url({ message: "Please enter a valid URL" }),
    method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
    body: z
        .string()
        .optional()
    //.refine()
})

export type FormType = z.infer<typeof formSchema>;

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: z.infer<typeof formSchema>) => void;
    defaultEndpoint?: string;
    defaultMethod?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    defaultBody?: string;
};

export const HttpRequestDialog = ({
    open,
    onOpenChange,
    onSubmit,
    defaultEndpoint = "",
    defaultMethod = "GET",
    defaultBody = ""
}: Props) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            endpoint: defaultEndpoint,
            method: defaultMethod,
            body: defaultBody,
        }
    })

    useEffect(() => {
        if(open) {
            form.reset({
                endpoint:defaultEndpoint,
                method: defaultMethod,
                body: defaultBody,
            })
        }
        }, [open, defaultEndpoint, defaultMethod, defaultBody, form]
    )

    const watchMethod = form.watch("method");
    const showBodyField = ["POST", "PUT", "PATCH"].includes(watchMethod);

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        onSubmit(values);
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Http Trigger
                    </DialogTitle>
                    <DialogDescription>
                        Configure the settings for http trigger node.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <p className="text-sm text-muted-foreground">HTTP Trigger</p>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-8 mt-4"
                    >
                        <FormField
                        control={form.control}
                        name="method"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Method</FormLabel>
                                <Select
                                 onValueChange={field.onChange}
                                 defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="select a method" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="GET">GET</SelectItem>
                                        <SelectItem value="POST">POST</SelectItem>
                                        <SelectItem value="PUT">PUT</SelectItem>
                                        <SelectItem value="PATCH">PATCH</SelectItem>
                                        <SelectItem value="DELETE">DELETE</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    The HTTP method to use for this request.
                                </FormDescription>
                            </FormItem>
                        )}/>
                        <FormField
                        control={form.control}
                        name="endpoint"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Endpoint URL</FormLabel>
                                <FormControl>
                                    <Input
                                    placeholder="https://api.ece.com/users/{{httpResponse.data.id}}"
                                    {...field}
                                />
                                </FormControl>
                                <FormDescription>
                                    Static URL or use {"{{variables}}"}
                                    simple values or {"{{json variable}}"} to
                                    stringify objects
                                </FormDescription>
                            </FormItem>
                        )}/>
                        {showBodyField && (
                            <FormField 
                            control={form.control}
                            name="body"
                             render={({field}) => (
                            <FormItem>
                                <FormLabel>Request Body</FormLabel>
                                <FormControl>
                                    <Textarea
                                    placeholder="https://api.ece.com/users/{{httpResponse.data.id}}"
                                    className="min-h-[120px] font-mono text-sm"
                                    {...field}
                                />
                                </FormControl>
                                <FormDescription>
                                    JSON with template variables.Use {"{{variables}}"}
                                    simple values or {"{{json variable}}"} to
                                    stringify objects
                                </FormDescription>
                            </FormItem>
                        )}/>
                            
                        )}
                        <DialogFooter className="mt-4">
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}