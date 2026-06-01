export type EventCategory =
  | "konser"
  | "festival"
  | "workshop"
  | "yemek"
  | "seyahat"
  | "müze"
  | "spor"
  | "diger";

export type EventStatus = "aktif" | "tamamlandı";

export interface MusicGenre {
  name: string;
  emoji: string;
}

export interface PastEvent {
  id: string;
  name: string;
  date: string;
  venue: string;
  city: string;
  emoji: string;
}

export interface User {
  id: string;
  displayName: string;
  age: number;
  city: string;
  bio: string;
  avatarUrl: string;
  isVerified: boolean;
  musicGenres: MusicGenre[];
  pastEvents: PastEvent[];
  instagram?: string;
  spotify?: string;
  eventsAttended: number;
  memberSince: string;
  // Progressive reveal: 0 = only event info, 1 = music taste, 2 = past events, 3 = full profile
  revealLevel: 0 | 1 | 2 | 3;
}

export interface GroupMember {
  id: string;
  displayName: string;
  avatarUrl: string;
  isVerified: boolean;
  revealLevel: 0 | 1 | 2 | 3;
}

export interface ChatMessage {
  id: string;
  userId: string;
  displayName: string;
  avatarUrl: string;
  text: string;
  sentAt: string; // "HH:MM" or relative
}

export interface EventListing {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  emoji: string;
  venue: string;
  city: string;
  address: string;
  date: string;
  time: string;
  ticketPrice?: string;
  ticketUrl?: string;
  imageUrl: string;
  // Who's going
  organizer: User;
  groupMembers: GroupMember[];
  attendeeCount: number; // open-ended, no cap
  status: EventStatus;
  // Matching
  musicCompatibility?: number; // 0-100
  sharedPastEvents: PastEvent[]; // events both users attended
  // Feed display (anonymous)
  anonymousPreview: string;
  tags: string[];
  createdAt: string;
  // Group chat messages for this event
  chatMessages: ChatMessage[];
}

export interface FeedItem {
  id: string;
  type: "event_created" | "icebreaker" | "nearby" | "trending";
  listing: EventListing;
  feedText: string;
  timeAgo: string;
}
