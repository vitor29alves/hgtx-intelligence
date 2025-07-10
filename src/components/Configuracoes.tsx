import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Users, 
  Building2, 
  Clock, 
  Plus, 
  Edit, 
  Trash2,
  Shield,
  Settings,
  Smartphone,
  MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockUsers = [
  { id: "1", name: "João Silva", email: "joao@empresa.com", team: "Vendas", role: "Atendente", status: true },
  { id: "2", name: "Maria Santos", email: "maria@empresa.com", team: "Suporte", role: "Supervisor", status: true },
  { id: "3", name: "Pedro Costa", email: "pedro@empresa.com", team: "Vendas", role: "Atendente", status: false },
];

const mockTeams = [
  { id: "1", name: "Vendas", description: "Equipe de vendas e prospecção", members: 8, supervisor: "Ana Costa" },
  { id: "2", name: "Suporte", description: "Suporte técnico e atendimento", members: 5, supervisor: "Carlos Lima" },
  { id: "3", name: "Cobrança", description: "Equipe de cobrança e financeiro", members: 3, supervisor: "Lucia Oliveira" },
];

const mockChannels = [
  { id: "1", name: "WhatsApp Principal", type: "WhatsApp API Oficial", status: "Conectado", phone: "+55 11 99999-9999" },
  { id: "2", name: "WhatsApp Vendas", type: "WhatsApp API Não Oficial", status: "Conectado", phone: "+55 11 88888-8888" },
  { id: "3", name: "Instagram Oficial", type: "Instagram", status: "Desconectado", phone: "@empresa" },
];

const mockTemplates = [
  { id: "1", name: "Boas-vindas", content: "Olá! Bem-vindo à nossa empresa. Como podemos ajudá-lo hoje?", category: "Atendimento" },
  { id: "2", name: "Oferta Especial", content: "🎉 Oferta especial! Desconto de 20% em todos os produtos. Use o código: PROMO20", category: "Marketing" },
  { id: "3", name: "Carrinho Abandonado", content: "Você esqueceu alguns itens no seu carrinho. Finalize sua compra agora!", category: "E-commerce" },
];

