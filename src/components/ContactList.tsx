import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Contact {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  status: "pendente" | "andamento" | "concluido";
  unread: number;
  avatar?: string;
}

interface ContactListProps {
  type: "novos" | "meus" | "outros";
  selectedContact: string | null;
  onContactSelect: (contactId: string) => void;
}

const mockContacts: Record<string, Contact[]> = {
  novos: [
    {
      id: "1",
      name: "Maria Silva",
      lastMessage: "Olá, preciso de ajuda com meu pedido",
      timestamp: "14:30",
      status: "pendente",
      unread: 2,
    },
    {
      id: "2",
      name: "João Santos",
      lastMessage: "Quando vocês voltam a ter estoque?",
      timestamp: "14:25",
      status: "pendente",
      unread: 1,
    },
    {
      id: "3",
      name: "Ana Costa",
      lastMessage: "Gostaria de saber sobre os preços",
      timestamp: "14:20",
      status: "pendente",
      unread: 3,
    },
  ],
  meus: [
    {
      id: "4",
      name: "Carlos Oliveira",
      lastMessage: "Perfeito, muito obrigado!",
      timestamp: "14:15",
      status: "andamento",
      unread: 0,
    },
    {
      id: "5",
      name: "Fernanda Lima",
      lastMessage: "Estou aguardando a resposta",
      timestamp: "14:10",
      status: "andamento",
      unread: 1,
    },
    {
      id: "6",
      name: "Pedro Alves",
      lastMessage: "Certo, vou aguardar",
      timestamp: "14:05",
      status: "concluido",
      unread: 0,
    },
  ],
  outros: [
    {
      id: "7",
      name: "Lucia Rodrigues",
      lastMessage: "Obrigada pelo atendimento!",
      timestamp: "13:50",
      status: "concluido",
      unread: 0,
    },
    {
      id: "8",
      name: "Roberto Ferreira",
      lastMessage: "Vou pensar e te retorno",
      timestamp: "13:45",
      status: "andamento",
      unread: 0,
    },
  ],
};

const statusColors = {
  pendente: "bg-error",
  andamento: "bg-warning",
  concluido: "bg-success",
};

export function ContactList({ type, selectedContact, onContactSelect }: ContactListProps) {
  const contacts = mockContacts[type] || [];

  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="space-y-2">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={cn(
              "p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-accent",
              selectedContact === contact.id && "bg-accent ring-2 ring-primary/20"
            )}
            onClick={() => onContactSelect(contact.id)}
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">
                    {contact.name.charAt(0)}
                  </span>
                </div>
                <div className={cn("w-3 h-3 rounded-full absolute -bottom-0.5 -right-0.5 border-2 border-card", statusColors[contact.status])}></div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-sm truncate">{contact.name}</h3>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">{contact.timestamp}</span>
                    {contact.unread > 0 && (
                      <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                        {contact.unread}
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}