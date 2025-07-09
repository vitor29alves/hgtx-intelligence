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
  Settings
} from "lucide-react";

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

export function Configuracoes() {
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false);

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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="usuarios" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Usuários
          </TabsTrigger>
          <TabsTrigger value="equipes" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Equipes
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

        {/* Tab Usuários */}
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

        {/* Tab Equipes */}
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

        {/* Tab Conta */}
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

        {/* Tab Horários */}
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