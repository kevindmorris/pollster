import type { Poll } from "@/types";
import axios, { type AxiosInstance } from "axios";

export class Api {
  private axios: AxiosInstance;

  constructor(baseURL = "/api") {
    this.axios = axios.create({ baseURL });
  }

  // Get all polls
  async getAll(): Promise<Poll[]> {
    const res = await this.axios.get<Poll[]>(`/polls`);
    return res.data;
  }

  // Get a poll by ID
  async get(id: number): Promise<Poll> {
    const res = await this.axios.get<Poll>(`/polls/${id}`);
    return res.data;
  }

  // Create a new poll
  async create(question: string): Promise<Poll> {
    const res = await this.axios.post<Poll>(`/polls`, { question });
    return res.data;
  }

  // Vote yes
  async voteYes(id: number): Promise<Poll> {
    const res = await this.axios.post<Poll>(`/polls/${id}/yes`);
    return res.data;
  }

  // Vote no
  async voteNo(id: number): Promise<Poll> {
    const res = await this.axios.post<Poll>(`polls/${id}/no`);
    return res.data;
  }

  // Delete all polls
  async deleteAll(): Promise<void> {
    await this.axios.delete(`/polls`);
  }

  // Delete a poll
  async delete(id: number): Promise<void> {
    await this.axios.delete(`/polls/${id}`);
  }
}
