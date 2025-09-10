import { supabase } from '../lib/supabase';
import type { Article } from '../types';
import type { Database } from '../types/database';

type ArticleRow = Database['public']['Tables']['articles']['Row'];
type ArticleInsert = Database['public']['Tables']['articles']['Insert'];
type ArticleUpdate = Database['public']['Tables']['articles']['Update'];

// Transform database row to Article type
const transformArticle = (row: ArticleRow): Article => ({
  id: row.id,
  created_at: row.created_at,
  source_url: row.source_url,
  title: row.title,
  author: row.author,
  github_url: row.github_url || '',
  content: row.content,
  rating: row.rating,
  status: row.status,
  notes: row.notes,
  tags: row.tags || [],
});

// Get all articles
export const getArticles = async (): Promise<Article[]> => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }

    return data?.map(transformArticle) || [];
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    throw error;
  }
};

// Create new article
export const createArticle = async (article: Omit<Article, 'id' | 'created_at'>): Promise<Article> => {
  try {
    const articleData: ArticleInsert = {
      source_url: article.source_url,
      title: article.title,
      author: article.author,
      github_url: article.github_url || null,
      content: article.content,
      rating: article.rating,
      status: article.status,
      notes: article.notes,
      tags: article.tags,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('articles')
      .insert([articleData])
      .select()
      .single();

    if (error) {
      console.error('Error creating article:', error);
      throw error;
    }

    return transformArticle(data);
  } catch (error) {
    console.error('Failed to create article:', error);
    throw error;
  }
};

// Update article
export const updateArticle = async (id: number, updates: Partial<Omit<Article, 'id' | 'created_at'>>): Promise<Article> => {
  try {
    const updateData: ArticleUpdate = {
      ...updates,
      github_url: updates.github_url || null,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('articles')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating article:', error);
      throw error;
    }

    return transformArticle(data);
  } catch (error) {
    console.error('Failed to update article:', error);
    throw error;
  }
};

// Delete article
export const deleteArticle = async (id: number): Promise<void> => {
  try {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting article:', error);
      throw error;
    }
  } catch (error) {
    console.error('Failed to delete article:', error);
    throw error;
  }
};

// Get unique tags from all articles
export const getAllTags = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('tags');

    if (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }

    const tagsSet = new Set<string>();
    data?.forEach(article => {
      article.tags?.forEach((tag: string) => tagsSet.add(tag));
    });

    return Array.from(tagsSet).sort();
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    throw error;
  }
};
