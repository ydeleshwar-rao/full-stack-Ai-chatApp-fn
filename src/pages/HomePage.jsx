
// HomePage.jsx (Updated)
import ChatContainer from "../components/ChatContainer";
import AiChatContainer from "../components/AiChatContainer";
import NoChatSelected from "../components/NoChatSelected";
import Sidebar from "../components/Sidebar";
import AiChatModal from "../pages/components/ai/AiChatModal";
import { useChatStore } from "../store/useChatStore";
import { useAiStore } from "../store/useAiStore";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const { isAiUserSelected } = useAiStore();
  
  const renderMainContent = () => {
    if (!selectedUser) {
      return <NoChatSelected />;
    }
    
    if (isAiUserSelected && selectedUser?.isAI) {
      return <AiChatContainer />;
    }
    
    return <ChatContainer />;
  };
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {renderMainContent()}
          </div>
        </div>
      </div>
      
      {/* AI Chat Features */}
      <AiChatModal />
    </div>
  );
};

export default HomePage;