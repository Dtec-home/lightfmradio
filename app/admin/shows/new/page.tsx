'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function NewShow() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    host: '',
    description: '',
    image: '',
    schedule: '',
    category: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/shows', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-serif font-bold mb-6">Add New Show</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 rounded border border-border">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
            <Input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="host" className="block text-sm font-medium mb-2">Host</label>
            <Input
              id="host"
              type="text"
              value={formData.host}
              onChange={(e) => setFormData({ ...formData, host: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-2">Image URL</label>
            <Input
              id="image"
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="schedule" className="block text-sm font-medium mb-2">Schedule</label>
            <Input
              id="schedule"
              type="text"
              value={formData.schedule}
              onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
              placeholder="e.g., Mon-Fri 7am"
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-2">Category</label>
            <Input
              id="category"
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
          </div>
          <div className="flex gap-4">
            <Button type="submit">
              Create Show
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
