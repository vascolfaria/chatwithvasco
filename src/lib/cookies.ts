"use client";

import { format, isToday, parseISO } from "date-fns";

const COOKIE_NAME = "vAIsco-chat-session";
const MAX_MESSAGES_PER_DAY = 15;

interface SessionData {
  count: number;
  date: string; // YYYY-MM-DD
}

function getCookie(): SessionData | null {
    if (typeof document === 'undefined') {
        return { count: 0, date: format(new Date(), "yyyy-MM-dd") };
    }
    const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));

    if (!cookie) {
        return null;
    }

    try {
        const value = cookie.split("=")[1];
        return JSON.parse(decodeURIComponent(value));
    } catch (error) {
        return null;
    }
}


export function getMessageCount(): number {
  const data = getCookie();
  
  if (data && isToday(parseISO(data.date))) {
    return data.count;
  }
  
  // It's a new day or no/invalid cookie, reset the count
  setTodaysMessageCount(0);
  return 0;
}

export function incrementMessageCount(): number {
  const currentData = getCookie();
  let currentCount = 0;
  if(currentData && isToday(parseISO(currentData.date))) {
    currentCount = currentData.count;
  }
  
  const newCount = currentCount + 1;
  setTodaysMessageCount(newCount);
  return newCount;
}

function setTodaysMessageCount(count: number): void {
  if (typeof document === 'undefined') return;

  const today = format(new Date(), "yyyy-MM-dd");
  const data: SessionData = { count, date: today };
  const expires = new Date();
  expires.setHours(23, 59, 59, 999); // Expires at the end of the day

  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
    JSON.stringify(data)
  )}; expires=${expires.toUTCString()}; path=/; SameSite=Lax; secure`;
}

export function hasReachedMessageLimit(count?: number): boolean {
  const currentCount = count ?? getMessageCount();
  return currentCount >= MAX_MESSAGES_PER_DAY;
}
