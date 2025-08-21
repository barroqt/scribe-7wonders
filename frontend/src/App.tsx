import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "@/components/Layout";
import Players from "@/pages/Players";
import AddGame from "@/pages/AddGame";
import PlayerStats from "@/pages/PlayerStats";
import WonderStats from "@/pages/WonderStats";
import GameHistory from "@/pages/GameHistory";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/players" replace />} />
            <Route path="/players" element={<Players />} />
            <Route path="/add-game" element={<AddGame />} />
            <Route path="/player-stats" element={<PlayerStats />} />
            <Route path="/wonder-stats" element={<WonderStats />} />
            <Route path="/history" element={<GameHistory />} />
            <Route path="*" element={<Navigate to="/players" replace />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
