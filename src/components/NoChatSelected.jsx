// import { MessageSquare, Bot, Sparkles } from "lucide-react";
// import FloatingAiButton from "../components/FloatingAiButton";

// const NoChatSelected = () => {
//   return (
//     <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
//       <div className="max-w-md text-center space-y-6">
//         {/* Icon Display */}
//         <div className="flex justify-center gap-4 mb-4">
//           <div className="relative">
//             <div
//               className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
//              justify-center animate-bounce"
//             >
//               <MessageSquare className="w-8 h-8 text-primary " />
//             </div>
//           </div>
//         </div>

//         {/* Welcome Text */}
//         <h2 className="text-2xl font-bold">Welcome to Chatt!</h2>
//         <p className="text-base-content/60">
//           Select a conversation from the sidebar to start chatting
//         </p>
//       </div>
//       <div className="">
//      <FloatingAiButton />
//       </div>
       
//     </div>
//   );
// };

// export default NoChatSelected;
import { MessageSquare } from "lucide-react";
import FloatingAiButton from "../components/FloatingAiButton";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50 relative">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              <MessageSquare className="w-8 h-8 text-primary " />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold animate-fadeIn">
          Welcome to <span className="text-primary">Chatt!</span>
        </h2>
        <p className="text-base-content/60 animate-pulse">
          Select a conversation from the sidebar to start chatting
        </p>

        {/* Animated Subtext */}
        <p className="text-sm text-base-content/70 mt-4 animate-bounce">
          🚀 Your AI assistant is ready!
        </p>
      </div>

      {/* Floating button inside THIS container bottom-right */}
      <div className="absolute bottom-6 right-6">
        <FloatingAiButton />
      </div>
    </div>
  );
};

export default NoChatSelected;
