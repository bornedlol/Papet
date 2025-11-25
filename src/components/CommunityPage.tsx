import { useState } from 'react';
import { Group, Message } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Plus, Send, Users, Search, MoreVertical } from 'lucide-react';

interface CommunityPageProps {
  groups: Group[];
  messages: Record<string, Message[]>;
  currentUserId: string;
  onCreateGroup: (group: Omit<Group, 'id' | 'createdAt'>) => void;
  onSendMessage: (groupId: string, content: string) => void;
}

export function CommunityPage({
  groups,
  messages,
  currentUserId,
  onCreateGroup,
  onSendMessage,
}: CommunityPageProps) {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(groups[0] || null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newGroupData, setNewGroupData] = useState({
    name: '',
    description: '',
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim() && selectedGroup) {
      onSendMessage(selectedGroup.id, messageInput.trim());
      setMessageInput('');
    }
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateGroup({
      ...newGroupData,
      members: [currentUserId],
    });
    setNewGroupData({ name: '', description: '' });
    setIsCreateDialogOpen(false);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ontem';
    } else {
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupMessages = selectedGroup ? messages[selectedGroup.id] || [] : [];

  return (
    <div className="h-[calc(100vh-4rem)] bg-gradient-to-br from-beige-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto h-full flex">
        {/* Sidebar - Groups List */}
        <div className="w-80 bg-white border-r border-brown-200 flex flex-col">
          <div className="p-4 border-b border-brown-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-brown-900">Comunidade</h2>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Plus className="size-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle>Criar Novo Grupo</DialogTitle>
                    <DialogDescription>Crie um grupo para conversar com outros tutores</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateGroup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="groupName">Nome do Grupo</Label>
                      <Input
                        id="groupName"
                        value={newGroupData.name}
                        onChange={(e) => setNewGroupData({ ...newGroupData, name: e.target.value })}
                        placeholder="Ex: Amantes de Gatos"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="groupDescription">Descrição</Label>
                      <textarea
                        id="groupDescription"
                        className="w-full p-2 border rounded-md bg-white border-brown-300 min-h-[80px]"
                        value={newGroupData.description}
                        onChange={(e) => setNewGroupData({ ...newGroupData, description: e.target.value })}
                        placeholder="Descreva o propósito do grupo..."
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                      Criar Grupo
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-brown-500" />
              <Input
                placeholder="Buscar grupos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredGroups.length === 0 ? (
              <div className="p-4 text-center text-brown-700">
                <Users className="size-12 mx-auto mb-2 text-brown-400" />
                <p className="text-sm">Nenhum grupo encontrado</p>
              </div>
            ) : (
              <div className="divide-y divide-brown-100">
                {filteredGroups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => setSelectedGroup(group)}
                    className={`w-full p-4 text-left hover:bg-beige-50 transition-colors ${
                      selectedGroup?.id === group.id ? 'bg-green-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="bg-green-100">
                        <AvatarFallback className="text-green-700">
                          {getInitials(group.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm text-brown-900 truncate">{group.name}</h3>
                        </div>
                        <p className="text-xs text-brown-600 truncate">{group.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs bg-beige-100 text-brown-700">
                            {group.members.length} membros
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-beige-50">
          {selectedGroup ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-brown-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="bg-green-100">
                      <AvatarFallback className="text-green-700">
                        {getInitials(selectedGroup.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-brown-900">{selectedGroup.name}</h2>
                      <p className="text-sm text-brown-600">{selectedGroup.members.length} membros</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="size-4 text-brown-700" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {groupMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-brown-600">
                    <Users className="size-16 mb-4 text-brown-400" />
                    <p>Nenhuma mensagem ainda</p>
                    <p className="text-sm">Seja o primeiro a enviar uma mensagem!</p>
                  </div>
                ) : (
                  groupMessages.map((message, index) => {
                    const isCurrentUser = message.userId === currentUserId;
                    const showDateLabel =
                      index === 0 ||
                      formatDate(message.timestamp) !== formatDate(groupMessages[index - 1].timestamp);

                    return (
                      <div key={message.id}>
                        {showDateLabel && (
                          <div className="flex items-center justify-center my-4">
                            <Badge variant="secondary" className="bg-brown-200 text-brown-700">
                              {formatDate(message.timestamp)}
                            </Badge>
                          </div>
                        )}
                        <div className={`flex gap-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                          {!isCurrentUser && (
                            <Avatar className="bg-brown-200 size-8">
                              <AvatarFallback className="text-brown-700 text-xs">
                                {getInitials(message.userName)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className={`max-w-[70%] ${isCurrentUser ? 'order-first' : ''}`}>
                            {!isCurrentUser && (
                              <p className="text-xs text-brown-600 mb-1 ml-1">{message.userName}</p>
                            )}
                            <div
                              className={`rounded-lg p-3 ${
                                isCurrentUser
                                  ? 'bg-green-600 text-white'
                                  : 'bg-white text-brown-900 border border-brown-200'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  isCurrentUser ? 'text-green-100' : 'text-brown-500'
                                }`}
                              >
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Message Input */}
              <div className="bg-white border-t border-brown-200 p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    placeholder="Digite uma mensagem..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={!messageInput.trim()}>
                    <Send className="size-4" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-brown-600">
              <div className="text-center">
                <Users className="size-20 mx-auto mb-4 text-brown-400" />
                <h3 className="text-brown-900 mb-2">Selecione um grupo</h3>
                <p className="text-sm">Escolha um grupo para começar a conversar</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
