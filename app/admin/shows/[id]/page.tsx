'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditShow() {
  const router = useRouter();
  const params = useParams();
  const [formData, setFormData] = useState({
    title: '',
    host: '',
    description: '',
    image: '',
    schedule: '',
    category: '',
  });

  useEffect(() => {
    fetch('/api/shows')
      .then(res => res.json())
      .then(shows => {
        const show = shows.find((s: any) => s.id === params.id);
        if (show) setFormData(show);
      });
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/shows/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-serif font-bold mb-6">Edit Show</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 rounded border border-border">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded bg-background"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Host</label>
            <input
              type="text"
              value={formData.host}
              onChange={(e) => setFormData({ ...formData, host: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded bg-background"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded bg-background"
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded bg-background"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Schedule</label>
            <input
              type="text"
              value={formData.schedule}
              onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded bg-background"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded bg-background"
              required
            />
          </div>
          <div className="flex gap-4">
            <button type="submit" className="px-6 py-2 bg-accent text-accent-foreground rounded">
              Update Show
            </button>
            <button type="button" onClick={() => router.back()} className="px-6 py-2 bg-card border border-border rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
