'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, UseFormReturn, Path } from "react-hook-form";
import { z } from "zod";
import { resumeSchema } from "@/lib/schema";

type FormData = z.infer<typeof resumeSchema>;

type ComplexSectionName = 'experience' | 'education' | 'languages' | 'references';

type ComplexSectionDataMap = {
  experience: FormData['content']['experience'][number];
  education: FormData['content']['education'][number];
  languages: FormData['content']['languages'][number];
  references: FormData['content']['references'][number];
};

interface Field {
  name: string;
  label: string;
  type: 'text' | 'textarea';
}

interface DynamicListProps<T extends ComplexSectionName> {
  form: UseFormReturn<FormData>;
  name: T;
  label: string;
  fields: Field[];
}

const getEmptyItem = <T extends ComplexSectionName>(name: T): ComplexSectionDataMap[T] => {
  const emptyItems: ComplexSectionDataMap = {
    experience: {
      title: '',
      company: '',
      location: '',
      startDate: '',
      duties: [],
    },
    education: {
      level: '',
      institution: '',
      location: '',
      startDate: '',
      highlights: [],
    },
    languages: {
      name: '',
      proficiency: '',
    },
    references: {
      name: '',
      organization: '',
      email: '',
      phone: '',
    },
  };
  return emptyItems[name];
};

export function DynamicList<T extends ComplexSectionName>({
  form,
  name,
  label,
  fields,
}: DynamicListProps<T>) {
  const { fields: items, append, remove } = useFieldArray<FormData>({
    control: form.control,
    name: `content.${name}` as `content.${T}`,
  });

  const handleAdd = () => {
    const emptyItem = getEmptyItem(name);
    append(emptyItem as ComplexSectionDataMap[T]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{label}</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAdd}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add {label}
        </Button>
      </div>
      {items.map((field, index) => (
        <div key={field.id} className="space-y-4 p-4 border rounded-lg relative">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => remove(index)}
            className="absolute top-2 right-2"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          {fields.map((fieldConfig) => (
            <div key={fieldConfig.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {fieldConfig.label}
              </label>
              {fieldConfig.type === 'textarea' ? (
                <Textarea
                  {...form.register(`content.${name}.${index}.${fieldConfig.name}` as Path<FormData>)}
                  placeholder={`Enter ${fieldConfig.label.toLowerCase()}`}
                />
              ) : (
                <Input
                  {...form.register(`content.${name}.${index}.${fieldConfig.name}` as Path<FormData>)}
                  placeholder={`Enter ${fieldConfig.label.toLowerCase()}`}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
