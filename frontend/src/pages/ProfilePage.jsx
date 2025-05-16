import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, Trash2, User, X } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const DEFAULT_PROFILE_PIC = "/avatar.png";

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const handleRemoveProfilePic = async () => {
    setSelectedImg(null);
    await updateProfile({ profilePic: null });
  };

  const openImagePreview = () => {
    setShowImagePreview(true);
  };

  const hasProfilePicture = selectedImg || authUser.profilePic;
  const currentProfilePic = selectedImg || authUser.profilePic || DEFAULT_PROFILE_PIC;

  return (
    <div className="h-screen pt-20">
      {/* Image Preview Modal */}
      {showImagePreview && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button 
              onClick={() => setShowImagePreview(false)}
              className="absolute top-2 right-2 bg-base-100/30 hover:bg-base-100/50 p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <img 
              src={currentProfilePic} 
              alt="Profile Preview" 
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={currentProfilePic}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 cursor-pointer"
                onClick={openImagePreview}
                title="Click to view full image"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
              
              {hasProfilePicture && (
                <button
                  onClick={handleRemoveProfilePic}
                  disabled={isUpdatingProfile}
                  className={`
                    absolute bottom-0 left-0
                    bg-red-500 hover:bg-red-600 hover:scale-105
                    p-2 rounded-full cursor-pointer
                    transition-all duration-200
                    ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                  `}
                >
                  <Trash2 className="w-5 h-5 text-white" />
                </button>
              )}
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Joined On</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
