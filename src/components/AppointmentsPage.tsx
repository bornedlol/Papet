import { useState } from 'react';
import { Appointment, Pet } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { Plus, Calendar, Clock, MapPin, Edit, Trash2 } from 'lucide-react';

interface AppointmentsPageProps {
  appointments: Appointment[];
  pets: Pet[];
  onAddAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  onUpdateAppointment: (id: string, appointment: Partial<Appointment>) => void;
  onDeleteAppointment: (id: string) => void;
}

export function AppointmentsPage({
  appointments,
  pets,
  onAddAppointment,
  onUpdateAppointment,
  onDeleteAppointment,
}: AppointmentsPageProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [formData, setFormData] = useState({
    petId: '',
    clinicName: '',
    date: '',
    time: '',
    type: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedPet = pets.find((p) => p.id === formData.petId);
    
    if (editingAppointment) {
      onUpdateAppointment(editingAppointment.id, {
        ...formData,
        petName: selectedPet?.name || editingAppointment.petName,
      });
      setEditingAppointment(null);
    } else {
      onAddAppointment({
        ...formData,
        petName: selectedPet?.name || '',
        status: 'scheduled',
      });
      setIsAddDialogOpen(false);
    }
    setFormData({ petId: '', clinicName: '', date: '', time: '', type: '', notes: '' });
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setFormData({
      petId: appointment.petId,
      clinicName: appointment.clinicName,
      date: appointment.date,
      time: appointment.time,
      type: appointment.type,
      notes: appointment.notes || '',
    });
  };

  const getStatusBadge = (status: Appointment['status']) => {
    const styles = {
      scheduled: 'bg-green-100 text-green-700',
      completed: 'bg-blue-100 text-blue-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    const labels = {
      scheduled: 'Agendada',
      completed: 'Concluída',
      cancelled: 'Cancelada',
    };
    return <Badge className={styles[status]}>{labels[status]}</Badge>;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const sortedAppointments = [...appointments].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-brown-900 mb-2">Consultas</h1>
            <p className="text-brown-700">Gerencie as consultas dos seus pets</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="size-4 mr-2" />
                Agendar Consulta
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>Agendar Nova Consulta</DialogTitle>
                <DialogDescription>Preencha os dados da consulta</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="petId">Pet</Label>
                  <select
                    id="petId"
                    className="w-full p-2 border rounded-md bg-white border-brown-300"
                    value={formData.petId}
                    onChange={(e) => setFormData({ ...formData, petId: e.target.value })}
                    required
                  >
                    <option value="">Selecione um pet...</option>
                    {pets.map((pet) => (
                      <option key={pet.id} value={pet.id}>
                        {pet.name} ({pet.species})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clinicName">Clínica/Veterinário</Label>
                  <Input
                    id="clinicName"
                    value={formData.clinicName}
                    onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                    placeholder="Nome da clínica ou veterinário"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Data</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Horário</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Consulta</Label>
                  <select
                    id="type"
                    className="w-full p-2 border rounded-md bg-white border-brown-300"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="Consulta de rotina">Consulta de rotina</option>
                    <option value="Vacinação">Vacinação</option>
                    <option value="Emergência">Emergência</option>
                    <option value="Cirurgia">Cirurgia</option>
                    <option value="Exames">Exames</option>
                    <option value="Retorno">Retorno</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Observações (opcional)</Label>
                  <textarea
                    id="notes"
                    className="w-full p-2 border rounded-md bg-white border-brown-300 min-h-[80px]"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Informações adicionais sobre a consulta..."
                  />
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Agendar
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit Dialog */}
        <Dialog open={!!editingAppointment} onOpenChange={(open) => !open && setEditingAppointment(null)}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Editar Consulta</DialogTitle>
              <DialogDescription>Atualize os dados da consulta</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-petId">Pet</Label>
                <select
                  id="edit-petId"
                  className="w-full p-2 border rounded-md bg-white border-brown-300"
                  value={formData.petId}
                  onChange={(e) => setFormData({ ...formData, petId: e.target.value })}
                  required
                >
                  <option value="">Selecione um pet...</option>
                  {pets.map((pet) => (
                    <option key={pet.id} value={pet.id}>
                      {pet.name} ({pet.species})
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-clinicName">Clínica/Veterinário</Label>
                <Input
                  id="edit-clinicName"
                  value={formData.clinicName}
                  onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-date">Data</Label>
                  <Input
                    id="edit-date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-time">Horário</Label>
                  <Input
                    id="edit-time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-type">Tipo de Consulta</Label>
                <select
                  id="edit-type"
                  className="w-full p-2 border rounded-md bg-white border-brown-300"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Consulta de rotina">Consulta de rotina</option>
                  <option value="Vacinação">Vacinação</option>
                  <option value="Emergência">Emergência</option>
                  <option value="Cirurgia">Cirurgia</option>
                  <option value="Exames">Exames</option>
                  <option value="Retorno">Retorno</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Observações (opcional)</Label>
                <textarea
                  id="edit-notes"
                  className="w-full p-2 border rounded-md bg-white border-brown-300 min-h-[80px]"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Salvar Alterações
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Appointments List */}
        {sortedAppointments.length === 0 ? (
          <Card className="border-brown-200">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="bg-beige-200 p-6 rounded-full mb-4">
                <Calendar className="size-12 text-brown-600" />
              </div>
              <h3 className="text-brown-900 mb-2">Nenhuma consulta agendada</h3>
              <p className="text-brown-700 mb-4">Agende a primeira consulta para seu pet</p>
              <Button onClick={() => setIsAddDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
                Agendar Consulta
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {sortedAppointments.map((appointment) => (
              <Card key={appointment.id} className="border-brown-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-brown-900">{appointment.petName}</h3>
                        {getStatusBadge(appointment.status)}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-brown-700">
                          <MapPin className="size-4 text-brown-500" />
                          {appointment.clinicName}
                        </div>
                        <div className="flex items-center gap-2 text-brown-700">
                          <Calendar className="size-4 text-brown-500" />
                          {formatDate(appointment.date)}
                        </div>
                        <div className="flex items-center gap-2 text-brown-700">
                          <Clock className="size-4 text-brown-500" />
                          {appointment.time}
                        </div>
                        <div className="text-brown-700">
                          <span className="text-brown-900">{appointment.type}</span>
                        </div>
                      </div>
                      {appointment.notes && (
                        <p className="mt-3 text-sm text-brown-700 bg-beige-100 p-3 rounded-lg">
                          {appointment.notes}
                        </p>
                      )}
                    </div>
                    <div className="flex md:flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(appointment)}
                        className="flex-1 md:flex-none border-brown-300 text-brown-700 hover:bg-beige-100"
                      >
                        <Edit className="size-4 md:mr-2" />
                        <span className="hidden md:inline">Editar</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDeleteAppointment(appointment.id)}
                        className="flex-1 md:flex-none border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="size-4 md:mr-2" />
                        <span className="hidden md:inline">Excluir</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
