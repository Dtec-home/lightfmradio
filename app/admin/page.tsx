'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Show {
  id: string;
  title: string;
  host: string;
  description: string;
  image: string;
  schedule: string;
  category: string;
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  featured: boolean;
}

interface PrayerRequest {
  id: string;
  name: string;
  contact: string;
  request: string;
  isConfidential: boolean;
  isAnswered: boolean;
  createdAt: string;
}

export default function AdminDashboard() {
  const [shows, setShows] = useState<Show[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [activeTab, setActiveTab] = useState<'shows' | 'articles' | 'prayers'>('shows');
  const router = useRouter();

  useEffect(() => {
    fetchShows();
    fetchArticles();
    fetchPrayerRequests();
  }, []);

  const fetchShows = async () => {
    const res = await fetch('/api/shows');
    const data = await res.json();
    setShows(data);
  };

  const fetchArticles = async () => {
    const res = await fetch('/api/articles');
    const data = await res.json();
    setArticles(data);
  };

  const fetchPrayerRequests = async () => {
    const res = await fetch('/api/prayer-request');
    const data = await res.json();
    setPrayerRequests(Array.isArray(data) ? data : []);
  };

  const toggleAnswered = async (id: string, isAnswered: boolean) => {
    await fetch(`/api/prayer-request/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isAnswered: !isAnswered }),
    });
    fetchPrayerRequests();
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const deleteShow = async (id: string) => {
    if (!confirm('Delete this show?')) return;
    await fetch(`/api/shows/${id}`, { method: 'DELETE' });
    fetchShows();
  };

  const deleteArticle = async (id: string) => {
    if (!confirm('Delete this article?')) return;
    await fetch(`/api/articles/${id}`, { method: 'DELETE' });
    fetchArticles();
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Link href="/" className="px-4 py-2 text-sm hover:text-accent">
              View Site
            </Link>
            <Button onClick={handleLogout} variant="destructive">
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex gap-4 mb-6">
          <Button
            onClick={() => setActiveTab('shows')}
            variant={activeTab === 'shows' ? 'default' : 'outline'}
          >
            Shows
          </Button>
          <Button
            onClick={() => setActiveTab('articles')}
            variant={activeTab === 'articles' ? 'default' : 'outline'}
          >
            Articles
          </Button>
          <Button
            onClick={() => setActiveTab('prayers')}
            variant={activeTab === 'prayers' ? 'default' : 'outline'}
          >
            Prayer Requests
          </Button>
        </div>

        {activeTab === 'shows' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Shows</h2>
              <Link href="/admin/shows/new" className="px-4 py-2 bg-accent text-accent-foreground rounded">
                Add Show
              </Link>
            </div>
            <div className="grid gap-4">
              {shows.map((show) => (
                <div key={show.id} className="bg-card p-4 rounded border border-border flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{show.title}</h3>
                    <p className="text-sm text-muted-foreground">{show.host} • {show.schedule}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/shows/${show.id}`} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                      Edit
                    </Link>
                    <Button onClick={() => deleteShow(show.id)} variant="destructive" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'articles' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Articles</h2>
              <Link href="/admin/articles/new" className="px-4 py-2 bg-accent text-accent-foreground rounded">
                Add Article
              </Link>
            </div>
            <div className="grid gap-4">
              {articles.map((article) => (
                <div key={article.id} className="bg-card p-4 rounded border border-border flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{article.title}</h3>
                    <p className="text-sm text-muted-foreground">{article.category} • {new Date(article.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/articles/${article.id}`} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                      Edit
                    </Link>
                    <Button onClick={() => deleteArticle(article.id)} variant="destructive" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'prayers' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Prayer Requests</h2>
            </div>
            <div className="grid gap-4">
              {prayerRequests.map((pr) => (
                <div key={pr.id} className="bg-card p-4 rounded border border-border flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{pr.name}</h3>
                      {pr.isConfidential && (
                        <span className="px-2 py-0.5 text-xs rounded bg-destructive/10 text-destructive">
                          Confidential
                        </span>
                      )}
                      {pr.isAnswered && (
                        <span className="px-2 py-0.5 text-xs rounded bg-accent/10 text-accent">
                          Answered
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{pr.contact}</p>
                    <p className="text-sm text-foreground">{pr.request}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => toggleAnswered(pr.id, pr.isAnswered)} variant="outline" size="sm">
                      {pr.isAnswered ? 'Mark Unanswered' : 'Mark Answered'}
                    </Button>
                  </div>
                </div>
              ))}
              {prayerRequests.length === 0 && (
                <p className="text-sm text-muted-foreground">No prayer requests yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
