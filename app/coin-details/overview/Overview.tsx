import { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import Pagination from '@/components/Pagination';

interface Space {
  id: number;
  title: string;
  hosts: string[];
  speakers: string[];
  coins: number;
  listeners: number;
  time: string;
}

interface Discussion {
  id: number;
  user: string;
  avatar: string;
  timeAgo: string;
  title: string;
  content: string;
}

const CryptoDiscussions = () => {
  const [activePage, setActivePage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('discussions');

  // Mock data for spaces
  const spaces: Space[] = [
    {
      id: 1,
      title: "Memes & The Market Morning show - #BTC $3K - $Pepe 🐸",
      hosts: ["user1", "user2", "user3"],
      speakers: ["speaker1", "speaker2", "speaker3", "speaker4"],
      coins: 922,
      listeners: 0,
      time: "35 minutes ago"
    },
    {
      id: 2,
      title: "Crypto Breakfast Club - Where Winners Eat FREE!",
      hosts: ["user1", "user2", "user3", "user4", "user5"],
      speakers: ["speaker1", "speaker2", "speaker3"],
      coins: 922,
      listeners: 0,
      time: "35 minutes ago"
    },
    {
      id: 3,
      title: "ARE WE BACK?! 👀 on Coffee with Captain #884",
      hosts: ["user1", "user2", "user3", "user4", "user5"],
      speakers: ["speaker1", "speaker2", "speaker3"],
      coins: 922,
      listeners: 0,
      time: "35 minutes ago"
    },
    {
      id: 4,
      title: "Memecoin Mornin We Are Back",
      hosts: ["user1", "user2"],
      speakers: ["speaker1", "speaker2", "speaker3"],
      coins: 922,
      listeners: 0,
      time: "35 minutes ago"
    },
    {
      id: 5,
      title: "Crypto x AI Weekly: DePA! and Robotics",
      hosts: ["user1", "user2"],
      speakers: ["speaker1", "speaker2", "speaker3", "speaker4"],
      coins: 922,
      listeners: 0,
      time: "35 minutes ago"
    },
    {
      id: 6,
      title: "CRYPTO SENDING ⚡",
      hosts: ["user1", "user2"],
      speakers: ["speaker1", "speaker2", "speaker3"],
      coins: 922,
      listeners: 0,
      time: "35 minutes ago"
    },
    {
      id: 7,
      title: "ARE WE BACK?! 👀 on Coffee with Captain #884",
      hosts: ["user1", "user2", "user3", "user4"],
      speakers: ["speaker1", "speaker2", "speaker3"],
      coins: 922,
      listeners: 0,
      time: "35 minutes ago"
    },
    {
      id: 8,
      title: "How zxTL5 is Powering the Next Wave of Consumer Crypto",
      hosts: ["user1", "user2"],
      speakers: ["speaker1", "speaker2", "speaker3", "speaker4"],
      coins: 922,
      listeners: 0,
      time: "35 minutes ago"
    },
    {
      id: 9,
      title: "How zxTL5 is Powering the Next Wave of Consumer Crypto",
      hosts: ["user1", "user2"],
      speakers: ["speaker1", "speaker2", "speaker3", "speaker4"],
      coins: 922,
      listeners: 0,
      time: "35 minutes ago"
    }
  ];

  // Mock data for discussions
  const discussions: Discussion[] = [
    {
      id: 1,
      user: "@OfficialSolanaR",
      avatar: "/avatar1.png",
      timeAgo: "2 hours ago",
      title: "The Psychology of The Trenches",
      content: "Speculation was made on the market reaction if ***Bitcoin*** reaches 100k again, expecting what follows to be insane. The idea of tracking a curated list of coins on Deck Screener and checking back in 2-3 months was considered."
    },
    {
      id: 2,
      user: "@OfficialSolanaR",
      avatar: "/avatar1.png",
      timeAgo: "2 hours ago",
      title: "The Psychology of The Trenches",
      content: "Speculation was made on the market reaction if ***Bitcoin*** reaches 100k again, expecting what follows to be insane. The idea of tracking a curated list of coins on Deck Screener and checking back in 2-3 months was considered."
    },
    {
      id: 3,
      user: "@OfficialSolanaR",
      avatar: "/avatar1.png",
      timeAgo: "2 hours ago",
      title: "The Psychology of The Trenches",
      content: "Speculation was made on the market reaction if ***Bitcoin*** reaches 100k again, expecting what follows to be  The idea of tracking a curated list of coins on Deck Screener and checking back in 2-3 months was considered."
    },
    {
      id: 4,
      user: "@OfficialSolanaR",
      avatar: "/avatar1.png",
      timeAgo: "2 hours ago",
      title: "The Psychology of The Trenches",
      content: "Speculation was made on the market reaction if ***Bitcoin*** reaches 100k again, expecting what follows to be  The idea of tracking a curated list of coins on Deck Screener and checking back in 2-3 months was considered."
    },
    {
      id: 5,
      user: "@OfficialSolanaR",
      avatar: "/avatar1.png",
      timeAgo: "2 hours ago",
      title: "The Psychology of The Trenches",
      content: "Speculation was made on the market reaction if ***Bitcoin*** reaches 100k again, expecting what follows to be  The idea of tracking a curated list of coins on Deck Screener and checking back in 2-3 months was considered."
    },
    {
      id: 6,
      user: "@OfficialSolanaR",
      avatar: "/avatar1.png",
      timeAgo: "2 hours ago",
      title: "The Psychology of The Trenches",
      content: "Speculation was made on the market reaction if ***Bitcoin*** reaches 100k again, expecting what follows to be  The idea of tracking a curated list of coins on Deck Screener and checking back in 2-3 months was considered."
    }
  ];

  // Pagination handling
  const totalPages = 88;
  const handlePageChange = (pageNumber: number) => {
    setActivePage(pageNumber);
  };

  const handleNextPage = () => {
    if (activePage < totalPages) {
      setActivePage(activePage + 1);
    }
  };

  const handlePrevPage = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };

  return (
    <div className="crypto-page bg-[#000714] text-white min-h-screen">
      {/* Main content container */}
      <div className="relative mx-auto max-w-7xl pt-10">
        {/* Background glass effect */}
        <div className="absolute w-full h-full left-0 top-[178px] bg-[rgba(0,11,36,0.1)] border border-[#0C3766] shadow-lg backdrop-blur-3xl rounded-lg z-0"></div>

        {/* Header with back button */}
        <div className="flex items-center mb-8 relative z-10 ml-10">
          <button className="bg-transparent border-none focus:outline-none">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-3xl font-medium ml-4">Coins Mentioned</h1>
        </div>

        {/* Top coin section */}
        <div className="relative z-10 ml-10 mb-12">
          <div className="flex items-center gap-5">
            <div className="w-10 h-10 bg-[#0B3462] rounded-full flex items-center justify-center">
              <span className="text-xl font-bold">G</span>
            </div>
            <h2 className="text-2xl font-bold">GROK</h2>
          </div>

          {/* Tags */}
          <div className="flex gap-4 mt-4">
            <span className="bg-[#1A1E2D] text-[#6F87B7] px-3 py-1 rounded-full text-sm">Ethereum Ecosystem</span>
            <span className="bg-[#1A1E2D] text-[#6F87B7] px-3 py-1 rounded-full text-sm">Elon Musk-Inspired</span>
            <span className="bg-[#1A1E2D] text-[#6F87B7] px-3 py-1 rounded-full text-sm">AI Meme</span>
          </div>

          {/* Description */}
          <p className="mt-4 max-w-xl text-gray-300">
            Grok is the first successful internet money based on peer-to-peer
            technology whereby no central bank or authority is involved in the
            transaction and production of the Bitcoin currency.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8 relative z-10">
          <div className="bg-gradient-to-r from-transparent via-[rgba(0,98,208,0.45)] to-transparent rounded-full px-8 py-2 shadow-[0_0_60px_15px_rgba(11,52,98,0.78)]">
            <button
              className={`px-4 py-1 rounded-full mx-2 ${activeTab === 'spaces' ? 'bg-[#0078FF] text-white' : 'text-gray-300'}`}
              onClick={() => setActiveTab('spaces')}>
              SPACES
            </button>
            <button
              className={`px-4 py-1 rounded-full mx-2 ${activeTab === 'discussions' ? 'bg-[#0078FF] text-white' : 'text-gray-300'}`}
              onClick={() => setActiveTab('discussions')}>
              Discussions
            </button>
          </div>
        </div>

        {/* Tab content */}
        {activeTab === 'spaces' && (
          <div className="relative z-10 mx-10">
            <div className="flex justify-between items-center mb-4 text-sm text-gray-400 px-3 border-b border-gray-700 pb-2">
              <div className="w-2/5">Title</div>
              <div className="w-1/5">Hosts / Speakers</div>
              <div className="w-1/5 text-center">Coins mentioned</div>
              <div className="w-1/5 text-center">Listeners</div>
              <div className="w-1/5 text-right">Monitored at</div>
            </div>
            {spaces.map((space) => (
              <div key={space.id} className="flex justify-between items-center py-3 px-3 hover:bg-[#0C1A30] rounded-lg">
                <div className="w-2/5 font-medium">{space.title}</div>
                <div className="w-1/5 flex">
                  <div className="flex -space-x-2">
                    {space.hosts.map((host, index) => (
                      <div key={`host-${index}`} className="w-6 h-6 rounded-full bg-blue-500 border border-gray-800"></div>
                    ))}
                  </div>
                  <div className="ml-2 flex -space-x-2">
                    {space.speakers.map((speaker, index) => (
                      <div key={`speaker-${index}`} className="w-6 h-6 rounded-full bg-gray-500 border border-gray-800"></div>
                    ))}
                  </div>
                </div>
                <div className="w-1/5 text-center">{space.coins}</div>
                <div className="w-1/5 text-center">{space.listeners}</div>
                <div className="w-1/5 text-right text-gray-400">{space.time}</div>
              </div>
            ))}

            {/* Pagination for spaces */}
            <div className="flex justify-center items-center mt-6 mb-8">
              <div className="flex items-center space-x-1">
                <button
                  onClick={handlePrevPage}
                  disabled={activePage === 1}
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${activePage === 1 ? 'text-gray-500' : 'hover:bg-blue-900 text-white'}`}>
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handlePageChange(1)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${activePage === 1 ? 'bg-blue-600' : 'hover:bg-blue-900'}`}>
                  1
                </button>

                <button
                  onClick={() => handlePageChange(2)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${activePage === 2 ? 'bg-blue-600' : 'hover:bg-blue-900'}`}>
                  2
                </button>

                <span className="text-gray-500">...</span>

                <button
                  onClick={() => handlePageChange(88)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${activePage === 88 ? 'bg-blue-600' : 'hover:bg-blue-900'}`}>
                  88
                </button>

                <button
                  onClick={handleNextPage}
                  disabled={activePage === totalPages}
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${activePage === totalPages ? 'text-gray-500' : 'hover:bg-blue-900 text-white'}`}>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'discussions' && (
          <div className="relative z-10">
            <h2 className="text-2xl font-medium ml-10 mb-6">Discussions</h2>

            <div className="grid grid-cols-2 gap-6 px-10">
              {discussions.map((discussion) => (
                <div key={discussion.id} className="bg-[rgba(0,7,20,0.5)] border border-[#0C3766] rounded-tr-3xl p-5 shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-gray-600 mr-3"></div>
                    <span className="text-blue-400">{discussion.user}</span>
                    <span className="ml-auto text-gray-400 text-sm">{discussion.timeAgo}</span>
                  </div>
                  <h3 className="text-xl font-medium mb-3">{discussion.title}</h3>
                  <p className="text-gray-300">{discussion.content}</p>
                </div>
              ))}
            </div>

            {/* Pagination for discussions */}
            <div className="flex justify-center mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={8}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoDiscussions;