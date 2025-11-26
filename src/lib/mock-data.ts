import { Pet, HealthPlan, Appointment, Group, Message } from '../types';

export const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Rex',
    species: 'Cachorro',
    breed: 'Golden Retriever',
    age: 3,
    ageUnit: 'years',
    weight: 28,
    ownerId: 'user1',
    healthPlanId: '1',
  },
  {
    id: '2',
    name: 'Mia',
    species: 'Gato',
    breed: 'Persa',
    age: 2,
    ageUnit: 'years',
    weight: 4.5,
    ownerId: 'user1',
    photo: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBwZXR8ZW58MXx8fHwxNzY0MTQwNDAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export const mockHealthPlans: HealthPlan[] = [
  {
    id: '1',
    name: 'Plano Essencial',
    provider: 'PetCare',
    price: 89.90,
    coverage: ['Consultas ilimitadas', 'Vacinas anuais', 'Emergências 24h'],
    description: 'Proteção básica para seu pet com consultas e vacinas incluídas.',
  },
  {
    id: '2',
    name: 'Plano Completo',
    provider: 'VetPlus',
    price: 149.90,
    coverage: ['Consultas ilimitadas', 'Exames laboratoriais', 'Cirurgias', 'Internação', 'Medicamentos'],
    description: 'Cobertura completa para todas as necessidades do seu pet.',
  },
  {
    id: '3',
    name: 'Plano Premium',
    provider: 'PetCare',
    price: 249.90,
    coverage: ['Tudo do Plano Completo', 'Fisioterapia', 'Nutricionista', 'Dentista especializado'],
    description: 'O melhor em cuidados e bem-estar para seu melhor amigo.',
  },
  {
    id: '4',
    name: 'Plano Filhote',
    provider: 'AnimaisVida',
    price: 69.90,
    coverage: ['Vacinas múltiplas', 'Vermifugação', 'Consultas mensais', 'Castração'],
    description: 'Ideal para os primeiros anos de vida do seu pet.',
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    petId: '1',
    petName: 'Rex',
    clinicName: 'Clínica VetCare',
    date: '2025-11-25',
    time: '10:00',
    type: 'Consulta de rotina',
    status: 'scheduled',
    notes: 'Checkup anual',
  },
  {
    id: '2',
    petId: '2',
    petName: 'Mia',
    clinicName: 'Hospital Pet',
    date: '2025-11-28',
    time: '14:30',
    type: 'Vacinação',
    status: 'scheduled',
  },
];

export const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Amantes de Golden Retriever',
    description: 'Grupo para compartilhar dicas e experiências sobre Goldens',
    members: ['user1', 'user2', 'user3'],
    createdAt: '2025-11-01T10:00:00Z',
  },
  {
    id: '2',
    name: 'Gatos Persas Brasil',
    description: 'Comunidade de tutores de gatos persas',
    members: ['user1', 'user4', 'user5'],
    createdAt: '2025-11-10T15:30:00Z',
  },
  {
    id: '3',
    name: 'Pets Saudáveis',
    description: 'Dicas de alimentação e exercícios para pets',
    members: ['user1', 'user2', 'user6'],
    createdAt: '2025-11-15T09:00:00Z',
  },
];

export const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: 'm1',
      groupId: '1',
      userId: 'user2',
      userName: 'Maria Silva',
      content: 'Olá pessoal! Alguém tem dica de ração para Golden?',
      timestamp: '2025-11-21T09:00:00Z',
    },
    {
      id: 'm2',
      groupId: '1',
      userId: 'user1',
      userName: 'Você',
      content: 'Eu uso a marca Premium Golden, meu Rex adora!',
      timestamp: '2025-11-21T09:15:00Z',
    },
    {
      id: 'm3',
      groupId: '1',
      userId: 'user3',
      userName: 'João Santos',
      content: 'Também recomendo! Meu dog teve uma melhora no pelo.',
      timestamp: '2025-11-21T09:30:00Z',
    },
  ],
  '2': [
    {
      id: 'm4',
      groupId: '2',
      userId: 'user4',
      userName: 'Ana Costa',
      content: 'Bom dia! Como vocês fazem a escovação dos pelos?',
      timestamp: '2025-11-21T08:00:00Z',
    },
  ],
  '3': [
    {
      id: 'm5',
      groupId: '3',
      userId: 'user6',
      userName: 'Pedro Lima',
      content: 'Alguém já tentou alimentação natural?',
      timestamp: '2025-11-20T18:00:00Z',
    },
  ],
};