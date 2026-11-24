'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Trash2, Save, ArrowLeft, Upload } from 'lucide-react';
import { toast } from "react-hot-toast";

interface SubTopic {
  title: string;
  duration: string;
  content: string;
  image?: string;
}

interface Section {
  title: string;
  duration: string;
  subtopics: SubTopic[];
}

export default function CreateLesson() {
  const [lesson, setLesson] = useState({
    title: "What is Fungi?",
    description: "Discover the amazing hidden world of mushrooms, molds, and yeasts!",
    subject: "Science",
    grade: "Grade 2",
    duration: "8 minutes",
    thumbnail: "https://picsum.photos/id/1015/800/450",
  });

const [uploadingImage, setUploadingImage] = useState(false)

      // Cloudinary Image Upload
   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setUploadingImage(true);

  const formDataUpload = new FormData();
  formDataUpload.append("file", file);
  formDataUpload.append("upload_preset", "pfschools"); // Must match your preset name

  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dsupdus2u";

    if (!cloudName) {
      throw new Error("Cloudinary Cloud Name is missing in .env.local");
    }

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formDataUpload,
      }
    );

    const data = await res.json();

    if (data.secure_url) {
      setLesson(prev => ({ ...prev, thumbnail: data.secure_url }));
      toast.success("Image uploaded successfully!");
    } else {
      throw new Error(data.error?.message || "Upload failed");
    }
  } catch (error: unknown) {
    console.error("Cloudinary Upload Error:", error);
    toast.error(
      error instanceof Error ? error.message : "Failed to upload image. Check console."
    );
  } finally {
    setUploadingImage(false);
  }
};

  const [sections, setSections] = useState<Section[]>([
    {
      title: "What are Fungi?",
      duration: "5 minutes",
      subtopics: [
        {
          title: "Introduction to Fungi",
          duration: "1 min",
          content: "Fungi are living things that are not plants or animals. They include mushrooms, molds, and yeasts!",
          image: "https://picsum.photos/id/1015/600/400"
        },
        {
          title: "How Fungi Look",
          duration: "2 min",
          content: "Most fungi have a body made of tiny threads called hyphae...",
          image: "https://picsum.photos/id/201/600/400"
        },
      ]
    }
  ]);

  const addSection = () => {
    setSections([...sections, { title: "", duration: "", subtopics: [] }]);
  };

  const addSubTopic = (sectionIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].subtopics.push({
      title: "",
      duration: "",
      content: "",
      image: ""
    });
    setSections(newSections);
  };

  const updateLesson = (field: string, value: string) => {
    setLesson({ ...lesson, [field]: value });
  };

  const updateSection = (index: number, field: string, value: string) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setSections(newSections);
  };

  const updateSubTopic = (sectionIndex: number, subIndex: number, field: string, value: string) => {
    const newSections = [...sections];
    newSections[sectionIndex].subtopics[subIndex] = {
      ...newSections[sectionIndex].subtopics[subIndex],
      [field]: value
    };
    setSections(newSections);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const removeSubTopic = (sectionIndex: number, subIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].subtopics.splice(subIndex, 1);
    setSections(newSections);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = { ...lesson, sections };

    try {
      const res = await fetch('/api/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Lesson saved successfully!');
      } else {
        alert('Failed to save lesson');
      }
    } catch (error) {
      console.error(error);
      alert('Error saving lesson');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 text-gray-900">
     
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/dashboard"
            aria-label="Back to dashboard"
            className="text-emerald-600 hover:text-emerald-700"
          >
            <ArrowLeft size={24} aria-hidden="true" />
          </Link>
          <h1 className="text-4xl font-bold">Create New Lesson</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Lesson Info */}
          <div className="bg-white p-8 rounded-3xl shadow">
            <h2 className="text-2xl font-semibold mb-6">Lesson Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Lesson Title</label>
                <input
                  value={lesson.title}
                  onChange={(e) => updateLesson('title', e.target.value)}
                  className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
            {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">Product Image</label>
                <div className="flex gap-4">
                  <label className="flex-1 cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-gray-400 transition">
                      <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                      <p className="text-sm text-gray-500">Click to upload image</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>

                  {lesson.thumbnail && (
                    <div className="relative w-24 h-24 border rounded-2xl overflow-hidden">
                      <Image
                        src={lesson.thumbnail}
                        alt="Lesson thumbnail preview"
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
                {uploadingImage && <p className="text-sm text-blue-600 mt-2">Uploading to Cloudinary...</p>}
              </div>


              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <input
                  value={lesson.duration}
                  onChange={(e) => updateLesson('duration', e.target.value)}
                  className="w-full px-4 py-3 border rounded-2xl"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={lesson.description}
                  onChange={(e) => updateLesson('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Sections & Subtopics */}
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Sections</h2>
              <button
                type="button"
                onClick={addSection}
                className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-2xl hover:bg-emerald-700"
              >
                <Plus size={20} /> Add Section
              </button>
            </div>

            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-white rounded-3xl shadow p-8">
                <div className="flex justify-between mb-6">
                  <h3 className="text-xl font-semibold">Section {sectionIndex + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeSection(sectionIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <input
                    placeholder="Section Title"
                    value={section.title}
                    onChange={(e) => updateSection(sectionIndex, 'title', e.target.value)}
                    className="px-4 py-3 border rounded-2xl"
                    required
                  />
                  <input
                    placeholder="Section Duration"
                    value={section.duration}
                    onChange={(e) => updateSection(sectionIndex, 'duration', e.target.value)}
                    className="px-4 py-3 border rounded-2xl"
                  />
                </div>

                <div className="mb-4 font-medium">Subtopics</div>
                {section.subtopics.map((sub, subIndex) => (
                  <div key={subIndex} className="border rounded-2xl p-6 mb-6 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input
                        placeholder="Subtopic Title"
                        value={sub.title}
                        onChange={(e) => updateSubTopic(sectionIndex, subIndex, 'title', e.target.value)}
                        className="px-4 py-3 border rounded-xl"
                      />
                      <input
                        placeholder="Duration (e.g. 2 min)"
                        value={sub.duration}
                        onChange={(e) => updateSubTopic(sectionIndex, subIndex, 'duration', e.target.value)}
                        className="px-4 py-3 border rounded-xl"
                      />
                    </div>
                    <textarea
                      placeholder="Content / Explanation"
                      value={sub.content}
                      onChange={(e) => updateSubTopic(sectionIndex, subIndex, 'content', e.target.value)}
                      rows={5}
                      className="w-full px-4 py-3 border rounded-xl mb-4"
                    />
                    <input
                      placeholder="Image URL (optional)"
                      value={sub.image}
                      onChange={(e) => updateSubTopic(sectionIndex, subIndex, 'image', e.target.value)}
                      className="w-full px-4 py-3 border rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => removeSubTopic(sectionIndex, subIndex)}
                      className="mt-4 text-red-500 text-sm flex items-center gap-1"
                    >
                      <Trash2 size={16} /> Remove Subtopic
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addSubTopic(sectionIndex)}
                  className="text-emerald-600 hover:text-emerald-700 flex items-center gap-2 text-sm font-medium"
                >
                  <Plus size={18} /> Add Subtopic
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 text-xl font-semibold rounded-3xl flex items-center justify-center gap-3"
          >
            <Save size={24} /> Save Lesson to Database
          </button>
        </form>
      </div>
    </div>
  );
}