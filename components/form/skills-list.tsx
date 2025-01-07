'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { resumeSchema } from "@/lib/schema";

type FormData = z.infer<typeof resumeSchema>;

interface SkillsListProps {
  form: UseFormReturn<FormData>;
  label: string;
}

export function SkillsList({ form, label }: SkillsListProps) {
  const skillsArray = form.watch('content.skills') || [];
  const setValue = form.setValue;

  const addSkill = () => {
    setValue('content.skills', [...skillsArray, '']);
  };

  const removeSkill = (index: number) => {
    setValue(
      'content.skills',
      skillsArray.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{label}</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addSkill}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add {label}
        </Button>
      </div>
      {skillsArray.map((_, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-lg relative">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => removeSkill(index)}
            className="absolute top-2 right-2"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skill
            </label>
            <Input
              {...form.register(`content.skills.${index}`)}
              placeholder="Enter a skill"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
