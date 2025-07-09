
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
  MoreVertical 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Message {
  id: string;
  text: string;
  sender: "client" | "agent";
  timestamp: string;
}

interface ChatWindowProps {
  contactId: string;
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

export function ChatWindow({ contactId }: ChatWindowProps) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("andamento");

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Enviando mensagem:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header do Chat */}
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
                    <div className="w-2 h-2 bg-error rounded-full"></div>
                    Pendente
                  </div>
                </SelectItem>
                <SelectItem value="andamento">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    Em andamento
                  </div>
                </SelectItem>
                <SelectItem value="concluido">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    Concluído
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm">
              <ArrowRight className="w-4 h-4 mr-2" />
              Transferir
            </Button>
            
            <Button variant="outline" size="sm">
              <Check className="w-4 h-4 mr-2" />
              Concluir
            </Button>
            
            <Button variant="ghost" size="sm">
              <Info className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Área de Mensagens - Flex-1 para ocupar espaço disponível */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "agent" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === "agent"
                    ? "bg-whatsapp text-whatsapp-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

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
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
