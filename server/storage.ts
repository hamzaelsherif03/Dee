import { waitlist, type Waitlist, type InsertWaitlist } from "@shared/schema";

export interface IStorage {
  addToWaitlist(entry: InsertWaitlist): Promise<Waitlist>;
  getWaitlistCount(): Promise<number>;
  getPositionByEmail(email: string): Promise<number | null>;
}

export class MemStorage implements IStorage {
  private waitlist: Map<number, Waitlist>;
  currentId: number;

  constructor() {
    this.waitlist = new Map();
    this.currentId = 1;
  }

  async addToWaitlist(entry: InsertWaitlist): Promise<Waitlist> {
    const id = this.currentId++;
    const position = this.waitlist.size + 1;

    const waitlistEntry: Waitlist = {
      ...entry,
      id,
      position,
      signupDate: new Date(),
      company: entry.company || null,
    };
    this.waitlist.set(id, waitlistEntry);
    return waitlistEntry;
  }

  async getWaitlistCount(): Promise<number> {
    return this.waitlist.size;
  }

  async getPositionByEmail(email: string): Promise<number | null> {
    for (const entry of this.waitlist.values()) {
      if (entry.email === email) {
        return entry.position;
      }
    }
    return null;
  }
}

export const storage = new MemStorage();