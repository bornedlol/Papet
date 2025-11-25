export type UserType = 'user' | 'clinic' | 'plan_provider' | 'professional';

export interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  avatar?: string;
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  photo?: string;
  ownerId: string;
  healthPlanId?: string;
}

export interface HealthPlan {
  id: string;
  name: string;
  provider: string;
  price: number;
  coverage: string[];
  description: string;
  maxPets: number;
}

export interface Appointment {
  id: string;
  petId: string;
  petName: string;
  clinicName: string;
  date: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Message {
  id: string;
  groupId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  members: string[];
  avatar?: string;
  createdAt: string;
  lastMessage?: Message;
}
