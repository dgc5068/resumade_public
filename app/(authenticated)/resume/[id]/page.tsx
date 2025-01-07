'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Resume } from '@/types/resume';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

export default function ResumePage() {
  const params = useParams();
  const [resume, setResume] = useState<Resume | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeVariation, setActiveVariation] = useState(0);
  const [variations, setVariations] = useState<Resume['content'][]>([]);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await fetch(`/api/resume/${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch resume');
        const data = await response.json();
        setResume(data);
        
        // Fetch variations if they exist
        const variationsResponse = await fetch(`/api/resume/${params.id}/variations`);
        if (variationsResponse.ok) {
          const variationsData = await variationsResponse.json();
          setVariations(variationsData);
        }
      } catch (error) {
        console.error('Error fetching resume:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchResume();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Resume not found</h3>
          </div>
        </div>
      </div>
    );
  }

  const currentContent = variations[activeVariation] || resume.content;

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {resume.title}
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button
            type="button"
            onClick={() => window.print()}
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Export PDF
          </button>
        </div>
      </div>

      {variations.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resume Variations
          </label>
          <div className="flex gap-2">
            {variations.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveVariation(index)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activeVariation === index
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Version {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="edit">Edit</TabsTrigger>
            </TabsList>

            <TabsContent value="preview">
              <div className="prose max-w-none">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2">{currentContent.basics.name}</h1>
                  <p className="text-xl text-gray-600 mb-2">{currentContent.basics.title}</p>
                  <div className="text-gray-600">
                    {currentContent.basics.location && (
                      <p>{currentContent.basics.location}</p>
                    )}
                    {currentContent.basics.email && (
                      <p>{currentContent.basics.email}</p>
                    )}
                    {currentContent.basics.phone && (
                      <p>{currentContent.basics.phone}</p>
                    )}
                  </div>
                  <div className="mt-4">
                    <p>{currentContent.basics.profile}</p>
                  </div>
                </div>

                {currentContent.experience.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Experience</h2>
                    {currentContent.experience.map((exp, index) => (
                      <div key={index} className="mb-4">
                        <h3 className="text-xl font-semibold">{exp.title}</h3>
                        <p className="text-gray-600">
                          {exp.company} • {exp.location}
                        </p>
                        <p className="text-gray-600">
                          {exp.startDate} - {exp.endDate || 'Present'}
                        </p>
                        <ul className="list-disc ml-4 mt-2">
                          {exp.duties.map((duty, i) => (
                            <li key={i}>{duty}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {currentContent.education.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Education</h2>
                    {currentContent.education.map((edu, index) => (
                      <div key={index} className="mb-4">
                        <h3 className="text-xl font-semibold">{edu.level}</h3>
                        <p className="text-gray-600">
                          {edu.institution} • {edu.location}
                        </p>
                        <p className="text-gray-600">
                          {edu.startDate} - {edu.endDate || 'Present'}
                        </p>
                        <ul className="list-disc ml-4 mt-2">
                          {edu.highlights.map((highlight, i) => (
                            <li key={i}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {currentContent.skills.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {currentContent.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {currentContent.languages.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Languages</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {currentContent.languages.map((lang, index) => (
                        <div key={index} className="flex justify-between">
                          <span>{lang.name}</span>
                          {lang.proficiency && (
                            <span className="text-gray-600">{lang.proficiency}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentContent.references.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">References</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentContent.references.map((ref, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h3 className="font-semibold">{ref.name}</h3>
                          <p className="text-gray-600">{ref.organization}</p>
                          {ref.email && <p>{ref.email}</p>}
                          {ref.phone && <p>{ref.phone}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="edit">
              <div className="text-center py-8">
                <p className="text-gray-600">Edit functionality coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
