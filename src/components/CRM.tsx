
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  Instagram, 
  Calendar,
  DollarSign,
  User
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram?: string;
  company?: string;
  status: "lead" | "contato" | "proposta" | "negociacao" | "fechado" | "perdido";
  value?: number;
  lastContact: string;
  source: string;
  notes: string;
  assignedTo: string;
}

const initialLeads: Lead[] = [
  {
    id: "1",
    name: "Maria Silva",
    email: "maria.silva@email.com",
    phone: "+55 (11) 99999-9999",
    instagram: "maria_silva",
    company: "Tech Solutions",
    status: "lead",
    value: 15000,
    lastContact: "2024-01-15",
    source: "Site",
    notes: "Interessada em soluções corporativas",
    assignedTo: "João Silva"
  },
  {
    id: "2",
    name: "Carlos Santos",
    email: "carlos@empresa.com",
    phone: "+55 (11) 88888-8888",
    company: "Inovação Corp",
    status: "contato",
    value: 25000,
    lastContact: "2024-01-14",
    source: "Indicação",
    notes: "Primeira reunião agendada",
    assignedTo: "João Silva"
  },
  {
    id: "3",
    name: "Ana Costa",
    email: "ana.costa@startup.com",
    phone: "+55 (11) 77777-7777",
    company: "StartupXYZ",
    status: "proposta",
    value: 35000,
    lastContact: "2024-01-13",
    source: "LinkedIn",
    notes: "Proposta enviada, aguardando retorno",
    assignedTo: "João Silva"
  },
  {
    id: "4",
    name: "Pedro Oliveira",
    email: "pedro@negocio.com",
    phone: "+55 (11) 66666-6666",
    company: "Negócios Ltd",
    status: "negociacao",
    value: 50000,
    lastContact: "2024-01-12",
    source: "Evento",
    notes: "Negociando condições de pagamento",
    assignedTo: "João Silva"
  }
];

const statusConfig = {
  lead: { title: "Leads", color: "bg-gray-100", textColor: "text-gray-700" },
  contato: { title: "Primeiro Contato", color: "bg-blue-100", textColor: "text-blue-700" },
  proposta: { title: "Proposta Enviada", color: "bg-yellow-100", textColor: "text-yellow-700" },
  negociacao: { title: "Em Negociação", color: "bg-orange-100", textColor: "text-orange-700" },
  fechado: { title: "Fechado", color: "bg-green-100", textColor: "text-green-700" },
  perdido: { title: "Perdido", color: "bg-red-100", textColor: "text-red-700" }
};

