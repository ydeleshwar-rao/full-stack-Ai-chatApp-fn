import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAiStore } from "../store/useAiStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Bot } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { openaiApiKey, aiPrompt, setAiUserSelected } = useAiStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly ? users.filter(user => onlineUsers.includes(user.id)) : users;

  // AI User object
  const aiUser = {
    id: 'ai-assistant',
    fullName: 'AI Assistant',
    profilePic: null,
    isAI: true
  };

  const handleUserSelect = (user) => {
    if (user.isAI) {
      setAiUserSelected(true);
      setSelectedUser(aiUser);
    } else {
      setAiUserSelected(false);
      setSelectedUser(user);
    }
  };

  if (isUsersLoading) return <SidebarSkeleton />

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {/* AI Chat User - Show only if API key and prompt are set */}
        {openaiApiKey && aiPrompt && (
          <button
            onClick={() => handleUserSelect(aiUser)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors border-b border-base-200 ${
              selectedUser?.isAI ? "bg-primary bg-opacity-10 ring-1 ring-primary" : ""
            }`}
          >
            <div className="relative mx-auto lg:mx-0">
              <div className="size-12 bg-primary rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary-content" />
              </div>
              <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
            </div>

            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate flex items-center gap-2">
                AI Assistant
                <span className="badge badge-primary badge-xs">AI</span>
              </div>
              <div className="text-sm text-green-500">
                Online • Ready to help
              </div>
            </div>
          </button>
        )}

        {/* Regular Users */}
        {filteredUsers.map((user) => (
          <button
            key={user.id}
            onClick={() => handleUserSelect(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
              selectedUser?.id === user.id && !selectedUser?.isAI ? "bg-base-300 ring-1 ring-base-300" : ""
            }`}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full" 
              />
              {onlineUsers.includes(user.id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
              )}
            </div>

            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user.id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && !openaiApiKey && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;