export function Configuracoes() {
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false);
  const [isChannelDialogOpen, setIsChannelDialogOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [channels, setChannels] = useState(mockChannels);
  const [templates, setTemplates] = useState(mockTemplates);
  const [channelForm, setChannelForm] = useState({ name: "", type: "", phone: "" });
  const [templateForm, setTemplateForm] = useState({ name: "", content: "", category: "" });
  const { toast } = useToast();

  const handleChannelSubmit = () => {
    if (!channelForm.name || !channelForm.type) {
      toast({
        title: "Campos obrigatórios",
        description: "Nome e tipo são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const newChannel = {
      id: Date.now().toString(),
      ...channelForm,
      status: "Desconectado"
    };

    setChannels(prev => [...prev, newChannel]);
    setChannelForm({ name: "", type: "", phone: "" });
    setIsChannelDialogOpen(false);
    
    toast({
      title: "Canal criado!",
      description: "O canal foi criado com sucesso",
    });
  };

  const handleTemplateSubmit = () => {
    if (!templateForm.name || !templateForm.content) {
      toast({
        title: "Campos obrigatórios",
        description: "Nome e conteúdo são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const newTemplate = {
      id: Date.now().toString(),
      ...templateForm
    };

    setTemplates(prev => [...prev, newTemplate]);
    setTemplateForm({ name: "", content: "", category: "" });
    setIsTemplateDialogOpen(false);
    
    toast({
      title: "Modelo criado!",
      description: "O modelo de mensagem foi criado com sucesso",
    });
  };

  const handleDeleteChannel = (id: string) => {
    setChannels(prev => prev.filter(c => c.id !== id));
    toast({
      title: "Canal excluído!",
      description: "O canal foi excluído com sucesso",
    });
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
    toast({
      title: "Modelo excluído!",
      description: "O modelo foi excluído com sucesso",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie usuários, equipes e configurações do sistema
          </p>
        </div>
      </div>

      <Tabs defaultValue="usuarios" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="usuarios" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Usuários
          </TabsTrigger>
          <TabsTrigger value="equipes" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Equipes
          </TabsTrigger>
          <TabsTrigger value="canais" className="flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            Canais
          </TabsTrigger>
          <TabsTrigger value="modelos" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Modelos
          </TabsTrigger>
          <TabsTrigger value="conta" className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Conta
          </TabsTrigger>
          <TabsTrigger value="horarios" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Horários
          </TabsTrigger>
        </TabsList>

        <TabsContent value="usuarios" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Usuários ({mockUsers.length})
                </CardTitle>
                <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Usuário
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Novo Usuário</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Nome completo</Label>
                        <Input placeholder="Digite o nome completo" />
                      </div>
                      <div className="space-y-2">
                        <Label>E-mail</Label>
                        <Input type="email" placeholder="email@exemplo.com" />
                      </div>
                      <div className="space-y-2">
                        <Label>Senha</Label>
                        <Input type="password" placeholder="Digite a senha" />
                      </div>
                      <div className="space-y-2">
                        <Label>Equipe</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma equipe" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vendas">Vendas</SelectItem>
                            <SelectItem value="suporte">Suporte</SelectItem>
                            <SelectItem value="cobranca">Cobrança</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Perfil</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o perfil" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="supervisor">Supervisor</SelectItem>
                            <SelectItem value="atendente">Atendente</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="active" />
                        <Label htmlFor="active">Status ativo</Label>
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button variant="outline" className="flex-1" onClick={() => setIsUserDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button className="flex-1" onClick={() => setIsUserDialogOpen(false)}>
                          Salvar
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Equipe</TableHead>
                    <TableHead>Perfil</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-primary-foreground">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.team}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status ? 'default' : 'secondary'}>
                          {user.status ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipes" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Equipes ({mockTeams.length})
                </CardTitle>
                <Dialog open={isTeamDialogOpen} onOpenChange={setIsTeamDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Nova Equipe
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Nova Equipe</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Nome da equipe</Label>
                        <Input placeholder="Digite o nome da equipe" />
                      </div>
                      <div className="space-y-2">
                        <Label>Descrição</Label>
                        <Textarea placeholder="Descreva a função da equipe" />
                      </div>
                      <div className="space-y-2">
                        <Label>Supervisor</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um supervisor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ana">Ana Costa</SelectItem>
                            <SelectItem value="carlos">Carlos Lima</SelectItem>
                            <SelectItem value="lucia">Lucia Oliveira</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button variant="outline" className="flex-1" onClick={() => setIsTeamDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button className="flex-1" onClick={() => setIsTeamDialogOpen(false)}>
                          Salvar
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockTeams.map((team) => (
                  <Card key={team.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{team.name}</CardTitle>
                        <Badge variant="secondary">{team.members} membros</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{team.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Supervisor:</span>
                          <span className="font-medium">{team.supervisor}</span>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="canais" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Canais de Atendimento ({channels.length})
                </CardTitle>
                <Dialog open={isChannelDialogOpen} onOpenChange={setIsChannelDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Canal
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Novo Canal de Atendimento</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Nome do canal</Label>
                        <Input 
                          placeholder="Ex: WhatsApp Principal" 
                          value={channelForm.name}
                          onChange={(e) => setChannelForm(prev => ({...prev, name: e.target.value}))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Tipo de canal</Label>
                        <Select value={channelForm.type} onValueChange={(value) => setChannelForm(prev => ({...prev, type: value}))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="WhatsApp API Oficial">WhatsApp API Oficial</SelectItem>
                            <SelectItem value="WhatsApp API Não Oficial">WhatsApp API Não Oficial</SelectItem>
                            <SelectItem value="Instagram">Instagram</SelectItem>
                            <SelectItem value="Messenger">Messenger</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Telefone/Username</Label>
                        <Input 
                          placeholder="Ex: +55 11 99999-9999 ou @username" 
                          value={channelForm.phone}
                          onChange={(e) => setChannelForm(prev => ({...prev, phone: e.target.value}))}
                        />
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button variant="outline" className="flex-1" onClick={() => setIsChannelDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button className="flex-1" onClick={handleChannelSubmit}>
                          Salvar
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Telefone/Username</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {channels.map((channel) => (
                    <TableRow key={channel.id}>
                      <TableCell className="font-medium">{channel.name}</TableCell>
                      <TableCell>{channel.type}</TableCell>
                      <TableCell>{channel.phone}</TableCell>
                      <TableCell>
                        <Badge variant={channel.status === 'Conectado' ? 'default' : 'secondary'}>
                          {channel.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteChannel(channel.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modelos" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Modelos de Mensagem ({templates.length})
                </CardTitle>
                <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Modelo
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Novo Modelo de Mensagem</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Nome do modelo</Label>
                        <Input 
                          placeholder="Ex: Boas-vindas" 
                          value={templateForm.name}
                          onChange={(e) => setTemplateForm(prev => ({...prev, name: e.target.value}))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Categoria</Label>
                        <Select value={templateForm.category} onValueChange={(value) => setTemplateForm(prev => ({...prev, category: value}))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Atendimento">Atendimento</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="E-commerce">E-commerce</SelectItem>
                            <SelectItem value="Suporte">Suporte</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Conteúdo da mensagem</Label>
                        <Textarea 
                          placeholder="Digite o conteúdo da mensagem..." 
                          value={templateForm.content}
                          onChange={(e) => setTemplateForm(prev => ({...prev, content: e.target.value}))}
                          className="min-h-[100px]"
                        />
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button variant="outline" className="flex-1" onClick={() => setIsTemplateDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button className="flex-1" onClick={handleTemplateSubmit}>
                          Salvar
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Conteúdo</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{template.category}</Badge>
                      </TableCell>
                      <TableCell className="max-w-md">
                        <div className="truncate">{template.content}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteTemplate(template.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conta" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Informações da Conta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome da empresa</Label>
                  <Input value="HGTX Intelligence" />
                </div>
                <div className="space-y-2">
                  <Label>CNPJ</Label>
                  <Input value="00.000.000/0001-00" />
                </div>
                <div className="space-y-2">
                  <Label>E-mail principal</Label>
                  <Input value="contato@hgtx.com.br" />
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input value="+55 (11) 99999-9999" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Logo da empresa</Label>
                <div className="flex items-center gap-4">
                  <img 
                    src="/lovable-uploads/294e10b5-7f21-4845-ba93-41ffe4067211.png" 
                    alt="Logo atual" 
                    className="w-16 h-16 object-contain bg-muted rounded-lg p-2"
                  />
                  <Button variant="outline">Alterar Logo</Button>
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button>Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="horarios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Horário de Atendimento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch id="24h" />
                <Label htmlFor="24h">Atendimento 24 horas</Label>
              </div>
              
              <div className="grid gap-4">
                {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map((day) => (
                  <div key={day} className="grid grid-cols-4 gap-4 items-center">
                    <div className="flex items-center space-x-2">
                      <Switch id={day} />
                      <Label htmlFor={day} className="font-medium">{day}</Label>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Início</Label>
                      <Input type="time" value="08:00" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Fim</Label>
                      <Input type="time" value="18:00" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Intervalo</Label>
                      <Input placeholder="12:00-13:00" />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                <Label>Mensagem fora do horário</Label>
                <Textarea 
                  placeholder="Olá! Nosso atendimento funciona de segunda a sexta, das 8h às 18h. Deixe sua mensagem que retornaremos em breve!"
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="flex justify-end pt-4">
                <Button>Salvar Configurações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
