"use client";

import { useState, useRef, useEffect } from "react";
import type { ChatMessage } from "@/lib/types";
import { CURRENT_USER } from "@/lib/mockData";

interface Props {
  messages: ChatMessage[];
  eventTitle: string;
  isJoined: boolean;
  onJoin: () => void;
}

export default function EventChat({ messages, eventTitle, isJoined, onJoin }: Props) {
  const [msgs, setMsgs] = useState<ChatMessage[]>(messages);
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  function send() {
    const trimmed = text.trim();
    if (!trimmed || !isJoined) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      userId: CURRENT_USER.id,
      displayName: CURRENT_USER.displayName,
      avatarUrl: CURRENT_USER.avatarUrl,
      text: trimmed,
      sentAt: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
    };
    setMsgs((prev) => [...prev, newMsg]);
    setText("");
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        <h3 className="text-sm font-semibold text-slate-200">Etkinlik Grup Sohbeti</h3>
        <span className="text-xs text-slate-500 ml-auto">{msgs.length} mesaj</span>
      </div>

      {/* Messages */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="h-72 overflow-y-auto p-3 space-y-3">
          {msgs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-600 text-center">
              <span className="text-3xl mb-2">💬</span>
              <p className="text-sm">Henüz mesaj yok.</p>
              <p className="text-xs mt-1">İlk mesajı sen yaz!</p>
            </div>
          ) : (
            msgs.map((msg) => {
              const isMe = msg.userId === CURRENT_USER.id;
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar — small, anti-dating */}
                  <img
                    src={msg.avatarUrl}
                    alt=""
                    className="w-7 h-7 rounded-xl flex-shrink-0 object-cover"
                  />
                  <div className={`max-w-[75%] ${isMe ? "items-end" : "items-start"} flex flex-col gap-0.5`}>
                    {!isMe && (
                      <span className="text-[10px] text-slate-500 px-1">{msg.displayName}</span>
                    )}
                    <div
                      className={`px-3 py-2 rounded-2xl text-sm leading-snug ${
                        isMe
                          ? "bg-emerald-600 text-white rounded-tr-sm"
                          : "bg-slate-800 text-slate-200 rounded-tl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-600 px-1">{msg.sentAt}</span>
                  </div>
                </div>
              );
            })
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        {isJoined ? (
          <div className="border-t border-slate-800 p-2 flex gap-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Gruba bir şey yaz..."
              className="flex-1 bg-slate-800 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <button
              onClick={send}
              disabled={!text.trim()}
              className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white disabled:opacity-40 hover:bg-emerald-500 transition-colors flex-shrink-0"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="border-t border-slate-800 p-3">
            <button
              onClick={onJoin}
              className="w-full py-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 text-sm font-semibold hover:bg-emerald-600/30 transition-all"
            >
              Sohbete katılmak için etkinliğe katıl →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
