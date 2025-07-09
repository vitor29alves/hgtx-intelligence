import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContactList } from "@/components/ContactList";
import { ChatWindow } from "@/components/ChatWindow";
import { ContactDetails } from "@/components/ContactDetails";

export function Atendimentos() {
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  return (
    <div className="h-full flex bg-background">
      {/* Coluna 1 - Lista de Conversas */}
      <div className="w-80 border-r border-border bg-card">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-lg mb-4">Conversas</h2>
          <Tabs defaultValue="novos" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="novos" className="text-xs">
                Novos
                <Badge variant="secondary" className="ml-1">5</Badge>
              </TabsTrigger>
              <TabsTrigger value="meus" className="text-xs">
                Meus
                <Badge variant="secondary" className="ml-1">12</Badge>
              </TabsTrigger>
              <TabsTrigger value="outros" className="text-xs">
                Outros
                <Badge variant="secondary" className="ml-1">8</Badge>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="novos" className="mt-4">
              <ContactList 
                type="novos" 
                selectedContact={selectedContact} 
                onContactSelect={setSelectedContact} 
              />
            </TabsContent>
            <TabsContent value="meus" className="mt-4">
              <ContactList 
                type="meus" 
                selectedContact={selectedContact} 
                onContactSelect={setSelectedContact} 
              />
            </TabsContent>
            <TabsContent value="outros" className="mt-4">
              <ContactList 
                type="outros" 
                selectedContact={selectedContact} 
                onContactSelect={setSelectedContact} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Coluna 2 - Chat Ativo */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <ChatWindow contactId={selectedContact} />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-muted/20">
            <Card className="w-96 text-center">
              <CardHeader>
                <CardTitle className="text-muted-foreground">
                  Nenhuma conversa selecionada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Selecione uma conversa na lista ao lado para começar o atendimento
                </p>
                <div className="flex justify-center">
                  <img 
                    src="/lovable-uploads/294e10b5-7f21-4845-ba93-41ffe4067211.png" 
                    alt="HGTX Intelligence" 
                    className="w-24 h-24 object-contain opacity-50"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Coluna 3 - Detalhes do Contato */}
      <div className="w-80 border-l border-border bg-card">
        <ContactDetails contactId={selectedContact} />
      </div>
    </div>
  );
}