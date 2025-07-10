import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  ArrowRight, 
  Check, 
  Info, 
  Smile, 
  Paperclip,
  Mic,
  MicOff,
  EyeOff,
  Eye,
  X
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: "client" | "agent";
  timestamp: string;
  type?: "text" | "audio";
  audioUrl?: string;
}

interface ChatWindowProps {
  contactId: string;
  showContactDetails: boolean;
  onToggleContactDetails: () => void;
}

const mockMessages: Message[] = [
  {
    id: "1",
    text: "Olá, preciso de ajuda com meu pedido",
    sender: "client",
    timestamp: "14:30",
  },
  {
    id: "2",
    text: "Olá! Claro, vou te ajudar. Pode me passar o número do seu pedido?",
    sender: "agent",
    timestamp: "14:31",
  },
  {
    id: "3",
    text: "O número é #12345",
    sender: "client",
    timestamp: "14:32",
  },
  {
    id: "4",
    text: "Perfeito! Encontrei seu pedido. Qual é a sua dúvida?",
    sender: "agent",
    timestamp: "14:33",
  },
];

const mockAgents = [
  { id: "1", name: "João Silva", type: "agent" },
  { id: "2", name: "Maria Santos", type: "agent" },
  { id: "3", name: "Pedro Costa", type: "agent" },
];

const mockTeams = [
  { id: "1", name: "Suporte Técnico", type: "team" },
  { id: "2", name: "Vendas", type: "team" },
  { id: "3", name: "Financeiro", type: "team" },
];

export function ChatWindow({ contactId, showContactDetails, onToggleContactDetails }: ChatWindowProps) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("andamento");
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [showConcludeDialog, setShowConcludeDialog] = useState(false);
  const [transferTo, setTransferTo] = useState("");
  const [transferType, setTransferType] = useState<"agent" | "team">("agent");
  const [transferNotes, setTransferNotes] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        sender: "agent",
        timestamp: new Date().toLocaleTimeString("pt-BR", { 
          hour: "2-digit", 
          minute: "2-digit" 
        }),
        type: "text"
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTransfer = () => {
    if (!transferTo) {
      toast({
        title: "Erro",
        description: "Selecione um destinatário para a transferência",
        variant: "destructive",
      });
      return;
    }

    const selectedOption = transferType === "agent" 
      ? mockAgents.find(a => a.id === transferTo)
      : mockTeams.find(t => t.id === transferTo);

    toast({
      title: "Conversa Transferida",
      description: `Conversa transferida para ${selectedOption?.name}`,
    });

    setShowTransferDialog(false);
    setTransferTo("");
    setTransferNotes("");
  };

  const handleConclude = () => {
    setStatus("concluido");
    toast({
      title: "Conversa Concluída",
      description: "A conversa foi marcada como concluída",
    });
    setShowConcludeDialog(false);
  };

  const toggleRecording = () => {
    if (!isRecording) {
      // Iniciar gravação
      setIsRecording(true);
      toast({
        title: "Gravação Iniciada",
        description: "Gravando áudio...",
      });
    } else {
      // Parar gravação e enviar
      setIsRecording(false);
      const audioMessage: Message = {
        id: Date.now().toString(),
        text: "Áudio gravado",
        sender: "agent",
        timestamp: new Date().toLocaleTimeString("pt-BR", { 
          hour: "2-digit", 
          minute: "2-digit" 
        }),
        type: "audio",
        audioUrl: "#" // Em produção, seria a URL real do áudio
      };
      setMessages([...messages, audioMessage]);
      toast({
        title: "Áudio Enviado",
        description: "Mensagem de áudio enviada com sucesso",
      });
    }
  };

  return (
    <div className="flex flex-col h-full max-h-screen">
      {/* Header do Chat - Fixo */}
      <div className="p-4 border-b border-border bg-card flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary-foreground">MS</span>
            </div>
            <div>
              <h3 className="font-semibold">Maria Silva</h3>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pendente">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Pendente
                  </div>
                </SelectItem>
                <SelectItem value="andamento">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    Em andamento
                  </div>
                </SelectItem>
                <SelectItem value="concluido">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Concluído
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowTransferDialog(true)}
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Transferir
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowConcludeDialog(true)}
            >
              <Check className="w-4 h-4 mr-2" />
              Concluir
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onToggleContactDetails}
              title={showContactDetails ? "Ocultar detalhes do contato" : "Exibir detalhes do contato"}
            >
              {showContactDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Área de Mensagens - Scrollável */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "agent" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === "agent"
                      ? "bg-green-500 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {msg.type === "audio" ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <Mic className="w-3 h-3" />
                      </div>
                      <span className="text-sm">Mensagem de áudio</span>
                    </div>
                  ) : (
                    <p className="text-sm">{msg.text}</p>
                  )}
                  <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Input de Mensagem - Fixo na parte inferior */}
      <div className="p-4 border-t border-border bg-card flex-shrink-0">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Paperclip className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Smile className="w-4 h-4" />
          </Button>
          <Input
            placeholder="Digite sua mensagem..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button 
            variant={isRecording ? "destructive" : "ghost"}
            size="sm"
            onClick={toggleRecording}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          <Button 
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Dialog de Transferência */}
      <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transferir Conversa</DialogTitle>
            <DialogDescription>
              Selecione para quem você deseja transferir esta conversa
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Transferir para</Label>
              <Select value={transferType} onValueChange={(value: "agent" | "team") => setTransferType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="agent">Atendente</SelectItem>
                  <SelectItem value="team">Equipe</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>
                {transferType === "agent" ? "Selecionar Atendente" : "Selecionar Equipe"}
              </Label>
              <Select value={transferTo} onValueChange={setTransferTo}>
                <SelectTrigger>
                  <SelectValue placeholder={`Selecione ${transferType === "agent" ? "um atendente" : "uma equipe"}`} />
                </SelectTrigger>
                <SelectContent>
                  {transferType === "agent" 
                    ? mockAgents.map(agent => (
                        <SelectItem key={agent.id} value={agent.id}>
                          {agent.name}
                        </SelectItem>
                      ))
                    : mockTeams.map(team => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name}
                        </SelectItem>
                      ))
                  }
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Observações (opcional)</Label>
              <Textarea
                placeholder="Adicione informações sobre o contexto da conversa..."
                value={transferNotes}
                onChange={(e) => setTransferNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTransferDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleTransfer}>
              Transferir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Conclusão */}
      <AlertDialog open={showConcludeDialog} onOpenChange={setShowConcludeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Concluir Conversa</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja marcar esta conversa como concluída? 
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConclude}>
              Concluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
