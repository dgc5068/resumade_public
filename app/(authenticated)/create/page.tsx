"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { resumeSchema } from "@/lib/schema";
import { createResume } from "@/lib/resume";
import { useState } from "react";
import { z } from "zod";
import { DynamicList } from "@/components/form/dynamic-list";
import { SkillsList } from "@/components/form/skills-list";

type FormData = z.infer<typeof resumeSchema>;

export default function CreateResumePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      title: "",
      content: {
        basics: {
          name: "",
          title: "",
          email: "",
          phone: "",
          location: "",
          profile: "",
        },
        experience: [],
        education: [],
        skills: [],
        languages: [],
        references: [],
      },
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      await createResume({
        ...data,
        user_id: "TODO", // This should come from your auth context
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to create resume:", error);
      // TODO: Add error handling.
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Create New Resume</h1>
        <p className="text-muted-foreground">
          Fill out the form below to create a new resume.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Resume Title
          </label>
          <input
            type="text"
            {...form.register("title")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          />
        </div>

        <Tabs defaultValue="basics" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="languages">Languages</TabsTrigger>
            <TabsTrigger value="references">References</TabsTrigger>
          </TabsList>

          <div className="mt-4">
            <TabsContent value="basics">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...form.register("content.basics.name")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Professional Title
                  </label>
                  <input
                    type="text"
                    {...form.register("content.basics.title")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    {...form.register("content.basics.email")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    {...form.register("content.basics.phone")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    {...form.register("content.basics.location")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Professional Profile
                  </label>
                  <textarea
                    {...form.register("content.basics.profile")}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="experience">
              <DynamicList<"experience">
                name="experience"
                form={form}
                label="Experience"
                fields={[
                  { name: "title", label: "Title", type: "text" },
                  { name: "company", label: "Company", type: "text" },
                  { name: "location", label: "Location", type: "text" },
                  { name: "startDate", label: "Start Date", type: "text" },
                  { name: "endDate", label: "End Date", type: "text" },
                  { name: "duties", label: "Duties", type: "textarea" },
                ]}
              />
            </TabsContent>

            <TabsContent value="education">
              <DynamicList<"education">
                name="education"
                form={form}
                label="Education"
                fields={[
                  { name: "level", label: "Level", type: "text" },
                  { name: "institution", label: "Institution", type: "text" },
                  { name: "location", label: "Location", type: "text" },
                  { name: "startDate", label: "Start Date", type: "text" },
                  { name: "endDate", label: "End Date", type: "text" },
                  { name: "highlights", label: "Highlights", type: "textarea" },
                ]}
              />
            </TabsContent>

            <TabsContent value="skills">
              <SkillsList form={form} label="Skills" />
            </TabsContent>

            <TabsContent value="languages">
              <DynamicList<"languages">
                name="languages"
                form={form}
                label="Languages"
                fields={[
                  { name: "name", label: "Language", type: "text" },
                  { name: "proficiency", label: "Proficiency", type: "text" },
                ]}
              />
            </TabsContent>

            <TabsContent value="references">
              <DynamicList<"references">
                name="references"
                form={form}
                label="References"
                fields={[
                  { name: "name", label: "Name", type: "text" },
                  { name: "organization", label: "Organization", type: "text" },
                  { name: "email", label: "Email", type: "text" },
                  { name: "phone", label: "Phone", type: "text" },
                ]}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          {isSubmitting ? "Creating..." : "Create Resume"}
        </button>
      </div>
    </form>
  );
}
