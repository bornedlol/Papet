import { useState } from 'react';
import { UserType } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { PawPrint } from 'lucide-react';
import logoImage from 'figma:asset/d39f76daef09c9c2274206c142ae2138b54dee3e.png';

interface RegisterFormProps {
  onRegister: (name: string, email: string, password: string, type: UserType) => void;
  onSwitchToLogin: () => void;
}

export function RegisterForm({ onRegister, onSwitchToLogin }: RegisterFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState<UserType>('user');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    onRegister(name, email, password, userType);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-beige-100 via-green-50 to-brown-100">
      <Card className="w-full max-w-md border-brown-300">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src={logoImage} alt="Papet Logo" className="h-16" />
          </div>
          <CardTitle className="text-brown-800">Cadastre-se no Papet</CardTitle>
          <CardDescription>Crie sua conta para começar</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="user" onValueChange={(value) => setUserType(value as UserType)}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="user">Usuário</TabsTrigger>
              <TabsTrigger value="clinic">Empresa</TabsTrigger>
            </TabsList>

            <TabsContent value="user">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="user-name">Nome completo</Label>
                  <Input
                    id="user-name"
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-email">Email</Label>
                  <Input
                    id="user-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-password">Senha</Label>
                  <Input
                    id="user-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-confirm-password">Confirmar senha</Label>
                  <Input
                    id="user-confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Cadastrar
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="clinic">
              <div className="mb-4">
                <Label htmlFor="company-type">Tipo de empresa</Label>
                <select
                  id="company-type"
                  className="w-full mt-2 p-2 border rounded-md bg-white border-brown-300"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value as UserType)}
                >
                  <option value="clinic">Clínica Veterinária</option>
                  <option value="plan_provider">Provedora de Planos</option>
                  <option value="professional">Profissional Solo</option>
                </select>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nome da empresa</Label>
                  <Input
                    id="company-name"
                    type="text"
                    placeholder="Nome da empresa"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">Email</Label>
                  <Input
                    id="company-email"
                    type="email"
                    placeholder="empresa@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-password">Senha</Label>
                  <Input
                    id="company-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-confirm-password">Confirmar senha</Label>
                  <Input
                    id="company-confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Cadastrar Empresa
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-sm text-brown-700">
              Já tem uma conta?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-green-600 hover:text-green-700 hover:underline"
              >
                Faça login
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}