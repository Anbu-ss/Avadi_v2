import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { CreatePostModal } from './CreatePostModal';
import {
  Plus,
  Heart,
  MessageCircle,
  Share2,
  Clock,
  Sparkles,
  Send,
  Users,
  Globe,
  AlertTriangle,
  HeartHandshake,
  Phone,
} from 'lucide-react';

export const CommunityFeed: React.FC = () => {
  const { user } = useAuth();
  const { posts, likePost, addComment } = useAppData();
  const [filter, setFilter] = useState<'My Ward' | 'All Avadi' | 'Complaints' | 'Emergency Blood'>('My Ward');
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');

  const filteredPosts = posts.filter((p) => {
    if (filter === 'Emergency Blood') {
      return p.isEmergencyBlood === true;
    }
    if (filter === 'My Ward') {
      return p.wardTag === `Ward ${user?.wardNumber || 12}` || p.audience === 'My Ward';
    }
    if (filter === 'Complaints') {
      return p.category === 'Civic Issue';
    }
    return true;
  });

  const handleSendComment = (postId: string) => {
    if (!commentInput.trim()) return;
    addComment(postId, commentInput, user?.name || 'Resident');
    setCommentInput('');
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-2xl mx-auto px-4 pt-4 space-y-4">
        {/* Filter Navigation Tabs */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex space-x-1.5 overflow-x-auto w-full">
            <button
              onClick={() => setFilter('My Ward')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 ${
                filter === 'My Ward'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>My Ward (Ward {user?.wardNumber || 12})</span>
            </button>

            <button
              onClick={() => setFilter('All Avadi')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 ${
                filter === 'All Avadi'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>All Avadi</span>
            </button>

            <button
              onClick={() => setFilter('Emergency Blood')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 ${
                filter === 'Emergency Blood'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Emergency Blood</span>
            </button>

            <button
              onClick={() => setFilter('Complaints')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 ${
                filter === 'Complaints'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Complaints Feed</span>
            </button>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 text-center border border-slate-200 dark:border-slate-800 space-y-3">
              <Sparkles className="w-10 h-10 text-emerald-500 mx-auto" />
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {filter === 'Emergency Blood' ? 'No active emergency blood requests' : 'No posts in this feed yet'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {filter === 'Emergency Blood'
                  ? 'All emergency blood requirements in Avadi ward are fulfilled.'
                  : 'Be the first to share an update with your ward neighbors!'}
              </p>
              <button
                onClick={() => setIsComposerOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow hover:bg-emerald-700"
              >
                Create Community Post
              </button>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <article
                key={post.id}
                className={`bg-white dark:bg-slate-900 rounded-3xl p-5 border shadow-sm space-y-3 transition-all ${
                  post.isEmergencyBlood
                    ? 'border-2 border-rose-500/80 dark:border-rose-800 shadow-rose-500/10'
                    : 'border-slate-200/80 dark:border-slate-800'
                }`}
              >
                {/* Author Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="w-10 h-10 rounded-full object-cover border border-emerald-500/30"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
                        {post.authorName}
                        <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {post.wardTag}
                        </span>
                      </h4>
                      <div className="flex items-center text-[11px] text-slate-400 space-x-2 mt-0.5">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {post.timestamp}
                        </span>
                        <span>•</span>
                        <span>{post.audience}</span>
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    post.isEmergencyBlood
                      ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-300'
                      : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                  }`}>
                    {post.isEmergencyBlood ? '🚨 EMERGENCY BLOOD' : `#${post.category}`}
                  </span>
                </div>

                {/* Emergency Blood Highlight Card */}
                {post.isEmergencyBlood && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 via-pink-50 to-red-50 dark:from-rose-950/50 dark:via-pink-950/40 dark:to-red-950/50 border border-rose-200 dark:border-rose-900/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider animate-pulse flex items-center gap-1">
                        <HeartHandshake className="w-3 h-3" />
                        Urgent Blood Requirement
                      </span>
                      <span className="px-3.5 py-1 rounded-xl bg-red-600 text-white font-black text-sm shadow-md">
                        {post.bloodGroupNeeded || 'Urgent'}
                      </span>
                    </div>

                    <div className="text-xs text-slate-700 dark:text-slate-200 font-semibold space-y-1">
                      <p className="flex items-center">
                        <span className="text-slate-500 dark:text-slate-400 font-normal mr-1.5">Hospital / Location:</span>
                        <span className="font-bold text-slate-900 dark:text-white">{post.hospitalName || 'Avadi Govt Hospital'}</span>
                      </p>
                      <p className="flex items-center">
                        <span className="text-slate-500 dark:text-slate-400 font-normal mr-1.5">Contact Phone:</span>
                        <span className="font-mono font-bold text-slate-900 dark:text-white">{post.contactNumber || '9876543210'}</span>
                      </p>
                    </div>

                    <a
                      href={`tel:${post.contactNumber || '9876543210'}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold shadow-md flex items-center justify-center space-x-1.5 transition-all"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Donor Contact Now</span>
                    </a>
                  </div>
                )}

                {/* Post Content */}
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal whitespace-pre-line">
                  {post.content}
                </p>

                {post.images && post.images.length > 0 && (
                  <div className={`grid gap-2 rounded-2xl overflow-hidden ${post.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {post.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt="Post media"
                        className="w-full h-56 object-cover hover:scale-[1.01] transition-transform"
                      />
                    ))}
                  </div>
                )}

                {/* Actions Bar */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  <button
                    onClick={() => likePost(post.id)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl transition-colors ${
                      post.isLiked
                        ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 font-bold'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
                    <span>{post.likes} Likes</span>
                  </button>

                  <button
                    onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.commentsCount} Comments</span>
                  </button>

                  <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>

                {/* Comments Drawer */}
                {activeCommentPostId === post.id && (
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {post.comments && post.comments.length > 0 ? (
                        post.comments.map((c) => (
                          <div key={c.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
                            <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                              <span>{c.author}</span>
                              <span className="text-[10px] text-slate-400 font-normal">{c.time}</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 mt-0.5">{c.text}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400 italic">No comments yet. Write the first comment!</p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendComment(post.id)}
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs dark:text-white outline-none"
                      />
                      <button
                        onClick={() => handleSendComment(post.id)}
                        className="p-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </article>
            ))
          )}
        </div>

        {/* Floating Post Composer Trigger */}
        <button
          onClick={() => setIsComposerOpen(true)}
          className="fixed bottom-20 right-5 sm:right-8 z-40 p-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all ring-4 ring-white dark:ring-slate-900"
          title="Create New Post"
        >
          <Plus className="w-6 h-6" />
        </button>

        {/* Create Post Modal */}
        <CreatePostModal
          isOpen={isComposerOpen}
          onClose={() => setIsComposerOpen(false)}
        />
      </div>
    </div>
  );
};
