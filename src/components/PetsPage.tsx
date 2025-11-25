import { useState } from 'react';
import { Pet, HealthPlan } from '../types';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Plus, Check, AlertCircle, Edit, Trash2 } from 'lucide-react';
import { Checkbox } from './ui/checkbox';

interface PetsPageProps {
  pets: Pet[];
  healthPlans: HealthPlan[];
  onAddPet: (pet: Omit<Pet, 'id'>) => void;
  onUpdatePet: (id: string, pet: Partial<Pet>) => void;
  onDeletePet: (id: string) => void;
  onAssignPlan: (petId: string, planId: string) => void;
}

type FilterType = 'all' | 'with-plan' | 'without-plan' | 'domestic' | 'exotic' | 'special-attention';

export function PetsPage({ pets, healthPlans, onAddPet, onUpdatePet, onDeletePet, onAssignPlan }: PetsPageProps) {
  const [selectedFilters, setSelectedFilters] = useState<Set<FilterType>>(new Set(['all']));
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false);
  const [selectedPetForPlan, setSelectedPetForPlan] = useState<Pet | null>(null);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: 0,
    weight: 0,
    photo: '',
    specialAttention: false,
  });

  const handleFilterChange = (filter: FilterType) => {
    const newFilters = new Set(selectedFilters);
    if (filter === 'all') {
      setSelectedFilters(new Set(['all']));
    } else {
      newFilters.delete('all');
      if (newFilters.has(filter)) {
        newFilters.delete(filter);
      } else {
        newFilters.add(filter);
      }
      if (newFilters.size === 0) {
        newFilters.add('all');
      }
      setSelectedFilters(newFilters);
    }
  };

  const filterPets = (pets: Pet[]) => {
    if (selectedFilters.has('all')) return pets;

    return pets.filter((pet) => {
      if (selectedFilters.has('with-plan') && !pet.healthPlanId) return false;
      if (selectedFilters.has('without-plan') && pet.healthPlanId) return false;
      if (selectedFilters.has('domestic') && !['Cachorro', 'Gato'].includes(pet.species)) return false;
      if (selectedFilters.has('exotic') && ['Cachorro', 'Gato'].includes(pet.species)) return false;
      if (selectedFilters.has('special-attention') && !(pet as any).specialAttention) return false;
      return true;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPet) {
      onUpdatePet(editingPet.id, formData);
      setEditingPet(null);
    } else {
      onAddPet({
        ...formData,
        ownerId: 'user1',
      });
      setIsAddDialogOpen(false);
    }
    setFormData({ name: '', species: '', breed: '', age: 0, weight: 0, photo: '', specialAttention: false });
  };

  const handleEdit = (pet: Pet) => {
    setEditingPet(pet);
    setFormData({
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      age: pet.age,
      weight: pet.weight,
      photo: pet.photo || '',
      specialAttention: (pet as any).specialAttention || false,
    });
  };

  const handleOpenPlanDialog = (pet: Pet) => {
    setSelectedPetForPlan(pet);
    setIsPlanDialogOpen(true);
  };

  const handleAssignPlan = (planId: string) => {
    if (selectedPetForPlan) {
      onAssignPlan(selectedPetForPlan.id, planId);
      setIsPlanDialogOpen(false);
      setSelectedPetForPlan(null);
    }
  };

  const getPlanForPet = (petId: string) => {
    const pet = pets.find((p) => p.id === petId);
    if (!pet?.healthPlanId) return null;
    return healthPlans.find((plan) => plan.id === pet.healthPlanId);
  };

  const filteredPets = filterPets(pets);

  const filters = [
    { id: 'all' as FilterType, label: 'Todos os Pets', icon: null },
    { id: 'with-plan' as FilterType, label: 'Com plano', icon: Check },
    { id: 'without-plan' as FilterType, label: 'Sem plano', icon: null },
    { id: 'domestic' as FilterType, label: 'Doméstico', icon: null },
    { id: 'exotic' as FilterType, label: 'Exótico', icon: null },
    { id: 'special-attention' as FilterType, label: 'Atenção Especial', icon: AlertCircle },
  ];

  return (
    <div className="min-h-screen bg-beige-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className="w-48 flex-shrink-0">
            <div className="bg-brown-500 rounded-lg p-4 sticky top-24">
              <h2 className="text-white mb-4">Pets Cadastrados</h2>
              <div className="space-y-3">
                {filters.map((filter) => {
                  const Icon = filter.icon;
                  return (
                    <div key={filter.id} className="flex items-center gap-2">
                      <Checkbox
                        id={filter.id}
                        checked={selectedFilters.has(filter.id)}
                        onCheckedChange={() => handleFilterChange(filter.id)}
                        className="border-white data-[state=checked]:bg-white data-[state=checked]:text-brown-600"
                      />
                      <label
                        htmlFor={filter.id}
                        className="text-sm text-white cursor-pointer flex items-center gap-1"
                      >
                        {Icon && <Icon className="size-3" />}
                        {filter.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Featured Pet Card (if has special attention) */}
            {pets.filter((pet) => (pet as any).specialAttention).length > 0 && (
              <Card className="mb-6 border-2 border-brown-400 bg-gradient-to-r from-beige-100 to-white">
                <CardContent className="p-4">
                  {pets
                    .filter((pet) => (pet as any).specialAttention)
                    .slice(0, 1)
                    .map((pet) => (
                      <div key={pet.id} className="flex items-center gap-4">
                        <div className="relative">
                          <ImageWithFallback
                            src={pet.photo || 'https://images.unsplash.com/photo-1636910825807-171715240043?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBzbGVlcGluZ3xlbnwxfHx8fDE3NjM2NzIzNzB8MA&ixlib=rb-4.1.0&q=80&w=1080'}
                            alt={pet.name}
                            className="size-24 rounded-lg object-cover"
                          />
                          <Badge className="absolute -top-2 -right-2 bg-brown-600 text-white text-xs">
                            Atenção Especial
                          </Badge>
                        </div>
                        <div className="flex-1">
                          <div className="mb-1">
                            <p className="text-xs text-brown-600 mb-1">{pet.name} com</p>
                            <p className="text-sm text-brown-900">
                              "Olhos Fechados"
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            )}

            {/* Pets List */}
            <div className="space-y-4">
              {filteredPets.length === 0 ? (
                <Card className="border-brown-200">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <div className="bg-beige-200 p-6 rounded-full mb-4">
                      <Plus className="size-12 text-brown-600" />
                    </div>
                    <h3 className="text-brown-900 mb-2">Nenhum pet encontrado</h3>
                    <p className="text-brown-700 mb-4">Adicione seu primeiro pet para começar</p>
                    <Button onClick={() => setIsAddDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
                      <Plus className="size-4 mr-2" />
                      Adicionar Pet
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                filteredPets.map((pet) => {
                  const plan = getPlanForPet(pet.id);
                  return (
                    <Card
                      key={pet.id}
                      className="border-brown-200 hover:shadow-lg transition-shadow bg-gradient-to-r from-green-100 to-green-50"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-6">
                          <div className="relative flex-shrink-0">
                            <ImageWithFallback
                              src={
                                pet.photo ||
                                (pet.species === 'Cachorro'
                                  ? 'https://images.unsplash.com/photo-1636910825807-171715240043?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBzbGVlcGluZ3xlbnwxfHx8fDE3NjM2NzIzNzB8MA&ixlib=rb-4.1.0&q=80&w=1080'
                                  : 'https://images.unsplash.com/photo-1659320545793-6ceb35eaa448?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXJ0bGUlMjBwZXR8ZW58MXx8fHwxNzYzNzIyODc2fDA&ixlib=rb-4.1.0&q=80&w=1080')
                              }
                              alt={pet.name}
                              className="w-32 h-24 rounded-lg object-cover"
                            />
                            {(pet as any).specialAttention && (
                              <div className="absolute -top-2 -right-2 bg-brown-600 p-1 rounded-full">
                                <AlertCircle className="size-4 text-white" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="mb-2">
                              <p className="text-xs text-brown-700 mb-1">{pet.species}</p>
                              <h3 className="text-brown-900 mb-1">
                                {pet.name}, {pet.age} {pet.age === 1 ? 'ano' : pet.age < 12 ? 'meses' : 'anos'}
                              </h3>
                              <p className="text-sm text-brown-700">ver pet</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {plan ? (
                              <Button
                                className="bg-brown-500 hover:bg-brown-600 text-white rounded-full px-6"
                                onClick={() => handleOpenPlanDialog(pet)}
                              >
                                {plan.name}
                              </Button>
                            ) : (
                              <Button
                                className="bg-brown-500 hover:bg-brown-600 text-white rounded-full"
                                onClick={() => handleOpenPlanDialog(pet)}
                              >
                                <Plus className="size-4 mr-2" />
                                Adicionar Plano
                              </Button>
                            )}

                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(pet)}
                                className="text-brown-700 hover:bg-brown-100"
                              >
                                <Edit className="size-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onDeletePet(pet.id)}
                                className="text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}

              {/* Add Pet Button */}
              <div className="flex justify-center pt-4">
                <Button
                  onClick={() => setIsAddDialogOpen(true)}
                  className="bg-green-600 hover:bg-green-700 rounded-full px-8"
                  size="lg"
                >
                  <Plus className="size-5 mr-2" />
                  Adicionar Pet
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Pet Dialog */}
      <Dialog open={isAddDialogOpen || !!editingPet} onOpenChange={(open) => {
        if (!open) {
          setIsAddDialogOpen(false);
          setEditingPet(null);
        }
      }}>
        <DialogContent className="bg-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingPet ? 'Editar Pet' : 'Adicionar Novo Pet'}</DialogTitle>
            <DialogDescription>Preencha as informações do seu pet</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="species">Espécie</Label>
                <select
                  id="species"
                  className="w-full p-2 border rounded-md bg-white border-brown-300"
                  value={formData.species}
                  onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Cachorro">Cachorro</option>
                  <option value="Gato">Gato</option>
                  <option value="Pássaro">Pássaro</option>
                  <option value="Roedor">Roedor</option>
                  <option value="Réptil">Réptil</option>
                  <option value="Jabuti">Jabuti</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="breed">Raça</Label>
                <Input
                  id="breed"
                  value={formData.breed}
                  onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Idade (anos ou meses)</Label>
                <Input
                  id="age"
                  type="number"
                  min="0"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="photo">URL da Foto (opcional)</Label>
                <Input
                  id="photo"
                  type="url"
                  value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="specialAttention"
                checked={formData.specialAttention}
                onCheckedChange={(checked) => setFormData({ ...formData, specialAttention: checked as boolean })}
              />
              <label htmlFor="specialAttention" className="text-sm text-brown-700 cursor-pointer">
                Requer atenção especial
              </label>
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              {editingPet ? 'Salvar Alterações' : 'Adicionar Pet'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Plan Selection Dialog */}
      <Dialog open={isPlanDialogOpen} onOpenChange={setIsPlanDialogOpen}>
        <DialogContent className="bg-white max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Selecionar Plano para {selectedPetForPlan?.name}</DialogTitle>
            <DialogDescription>
              Escolha o melhor plano de saúde para seu pet. Alguns planos cobrem múltiplos pets.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {healthPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`border-2 cursor-pointer transition-all hover:shadow-lg ${
                  selectedPetForPlan?.healthPlanId === plan.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-brown-200 hover:border-brown-400'
                }`}
                onClick={() => handleAssignPlan(plan.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-brown-900 mb-1">{plan.name}</h3>
                      <p className="text-sm text-brown-600">{plan.provider}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-brown-900">R$ {plan.price.toFixed(2)}</p>
                      <p className="text-xs text-brown-600">/mês</p>
                    </div>
                  </div>
                  <p className="text-sm text-brown-700 mb-3">{plan.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {plan.coverage.slice(0, 3).map((item, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-beige-200 text-brown-700 text-xs">
                        <Check className="size-3 mr-1" />
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-brown-600">
                    Cobre até {plan.maxPets} {plan.maxPets === 1 ? 'pet' : 'pets'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}