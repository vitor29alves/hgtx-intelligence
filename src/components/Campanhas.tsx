
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
  Megaphone, 
  Plus, 
  Edit, 
  Trash2,
  Calendar,
  Users,
  MessageSquare,
  Play,
  Pause,
  BarChart3
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockCampaigns = [
  {
    id: "1",
    name: "Promoção Black Friday",
    team: "Vendas",
    channel: "WhatsApp API Oficial",
    sendDate: "2024-11-29",
    template: "Oferta Especial",
    recipients: 1500,
    status: "Agendada",
    sent: 0,
    opened: 0,
    clicked: 0
  },
  {
    id: "2",
    name: "Follow-up Carrinho Abandonado",
    team: "Marketing",
    channel: "WhatsApp API Não Oficial",
    sendDate: "2024-07-15",
    template: "Carrinho Abandonado",
    recipients: 800,
    status: "Enviada",
    sent: 800,
    opened: 320,
    clicked: 45
  },
  {
    id: "3",
    name: "Pesquisa de Satisfação",
    team: "Suporte",
    channel: "Instagram",
    sendDate: "2024-07-20",
    template: "Pesquisa NPS",
    recipients: 500,
    status: "Em Andamento",
    sent: 350,
    opened: 280,
    clicked: 89
  }
];

const mockTeams = ["Vendas", "Marketing", "Suporte", "Cobrança"];
const mockChannels = ["WhatsApp API Oficial", "WhatsApp API Não Oficial", "Instagram", "Messenger"];
const mockTemplates = ["Oferta Especial", "Carrinho Abandonado", "Pesquisa NPS", "Boas-vindas", "Cobrança"];

export function Campanhas() {
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    team: "",
    channel: "",
    sendDate: "",
    template: "",
    recipients: ""
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.team || !formData.channel || !formData.sendDate || !formData.template) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const newCampaign = {
      id: editingCampaign ? editingCampaign.id : Date.now().toString(),
      ...formData,
      recipients: parseInt(formData.recipients) || 0,
      status: "Agendada",
      sent: 0,
      opened: 0,
      clicked: 0
    };

    if (editingCampaign) {
      setCampaigns(prev => prev.map(c => c.id === editingCampaign.id ? newCampaign : c));
      toast({
        title: "Campanha atualizada!",
        description: "A campanha foi atualizada com sucesso",
      });
    } else {
      setCampaigns(prev => [...prev, newCampaign]);
      toast({
        title: "Campanha criada!",
        description: "A campanha foi criada com sucesso",
      });
    }

    setIsDialogOpen(false);
    setEditingCampaign(null);
    setFormData({
      name: "",
      team: "",
      channel: "",
      sendDate: "",
      template: "",
      recipients: ""
    });
  };

  const handleEdit = (campaign: any) => {
    setEditingCampaign(campaign);
    setFormData({
      name: campaign.name,
      team: campaign.team,
      channel: campaign.channel,
      sendDate: campaign.sendDate,
      template: campaign.template,
      recipients: campaign.recipients.toString()
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
    toast({
      title: "Campanha excluída!",
      description: "A campanha foi excluída com sucesso",
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      "Agendada": "secondary",
      "Em Andamento": "default",
      "Enviada": "outline",
      "Pausada": "destructive"
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Campanhas</h1>
          <p className="text-muted-foreground">
            Gerencie suas campanhas de marketing e comunicação
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nova Campanha
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingCampaign ? "Editar Campanha" : "Nova Campanha"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome da campanha *</Label>
                  <Input
                    placeholder="Digite o nome da campanha"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Equipe *</Label>
                  <Select value={formData.team} onValueChange={(value) => handleInputChange('team', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a equipe" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTeams.map((team) => (
                        <SelectItem key={team} value={team}>{team}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Canal *</Label>
                  <Select value={formData.channel} onValueChange={(value) => handleInputChange('channel', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o canal" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockChannels.map((channel) => (
                        <SelectItem key={channel} value={channel}>{channel}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Data de envio *</Label>
                  <Input
                    type="datetime-local"
                    value={formData.sendDate}
                    onChange={(e) => handleInputChange('sendDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Modelo de mensagem *</Label>
                  <Select value={formData.template} onValueChange={(value) => handleInputChange('template', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o modelo" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTemplates.map((template) => (
                        <SelectItem key={template} value={template}>{template}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Número de destinatários</Label>
                  <Input
                    type="number"
                    placeholder="Ex: 1000"
                    value={formData.recipients}
                    onChange={(e) => handleInputChange('recipients', e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button className="flex-1" onClick={handleSubmit}>
                  {editingCampaign ? "Atualizar" : "Criar"} Campanha
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="w-5 h-5" />
            Campanhas ({campaigns.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Equipe</TableHead>
                <TableHead>Canal</TableHead>
                <TableHead>Data de Envio</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Destinatários</TableHead>
                <TableHead>Estatísticas</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{campaign.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Modelo: {campaign.template}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{campaign.team}</TableCell>
                  <TableCell>{campaign.channel}</TableCell>
                  <TableCell>
                    {new Date(campaign.sendDate).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {campaign.recipients}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm space-y-1">
                      <div>Enviadas: {campaign.sent}</div>
                      <div>Abertas: {campaign.opened}</div>
                      <div>Cliques: {campaign.clicked}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(campaign)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(campaign.id)}>
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
    </div>
  );
}
