'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

export default function AdminDashboard() {
  const [shows, setShows] = useState<Show[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeTab, setActiveTab] = useState<'shows' | 'articles'>('shows');
  const router = useRouter();

  useEffect(() => {
    fetchShows();
    fetchArticles();
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
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('shows')}
            className={`px-6 py-2 rounded ${activeTab === 'shows' ? 'bg-accent text-accent-foreground' : 'bg-card'}`}
          >
            Shows
          </button>
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-6 py-2 rounded ${activeTab === 'articles' ? 'bg-accent text-accent-foreground' : 'bg-card'}`}
          >
            Articles
          </button>
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
                    <button onClick={() => deleteShow(show.id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm">
                      Delete
                    </button>
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
                    <button onClick={() => deleteArticle(article.id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
