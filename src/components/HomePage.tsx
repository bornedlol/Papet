import { PawPrint, Calendar, Heart, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Appointment } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';

interface HomePageProps {
  onNavigate: (page: string) => void;
  userName: string;
  petCount: number;
  upcomingAppointments: number;
  appointments: Appointment[];
}

export function HomePage({ onNavigate, userName, petCount, upcomingAppointments, appointments }: HomePageProps) {
  const stats = [
    {
      title: 'Meus Pets',
      value: petCount,
      icon: PawPrint,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      action: () => onNavigate('pets'),
    },
    {
      title: 'Consultas Agendadas',
      value: upcomingAppointments,
      icon: Calendar,
      color: 'text-brown-600',
      bgColor: 'bg-brown-100',
      action: () => onNavigate('appointments'),
    },
    {
      title: 'Planos Ativos',
      value: 1,
      icon: Heart,
      color: 'text-beige-700',
      bgColor: 'bg-beige-200',
      action: () => onNavigate('plans'),
    },
    {
      title: 'Grupos',
      value: 3,
      icon: Users,
      color: 'text-green-700',
      bgColor: 'bg-green-50',
      action: () => onNavigate('community'),
    },
  ];

  const quickActions = [
    {
      title: 'Adicionar Pet',
      description: 'Cadastre um novo pet',
      icon: PawPrint,
      action: () => onNavigate('pets'),
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      title: 'Agendar Consulta',
      description: 'Marque uma consulta veterinária',
      icon: Calendar,
      action: () => onNavigate('appointments'),
      color: 'bg-brown-500 hover:bg-brown-600',
    },
    {
      title: 'Explorar Planos',
      description: 'Conheça nossos planos de saúde',
      icon: Heart,
      action: () => onNavigate('plans'),
      color: 'bg-beige-600 hover:bg-beige-700',
    },
  ];

  const petShopAds = [
    {
      title: 'Pet Shop Amigo Fiel',
      description: '20% OFF em rações premium esta semana!',
      image: 'https://images.unsplash.com/photo-1648585639371-6259c5ef936f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBzaG9wJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzYzNjUwMjQyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      badge: 'PROMOÇÃO',
    },
    {
      title: 'Loja do Pet Feliz',
      description: 'Novos brinquedos e acessórios chegaram!',
      image: 'https://images.unsplash.com/photo-1516453734593-8d198ae84bcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBzdG9yZXxlbnwxfHx8fDE3NjM2NTkwMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      badge: 'NOVIDADES',
    },
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  const sortedAppointments = [...appointments]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-brown-900 mb-2">Olá, {userName}! 👋</h1>
          <p className="text-brown-700">Bem-vindo de volta ao Papet. Como podemos ajudar você hoje?</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="border-brown-200 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={stat.action}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-brown-700 mb-1">{stat.title}</p>
                      <p className={`${stat.color}`}>{stat.value}</p>
                    </div>
                    <div className={`${stat.bgColor} p-3 rounded-full`}>
                      <Icon className={`size-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-brown-900 mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Card key={index} className="border-brown-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`${action.color} w-12 h-12 rounded-full flex items-center justify-center mb-3`}>
                      <Icon className="size-6 text-white" />
                    </div>
                    <CardTitle className="text-brown-900">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={action.action} className={`w-full ${action.color} text-white`}>
                      Acessar
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Health Tips */}
        <Card className="border-brown-200 bg-gradient-to-r from-green-50 to-beige-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="size-5 text-green-600" />
              <CardTitle className="text-brown-900">Dica de Saúde do Dia</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-brown-700">
              Mantenha seu pet hidratado! Certifique-se de que ele tenha acesso constante a água fresca e limpa,
              especialmente durante os dias mais quentes. A hidratação adequada é essencial para a saúde
              dos rins e do sistema digestivo.
            </p>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        {sortedAppointments.length > 0 && (
          <div className="mt-8">
            <h2 className="text-brown-900 mb-4">Próximas Consultas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sortedAppointments.map((appointment) => (
                <Card
                  key={appointment.id}
                  className="border-brown-200 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => onNavigate('appointments')}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                        <Calendar className="size-5 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-brown-900 truncate">{appointment.petName}</p>
                        <p className="text-sm text-brown-700">{formatDate(appointment.date)} às {appointment.time}</p>
                        <p className="text-xs text-brown-600 mt-1 truncate">{appointment.type}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Pet Shop Ads */}
        <div className="mt-8">
          <h2 className="text-brown-900 mb-4">Promoções e Novidades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {petShopAds.map((ad, index) => (
              <Card key={index} className="border-brown-200 hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative">
                  <ImageWithFallback
                    src={ad.image}
                    alt={ad.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-3 left-3 bg-red-500 text-white">{ad.badge}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-brown-900">{ad.title}</CardTitle>
                  <CardDescription>{ad.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}