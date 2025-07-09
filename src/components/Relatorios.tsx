import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Clock, 
  MessageCircle, 
  CheckCircle, 
  Plus, 
  TrendingUp, 
  Users, 
  Target,
  Calendar,
  BarChart3
} from "lucide-react";

const mockStats = {
  queue: 8,
  active: 15,
  completed: 42,
  total: 65,
};

const mockRanking = [
  { name: "João Silva", position: 1, chats: 28, avgTime: "12m", satisfaction: 4.8 },
  { name: "Maria Santos", position: 2, chats: 24, avgTime: "15m", satisfaction: 4.7 },
  { name: "Pedro Costa", position: 3, chats: 22, avgTime: "18m", satisfaction: 4.6 },
  { name: "Ana Oliveira", position: 4, chats: 19, avgTime: "20m", satisfaction: 4.5 },
  { name: "Carlos Lima", position: 5, chats: 16, avgTime: "22m", satisfaction: 4.4 },
];

const mockChartData = [
  { period: "08:00", chats: 12 },
  { period: "10:00", chats: 19 },
  { period: "12:00", chats: 25 },
  { period: "14:00", chats: 32 },
  { period: "16:00", chats: 28 },
  { period: "18:00", chats: 15 },
];

export function Relatorios() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Relatórios</h1>
          <p className="text-muted-foreground">
            Acompanhe o desempenho da sua equipe
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="hoje">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hoje">Hoje</SelectItem>
              <SelectItem value="7dias">7 dias</SelectItem>
              <SelectItem value="30dias">30 dias</SelectItem>
              <SelectItem value="personalizado">Personalizado</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Período
          </Button>
        </div>
      </div>

      {/* Cards de Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">
              Na Fila
            </CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{mockStats.queue}</div>
            <p className="text-xs text-orange-700">
              Aguardando atendimento
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">
              Em Atendimento
            </CardTitle>
            <MessageCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{mockStats.active}</div>
            <p className="text-xs text-blue-700">
              Conversas ativas
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">
              Concluídos
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{mockStats.completed}</div>
            <p className="text-xs text-green-700">
              Hoje
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">
              Total
            </CardTitle>
            <Plus className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{mockStats.total}</div>
            <p className="text-xs text-purple-700">
              Atendimentos hoje
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Atendimentos por Período */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Atendimentos por Período
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockChartData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.period}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-muted rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${(item.chats / 35) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground min-w-[3rem]">
                      {item.chats}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tempo Médio de Atendimento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Tempo Médio de Atendimento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">16m</div>
                <p className="text-sm text-muted-foreground">Tempo médio geral</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Muito rápido (&lt;10m)</span>
                  <Badge variant="secondary">23%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Rápido (10-20m)</span>
                  <Badge variant="secondary">45%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Médio (20-30m)</span>
                  <Badge variant="secondary">22%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Lento (&gt;30m)</span>
                  <Badge variant="secondary">10%</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance por Equipe */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Performance por Equipe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-900">Vendas</div>
              <div className="text-sm text-blue-700">45 atendimentos</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-900">Suporte</div>
              <div className="text-sm text-green-700">32 atendimentos</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-900">Cobrança</div>
              <div className="text-sm text-purple-700">18 atendimentos</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ranking de Atendentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Ranking dos Atendentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Posição</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Atendimentos</TableHead>
                <TableHead>Tempo Médio</TableHead>
                <TableHead>Satisfação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRanking.map((agent) => (
                <TableRow key={agent.position}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        agent.position === 1 ? 'bg-yellow-100 text-yellow-800' :
                        agent.position === 2 ? 'bg-gray-100 text-gray-800' :
                        agent.position === 3 ? 'bg-orange-100 text-orange-800' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {agent.position}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary-foreground">
                          {agent.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-medium">{agent.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{agent.chats}</Badge>
                  </TableCell>
                  <TableCell>{agent.avgTime}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">{agent.satisfaction}</span>
                      <span className="text-xs text-muted-foreground">⭐</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}