export function CRM() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    instagram: "",
    company: "",
    status: "lead" as Lead["status"],
    value: 0,
    source: "",
    notes: "",
    assignedTo: "João Silva"
  });

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      instagram: "",
      company: "",
      status: "lead",
      value: 0,
      source: "",
      notes: "",
      assignedTo: "João Silva"
    });
    setEditingLead(null);
  };

  const handleOpenDialog = (lead?: Lead) => {
    if (lead) {
      setEditingLead(lead);
      setFormData({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        instagram: lead.instagram || "",
        company: lead.company || "",
        status: lead.status,
        value: lead.value || 0,
        source: lead.source,
        notes: lead.notes,
        assignedTo: lead.assignedTo
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSaveLead = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Nome e email são obrigatórios!");
      return;
    }

    if (editingLead) {
      setLeads(leads.map(lead =>
        lead.id === editingLead.id
          ? { ...lead, ...formData, lastContact: new Date().toISOString().split('T')[0] }
          : lead
      ));
    } else {
      const newLead: Lead = {
        id: Date.now().toString(),
        ...formData,
        lastContact: new Date().toISOString().split('T')[0]
      };
      setLeads([...leads, newLead]);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDragStart = (lead: Lead) => {
    setDraggedLead(lead);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: Lead["status"]) => {
    e.preventDefault();
    if (draggedLead) {
      setLeads(leads.map(lead =>
        lead.id === draggedLead.id
          ? { ...lead, status: newStatus, lastContact: new Date().toISOString().split('T')[0] }
          : lead
      ));
      setDraggedLead(null);
    }
  };

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLeadsByStatus = (status: Lead["status"]) => {
    return filteredLeads.filter(lead => lead.status === status);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getTotalValueByStatus = (status: Lead["status"]) => {
    return getLeadsByStatus(status).reduce((sum, lead) => sum + (lead.value || 0), 0);
  };

  return (
    <div className="p-6 h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">CRM - Pipeline de Vendas</h1>
          <p className="text-muted-foreground">
            Gerencie seus leads e oportunidades de negócio
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Novo Lead
        </Button>
      </div>

      {/* Filtros */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-6 gap-4 h-full">
          {Object.entries(statusConfig).map(([status, config]) => {
            const statusLeads = getLeadsByStatus(status as Lead["status"]);
            const totalValue = getTotalValueByStatus(status as Lead["status"]);
            
            return (
              <div
                key={status}
                className="flex flex-col bg-muted/20 rounded-lg p-4"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, status as Lead["status"])}
              >
                {/* Column Header */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm">{config.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {statusLeads.length}
                    </Badge>
                  </div>
                  {totalValue > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(totalValue)}
                    </p>
                  )}
                </div>

                {/* Cards */}
                <div className="flex-1 overflow-y-auto space-y-3">
                  {statusLeads.map((lead) => (
                    <Card
                      key={lead.id}
                      className="cursor-move hover:shadow-md transition-shadow"
                      draggable
                      onDragStart={() => handleDragStart(lead)}
                      onClick={() => handleOpenDialog(lead)}
                    >
                      <CardContent className="p-3">
                        <div className="space-y-2">
                          {/* Nome e Avatar */}
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-xs">
                                {lead.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{lead.name}</p>
                              {lead.company && (
                                <p className="text-xs text-muted-foreground truncate">
                                  {lead.company}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Valor */}
                          {lead.value && (
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3 text-green-600" />
                              <span className="text-sm font-medium text-green-600">
                                {formatCurrency(lead.value)}
                              </span>
                            </div>
                          )}

                          {/* Contatos */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Phone className="w-3 h-3" />
                              <span className="truncate">{lead.phone}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Mail className="w-3 h-3" />
                              <span className="truncate">{lead.email}</span>
                            </div>
                          </div>

                          {/* Último contato */}
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>Último contato: {new Date(lead.lastContact).toLocaleDateString('pt-BR')}</span>
                          </div>

                          {/* Responsável */}
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <User className="w-3 h-3" />
                            <span>{lead.assignedTo}</span>
                          </div>

                          {/* Source */}
                          <Badge variant="outline" className="text-xs w-fit">
                            {lead.source}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Novo/Editar Lead */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingLead ? "Editar Lead" : "Novo Lead"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Nome *</Label>
                <Input 
                  placeholder="Nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Email *</Label>
                <Input 
                  placeholder="email@exemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Telefone</Label>
                <Input 
                  placeholder="+55 (11) 99999-9999"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Instagram</Label>
                <Input 
                  placeholder="username"
                  value={formData.instagram}
                  onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Empresa</Label>
              <Input 
                placeholder="Nome da empresa"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as Lead["status"] }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(statusConfig).map(([status, config]) => (
                      <SelectItem key={status} value={status}>
                        {config.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Valor (R$)</Label>
                <Input 
                  type="number"
                  placeholder="0,00"
                  value={formData.value}
                  onChange={(e) => setFormData(prev => ({ ...prev, value: parseFloat(e.target.value) || 0 }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Origem</Label>
                <Select value={formData.source} onValueChange={(value) => setFormData(prev => ({ ...prev, source: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a origem" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Site">Site</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="Indicação">Indicação</SelectItem>
                    <SelectItem value="Evento">Evento</SelectItem>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Responsável</Label>
                <Select value={formData.assignedTo} onValueChange={(value) => setFormData(prev => ({ ...prev, assignedTo: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="João Silva">João Silva</SelectItem>
                    <SelectItem value="Maria Santos">Maria Santos</SelectItem>
                    <SelectItem value="Pedro Costa">Pedro Costa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Observações</Label>
              <Textarea 
                placeholder="Observações sobre o lead..."
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                onClick={() => setIsDialogOpen(false)}
                variant="outline" 
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSaveLead}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                {editingLead ? "Salvar" : "Criar"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
