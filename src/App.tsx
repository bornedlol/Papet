import { useState } from 'react';
import { User, UserType, Pet, Appointment, Group, Message } from './types';
import { mockPets, mockHealthPlans, mockAppointments, mockGroups, mockMessages } from './lib/mock-data';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { PetsPage } from './components/PetsPage';
import { PlansPage } from './components/PlansPage';
import { AppointmentsPage } from './components/AppointmentsPage';
import { CommunityPage } from './components/CommunityPage';
import { toast, Toaster } from 'sonner@2.0.3';

type AuthView = 'login' | 'register';

export default function App() {
  const [authView, setAuthView] = useState<AuthView>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('home');
  
  // State management
  const [pets, setPets] = useState<Pet[]>(mockPets);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages);

  // Auth handlers
  const handleLogin = (email: string, password: string, type: UserType) => {
    const user: User = {
      id: 'user1',
      name: type === 'user' ? 'Roberto' : 'Clínica VetCare',
      email,
      type,
    };
    setCurrentUser(user);
    toast.success('Login realizado com sucesso!');
  };

  const handleRegister = (name: string, email: string, password: string, type: UserType) => {
    const user: User = {
      id: 'user1',
      name,
      email,
      type,
    };
    setCurrentUser(user);
    toast.success('Cadastro realizado com sucesso!');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
    toast.info('Você saiu da sua conta');
  };

  // Pet handlers
  const handleAddPet = (pet: Omit<Pet, 'id'>) => {
    const newPet: Pet = {
      ...pet,
      id: String(Date.now()),
    };
    setPets([...pets, newPet]);
    toast.success(`${newPet.name} foi adicionado com sucesso!`);
  };

  const handleUpdatePet = (id: string, updatedPet: Partial<Pet>) => {
    setPets(pets.map((pet) => (pet.id === id ? { ...pet, ...updatedPet } : pet)));
    toast.success('Pet atualizado com sucesso!');
  };

  const handleDeletePet = (id: string) => {
    const pet = pets.find((p) => p.id === id);
    setPets(pets.filter((pet) => pet.id !== id));
    toast.success(`${pet?.name} foi removido`);
  };

  // Plan handlers
  const handleSelectPlan = (planId: string) => {
    const plan = mockHealthPlans.find((p) => p.id === planId);
    toast.success(`Plano ${plan?.name} selecionado! Entre em contato para finalizar a contratação.`);
  };

  const handleAssignPlan = (petId: string, planId: string) => {
    const pet = pets.find((p) => p.id === petId);
    const plan = mockHealthPlans.find((p) => p.id === planId);
    setPets(pets.map((p) => (p.id === petId ? { ...p, healthPlanId: planId } : p)));
    toast.success(`Plano ${plan?.name} adicionado para ${pet?.name}!`);
  };

  // Appointment handlers
  const handleAddAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: String(Date.now()),
    };
    setAppointments([...appointments, newAppointment]);
    toast.success('Consulta agendada com sucesso!');
  };

  const handleUpdateAppointment = (id: string, updatedAppointment: Partial<Appointment>) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id ? { ...appointment, ...updatedAppointment } : appointment
      )
    );
    toast.success('Consulta atualizada com sucesso!');
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
    toast.success('Consulta cancelada');
  };

  // Community handlers
  const handleCreateGroup = (group: Omit<Group, 'id' | 'createdAt'>) => {
    const newGroup: Group = {
      ...group,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
    };
    setGroups([...groups, newGroup]);
    setMessages({ ...messages, [newGroup.id]: [] });
    toast.success(`Grupo "${newGroup.name}" criado com sucesso!`);
  };

  const handleSendMessage = (groupId: string, content: string) => {
    const newMessage: Message = {
      id: String(Date.now()),
      groupId,
      userId: currentUser?.id || 'user1',
      userName: currentUser?.name || 'Você',
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages({
      ...messages,
      [groupId]: [...(messages[groupId] || []), newMessage],
    });
  };

  // If not authenticated, show auth forms
  if (!currentUser) {
    if (authView === 'login') {
      return (
        <>
          <LoginForm onLogin={handleLogin} onSwitchToRegister={() => setAuthView('register')} />
          <Toaster position="top-right" richColors />
        </>
      );
    } else {
      return (
        <>
          <RegisterForm onRegister={handleRegister} onSwitchToLogin={() => setAuthView('login')} />
          <Toaster position="top-right" richColors />
        </>
      );
    }
  }

  // Main app
  return (
    <div className="min-h-screen bg-beige-50">
      <Navigation
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
        userName={currentUser.name}
      />

      {currentPage === 'home' && (
        <HomePage
          onNavigate={setCurrentPage}
          userName={currentUser.name}
          petCount={pets.length}
          upcomingAppointments={appointments.filter((a) => a.status === 'scheduled').length}
          appointments={appointments.filter((a) => a.status === 'scheduled')}
        />
      )}

      {currentPage === 'pets' && (
        <PetsPage
          pets={pets}
          healthPlans={mockHealthPlans}
          onAddPet={handleAddPet}
          onUpdatePet={handleUpdatePet}
          onDeletePet={handleDeletePet}
          onAssignPlan={handleAssignPlan}
        />
      )}

      {currentPage === 'plans' && (
        <PlansPage plans={mockHealthPlans} onSelectPlan={handleSelectPlan} />
      )}

      {currentPage === 'appointments' && (
        <AppointmentsPage
          appointments={appointments}
          pets={pets}
          onAddAppointment={handleAddAppointment}
          onUpdateAppointment={handleUpdateAppointment}
          onDeleteAppointment={handleDeleteAppointment}
        />
      )}

      {currentPage === 'community' && (
        <CommunityPage
          groups={groups}
          messages={messages}
          currentUserId={currentUser.id}
          onCreateGroup={handleCreateGroup}
          onSendMessage={handleSendMessage}
        />
      )}

      <Toaster position="top-right" richColors />
    </div>
  );
}