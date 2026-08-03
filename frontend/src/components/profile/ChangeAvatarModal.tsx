import React, { useState } from 'react';
import { X, Upload, Check, Link as LinkIcon, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ChangeAvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar: string;
  onSaveAvatar: (newAvatarUrl: string) => void;
}

export const ChangeAvatarModal: React.FC<ChangeAvatarModalProps> = ({
  isOpen,
  onClose,
  currentAvatar,
  onSaveAvatar,
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string>(currentAvatar);
  const [imageUrlInput, setImageUrlInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'upload' | 'preset' | 'url'>('upload');

  if (!isOpen) return null;

  const presetAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300',
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setSelectedAvatar(result);
        toast.success('Photo loaded successfully! Click Save Photo to apply.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyUrl = () => {
    if (!imageUrlInput.trim()) {
      toast.error('Please enter a valid image URL');
      return;
    }
    setSelectedAvatar(imageUrlInput.trim());
    toast.success('Photo URL loaded! Click Save Photo to apply.');
  };

  const handleSave = () => {
    if (!selectedAvatar) {
      toast.error('Please select or upload a profile picture.');
      return;
    }
    onSaveAvatar(selectedAvatar);
    toast.success('Profile picture updated successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md overflow-hidden bg-[#0A192F] border border-cyan-500/30 rounded-2xl shadow-2xl text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-slate-900/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Change Profile Picture</h3>
              <p className="text-[11px] text-cyan-400 font-medium">Upload from device or choose an avatar</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-800 bg-slate-900/60 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-3 font-bold transition-all border-b-2 flex items-center justify-center gap-1.5 ${
              activeTab === 'upload'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/10'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Upload size={14} /> Upload File
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preset')}
            className={`flex-1 py-3 font-bold transition-all border-b-2 flex items-center justify-center gap-1.5 ${
              activeTab === 'preset'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/10'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles size={14} /> Presets
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`flex-1 py-3 font-bold transition-all border-b-2 flex items-center justify-center gap-1.5 ${
              activeTab === 'url'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/10'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <LinkIcon size={14} /> Image URL
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-4">
          
          {/* Avatar Preview Box */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="relative p-1 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400 shadow-xl">
              {selectedAvatar ? (
                <img
                  src={selectedAvatar}
                  alt="Avatar Preview"
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#0A192F]"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-[#0A192F] flex items-center justify-center text-slate-500 text-2xl font-bold">
                  Preview
                </div>
              )}
            </div>
            <span className="text-[11px] text-slate-400">Selected Profile Avatar Preview</span>
          </div>

          {/* TAB 1: Upload File */}
          {activeTab === 'upload' && (
            <div className="space-y-3 text-center">
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-cyan-500/40 hover:border-emerald-400 rounded-2xl bg-slate-900/60 cursor-pointer transition-all hover:bg-slate-900 group">
                <Upload className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform mb-2" />
                <span className="text-xs font-bold text-white">Click to Select Photo from Computer</span>
                <span className="text-[10px] text-slate-400 mt-1">Supports PNG, JPG, WEBP (Max 5MB)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {/* TAB 2: Presets Grid */}
          {activeTab === 'preset' && (
            <div className="space-y-2">
              <p className="text-xs text-slate-300 font-medium">Select a student avatar preset:</p>
              <div className="grid grid-cols-4 gap-3 max-h-48 overflow-y-auto custom-scrollbar p-1">
                {presetAvatars.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedAvatar(url)}
                    className={`relative p-0.5 rounded-full overflow-hidden transition-all hover:scale-105 border-2 ${
                      selectedAvatar === url ? 'border-emerald-400 scale-105 shadow-lg shadow-emerald-500/30' : 'border-transparent'
                    }`}
                  >
                    <img src={url} alt={`Preset ${idx + 1}`} className="w-14 h-14 rounded-full object-cover" />
                    {selectedAvatar === url && (
                      <div className="absolute inset-0 bg-emerald-500/30 flex items-center justify-center rounded-full">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Image URL */}
          {activeTab === 'url' && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-cyan-300 uppercase tracking-wider">
                Paste Image Address / URL:
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  placeholder="https://example.com/my-photo.jpg"
                  className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs outline-none focus:border-emerald-400"
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  className="px-3 py-2 bg-slate-800 text-xs font-bold text-cyan-300 hover:text-white rounded-xl border border-slate-700"
                >
                  Load
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="pt-3 flex justify-end space-x-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
            >
              <Check className="w-4 h-4" /> Save Photo
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
