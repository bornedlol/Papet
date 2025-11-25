import { HealthPlan } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Check, Heart, Star } from 'lucide-react';
import { Badge } from './ui/badge';

interface PlansPageProps {
  plans: HealthPlan[];
  onSelectPlan: (planId: string) => void;
}

export function PlansPage({ plans, onSelectPlan }: PlansPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-brown-900 mb-4">Planos de Saúde para seu Pet</h1>
          <p className="text-brown-700 max-w-2xl mx-auto">
            Escolha o melhor plano de saúde para garantir o bem-estar e a proteção do seu melhor amigo.
            Todos os planos incluem cobertura de emergência 24h.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => {
            const isPopular = plan.name === 'Plano Completo';
            const isPremium = plan.name === 'Plano Premium';

            return (
              <Card
                key={plan.id}
                className={`border-2 hover:shadow-xl transition-all relative ${
                  isPremium
                    ? 'border-green-400 bg-gradient-to-br from-green-50 to-white'
                    : isPopular
                    ? 'border-brown-400 bg-gradient-to-br from-brown-50 to-white'
                    : 'border-brown-200'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-brown-600 text-white">Mais Popular</Badge>
                  </div>
                )}
                {isPremium && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-600 text-white">
                      <Star className="size-3 mr-1" />
                      Premium
                    </Badge>
                  </div>
                )}

                <CardHeader>
                  <div className="flex items-center justify-center mb-4">
                    <div className={`p-4 rounded-full ${isPremium ? 'bg-green-100' : 'bg-brown-100'}`}>
                      <Heart className={`size-8 ${isPremium ? 'text-green-600' : 'text-brown-600'}`} />
                    </div>
                  </div>
                  <CardTitle className="text-center text-brown-900">{plan.name}</CardTitle>
                  <CardDescription className="text-center">{plan.provider}</CardDescription>
                  <div className="text-center mt-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-sm text-brown-700">R$</span>
                      <span className="text-brown-900">{plan.price.toFixed(2)}</span>
                      <span className="text-sm text-brown-700">/mês</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-brown-700 mb-4 min-h-[3rem]">{plan.description}</p>

                  <div className="space-y-3 mb-6">
                    {plan.coverage.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-brown-700">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mb-4 p-3 bg-beige-100 rounded-lg">
                    <p className="text-xs text-brown-700 text-center">
                      Até {plan.maxPets} {plan.maxPets === 1 ? 'pet' : 'pets'}
                    </p>
                  </div>

                  <Button
                    onClick={() => onSelectPlan(plan.id)}
                    className={`w-full ${
                      isPremium
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-brown-500 hover:bg-brown-600'
                    }`}
                  >
                    Selecionar Plano
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="mt-16 bg-white rounded-xl border border-brown-200 p-8">
          <h2 className="text-center text-brown-900 mb-8">Por que escolher Papet?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="size-8 text-green-600" />
              </div>
              <h3 className="text-brown-900 mb-2">Cobertura Completa</h3>
              <p className="text-sm text-brown-700">
                Proteção abrangente para todas as necessidades do seu pet
              </p>
            </div>
            <div className="text-center">
              <div className="bg-brown-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="size-8 text-brown-600" />
              </div>
              <h3 className="text-brown-900 mb-2">Sem Carência</h3>
              <p className="text-sm text-brown-700">
                Atendimento imediato, sem período de carência
              </p>
            </div>
            <div className="text-center">
              <div className="bg-beige-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="size-8 text-beige-700" />
              </div>
              <h3 className="text-brown-900 mb-2">Rede Credenciada</h3>
              <p className="text-sm text-brown-700">
                Acesso a milhares de clínicas e hospitais parceiros
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
