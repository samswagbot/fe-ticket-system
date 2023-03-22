export interface Ticket {
    _id: string;
    name: string;
    response: string[];
    email: string;
    description: string;
    status: "in progress" | "resolved" | "new";
  }
  