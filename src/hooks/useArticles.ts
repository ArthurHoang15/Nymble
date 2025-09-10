import { useState, useEffect } from 'react';
import type { Article } from '../types';
import * as articleService from '../services/articleService';

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load articles
  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await articleService.getArticles();
      setArticles(data);
    } catch (err) {
      console.error('Failed to load articles:', err);
      setError(err instanceof Error ? err.message : 'Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  // Create article
  const createArticle = async (articleData: Omit<Article, 'id' | 'created_at'>) => {
    try {
      setError(null);
      const newArticle = await articleService.createArticle(articleData);
      setArticles(prev => [newArticle, ...prev]);
      return newArticle;
    } catch (err) {
      console.error('Failed to create article:', err);
      setError(err instanceof Error ? err.message : 'Failed to create article');
      throw err;
    }
  };

  // Update article
  const updateArticle = async (id: number, updates: Partial<Omit<Article, 'id' | 'created_at'>>) => {
    try {
      setError(null);
      const updatedArticle = await articleService.updateArticle(id, updates);
      setArticles(prev => prev.map(article => 
        article.id === id ? updatedArticle : article
      ));
      return updatedArticle;
    } catch (err) {
      console.error('Failed to update article:', err);
      setError(err instanceof Error ? err.message : 'Failed to update article');
      throw err;
    }
  };

  // Delete article
  const deleteArticle = async (id: number) => {
    try {
      setError(null);
      await articleService.deleteArticle(id);
      setArticles(prev => prev.filter(article => article.id !== id));
    } catch (err) {
      console.error('Failed to delete article:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete article');
      throw err;
    }
  };

  // Load articles on mount
  useEffect(() => {
    loadArticles();
  }, []);

  return {
    articles,
    loading,
    error,
    createArticle,
    updateArticle,
    deleteArticle,
    refetch: loadArticles,
  };
};
