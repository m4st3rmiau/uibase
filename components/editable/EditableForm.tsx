"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface EditableFormProps {
  props: {
    fields: {
      name: string
      label: string
      type: string
      placeholder?: string
      description?: string
    }[]
    submitText: string
  }
}

export function EditableForm({ props }: EditableFormProps) {
  const { fields, submitText } = props

  // Dynamically generate the form schema based on the fields
  const formSchema = z.object(
    fields.reduce(
      (acc, field) => {
        acc[field.name] = z.string().min(2, {
          message: `${field.label} must be at least 2 characters.`,
        })
        return acc
      },
      {} as { [key: string]: z.ZodString },
    ),
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: fields.reduce(
      (acc, field) => {
        acc[field.name] = ""
        return acc
      },
      {} as { [key: string]: string },
    ),
  })

  const [submitMessage, setSubmitMessage] = useState("")

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setSubmitMessage("Form submitted successfully!")
    setTimeout(() => setSubmitMessage(""), 3000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input placeholder={field.placeholder} {...formField} />
                </FormControl>
                {field.description && <FormDescription>{field.description}</FormDescription>}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">{submitText}</Button>
        {submitMessage && <p className="text-green-500 mt-2">{submitMessage}</p>}
      </form>
    </Form>
  )
}
