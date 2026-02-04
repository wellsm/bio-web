/* eslint-disable @typescript-eslint/no-explicit-any */
import { BEARER } from "@/app/contexts/auth";
import axios from "axios";

export const baseURL = (): string => {
  return `${import.meta.env.VITE_API_BASE_URL.replace(/\/$/g, "")}`;
}

export const apiURL = (endpoint: string = ""): string => {
  return `${baseURL()}/${endpoint.replace(/^\/|\/$/g, "")}`;
}

export const client = axios.create({
  baseURL: baseURL(),
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem(BEARER);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const http = {
  get: async (url: string, params?: any) => await client.get(url, { params }),
  post: async (url: string, data?: any) => await client.post(url, data),
  put: async (url: string, data?: any) => await client.put(url, data),
  delete: async (url: string) => await client.delete(url),
  upload: async (method: string, url: string, data: any) => {
    const payload = new FormData();

    for (const key in data) {
      payload.append(key, data[key]);
    }

    return await client.request({
      url,
      method: method.toUpperCase(),
      data: payload,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
