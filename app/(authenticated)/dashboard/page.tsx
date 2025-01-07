import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { FileText, Plus } from "lucide-react";
import { getResumes } from "@/lib/resume";

export default async function DashboardPage() {
  const { userId } = auth();
  if (!userId) return null;

  const resumes = await getResumes(userId);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      {resumes.length === 0 ? (
        <div className="text-center">
          <div className="flex justify-center">
            <FileText className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No resumes</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new resume.
          </p>
          <div className="mt-6">
            <Link
              href="/create"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <Plus className="-ml-1 mr-2 h-5 w-5" />
              New Resume
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Your Resumes</h1>
            <Link
              href="/create"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <Plus className="-ml-1 mr-2 h-5 w-5" />
              New Resume
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
              >
                <div className="flex-1 min-w-0">
                  <Link href={`/resume/${resume.id}`} className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">{resume.title}</p>
                    <p className="text-sm text-gray-500 truncate">
                      Last modified {new Date(resume.updated_at).toLocaleDateString()}
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
