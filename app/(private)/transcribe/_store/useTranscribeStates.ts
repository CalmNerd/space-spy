/* eslint-disable @typescript-eslint/no-explicit-any */ // Disable the rule for the entire file

import { create } from 'zustand';
import axios from 'axios';

const BACKEND_URL = "https://xspacespy-backend-production.up.railway.app";

// State types
interface States {
    spaceState: string;
    searchSpaceID: string;
    searchSpaceIDSearched: boolean;
    spaceMetadata: any;
    liveTranscribe: any[];
    websocket: WebSocket | null; // Reference to the current WebSocket
}

interface Actions {
    handleSearchSpaceID: (id: string) => void;
    handleSearch: () => void;
}

// useCounterStore
export const useTranscribeStates = create<States & Actions>((set, get) => ({
    spaceState: "",
    searchSpaceID: "",
    searchSpaceIDSearched: false,
    spaceMetadata: null,
    liveTranscribe: [],
    websocket: null, // Initialize WebSocket reference as null

    // Actions
    handleSearchSpaceID: (id: string) => set(() => ({ searchSpaceID: id })),
    handleSearch: async () => {
        const { searchSpaceID, websocket } = get();

        set(() => ({ searchSpaceIDSearched: true }));
        try {
            const response = await axios.get(`${BACKEND_URL}/spaces/meta/${searchSpaceID}`);
            set(() => ({ spaceState: response.data[0]?.data?.audioSpace?.metadata?.state }));
            set(() => ({ spaceMetadata: response.data }));
            set(() => ({ liveTranscribe: [] })); // Reset liveTranscribe when a new search is made

            const { spaceState } = get();
            if (spaceState !== "Running") {
                // Close the previous WebSocket connection if it exists
                if (websocket) {
                    websocket.close();
                    set(() => ({ websocket: null })); // Clear the WebSocket reference
                }
                return;
            }

            // Close the previous WebSocket connection if it exists
            if (websocket) {
                websocket.close();
                set(() => ({ websocket: null })); // Clear the WebSocket reference
            }

            // Connect to a new WebSocket
            const ws = new WebSocket(`${BACKEND_URL.replace('http', 'ws')}/ws/${searchSpaceID}`);
            set(() => ({ websocket: ws })); // Store the new WebSocket reference

            ws.onmessage = (event) => {
                let message = event.data;
                message = JSON.parse(message);
                set((state) => ({
                    liveTranscribe: [...state.liveTranscribe, message], // Append new message to liveTranscribe
                }));
            };

            ws.onerror = (error) => {
                console.error("WebSocket error:", error);
            };

            ws.onclose = () => {
                console.log("WebSocket connection closed.");
            };
        } catch (error) {
            console.error("Error fetching space metadata:", error);
        }
    },
}));