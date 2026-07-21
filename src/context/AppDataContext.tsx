import React, { createContext, useContext, useState } from 'react';
import type { FeedPost, CivicComplaint, ComplaintStatus } from '../types';
import { INITIAL_FEED_POSTS, INITIAL_COMPLAINTS } from '../mock/mockData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppDataContextType {
  posts: FeedPost[];
  complaints: CivicComplaint[];
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  addPost: (post: Omit<FeedPost, 'id' | 'likes' | 'commentsCount'>) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, text: string, authorName: string) => void;
  addComplaint: (complaint: Omit<CivicComplaint, 'id' | 'issueId' | 'status' | 'createdAt' | 'updatedAt' | 'timeline' | 'assignedOfficial' | 'officialPhone'>) => string;
  updateComplaintStatus: (issueId: string, nextStatus: ComplaintStatus) => void;
  isPWAInstalled: boolean;
  dismissPWAPrompt: () => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<FeedPost[]>(() => {
    const saved = localStorage.getItem('avadi_posts');
    return saved ? JSON.parse(saved) : INITIAL_FEED_POSTS;
  });

  const [complaints, setComplaints] = useState<CivicComplaint[]>(() => {
    const saved = localStorage.getItem('avadi_complaints');
    return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
  });

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isPWAInstalled, setIsPWAInstalled] = useState<boolean>(false);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addPost = (newPostData: Omit<FeedPost, 'id' | 'likes' | 'commentsCount'>) => {
    const newPost: FeedPost = {
      ...newPostData,
      id: `post-${Date.now()}`,
      likes: 0,
      isLiked: false,
      commentsCount: 0,
      comments: [],
    };
    setPosts((prev) => {
      const updated = [newPost, ...prev];
      localStorage.setItem('avadi_posts', JSON.stringify(updated));
      return updated;
    });
    showToast('Community post published successfully!', 'success');
  };

  const likePost = (postId: string) => {
    setPosts((prev) => {
      const updated = prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likes: isLiked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      });
      localStorage.setItem('avadi_posts', JSON.stringify(updated));
      return updated;
    });
  };

  const addComment = (postId: string, text: string, authorName: string) => {
    setPosts((prev) => {
      const updated = prev.map((p) => {
        if (p.id === postId) {
          const newComment = {
            id: `c-${Date.now()}`,
            author: authorName,
            text,
            time: 'Just now',
          };
          const comments = [...(p.comments || []), newComment];
          return {
            ...p,
            comments,
            commentsCount: comments.length,
          };
        }
        return p;
      });
      localStorage.setItem('avadi_posts', JSON.stringify(updated));
      return updated;
    });
    showToast('Comment added!', 'info');
  };

  const addComplaint = (data: Omit<CivicComplaint, 'id' | 'issueId' | 'status' | 'createdAt' | 'updatedAt' | 'timeline' | 'assignedOfficial' | 'officialPhone'>): string => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const issueId = `AVD-2026-${randomNum}`;
    const nowStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

    const newComplaint: CivicComplaint = {
      ...data,
      id: `comp-${Date.now()}`,
      issueId,
      status: 'Submitted',
      createdAt: nowStr,
      updatedAt: nowStr,
      assignedOfficial: 'Er. R. Tamilselvan (Ward AE)',
      officialPhone: '+91 94440 98765',
      timeline: [
        { status: 'Submitted', date: nowStr, description: 'Complaint registered by resident.', isDone: true },
        { status: 'Action Initiated', date: 'Under Review', description: 'Assigning ward technical team.', isDone: false },
        { status: 'In Progress', date: 'Pending', description: 'Work site inspection.', isDone: false },
        { status: 'Resolved', date: 'Pending', description: 'Resolution confirmation.', isDone: false },
      ],
    };

    setComplaints((prev) => {
      const updated = [newComplaint, ...prev];
      localStorage.setItem('avadi_complaints', JSON.stringify(updated));
      return updated;
    });
    return issueId;
  };

  const updateComplaintStatus = (issueId: string, nextStatus: ComplaintStatus) => {
    const nowStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    setComplaints((prev) => {
      const updated = prev.map((c) => {
        if (c.issueId === issueId) {
          const updatedTimeline = c.timeline.map((step) => {
            if (step.status === nextStatus) {
              return { ...step, date: nowStr, isDone: true };
            }
            return step;
          });
          return {
            ...c,
            status: nextStatus,
            updatedAt: nowStr,
            timeline: updatedTimeline,
          };
        }
        return c;
      });
      localStorage.setItem('avadi_complaints', JSON.stringify(updated));
      return updated;
    });
  };

  const dismissPWAPrompt = () => {
    setIsPWAInstalled(true);
  };

  return (
    <AppDataContext.Provider
      value={{
        posts,
        complaints,
        toasts,
        showToast,
        removeToast,
        addPost,
        likePost,
        addComment,
        addComplaint,
        updateComplaintStatus,
        isPWAInstalled,
        dismissPWAPrompt,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = (): AppDataContextType => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
};
