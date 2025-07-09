import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, Edit2, Save, User, Phone, Mail, Instagram } from "lucide-react";

interface ContactDetailsProps {
  contactId: string | null;
}

export function ContactDetails({ contactId }: ContactDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: "Maria Silva",
    phone: "+55 (11) 99999-9999",
    email: "maria.silva@email.com",
    instagram: "maria_silva",
    tags: ["Cliente VIP", "Urgente"],
    customFields: {
      empresa: "Tech Solutions",
      cargo: "Gerente de Vendas",
      aniversario: "15/03/1990",
    } as Record<string, string>,
  });

  const [newTag, setNewTag] = useState("");
  const [newFieldKey, setNewFieldKey] = useState("");
  const [newFieldValue, setNewFieldValue] = useState("");

  if (!contactId) {
    return (
      <div className="p-6 text-center">
        <div className="mb-4">
          <User className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
          <h3 className="font-semibold text-muted-foreground">
            Selecione um contato
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Escolha uma conversa para visualizar os detalhes do contato
        </p>
      </div>
    );
  }

  const handleSave = () => {
    // Implementar salvamento
    setIsEditing(false);
  };

  const addTag = () => {
    if (newTag.trim()) {
      setContactInfo(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setContactInfo(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addCustomField = () => {
    if (newFieldKey.trim() && newFieldValue.trim()) {
      setContactInfo(prev => ({
        ...prev,
        customFields: {
          ...prev.customFields,
          [newFieldKey.trim()]: newFieldValue.trim()
        }
      }));
      setNewFieldKey("");
      setNewFieldValue("");
    }
  };

  const removeCustomField = (key: string) => {
    setContactInfo(prev => ({
      ...prev,
      customFields: Object.fromEntries(
        Object.entries(prev.customFields).filter(([k]) => k !== key)
      )
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Avatar e Nome */}
      <div className="text-center">
        <div className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-2xl font-bold text-primary-foreground">
            {contactInfo.name.charAt(0)}
          </span>
        </div>
        
        {isEditing ? (
          <Input
            value={contactInfo.name}
            onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
            className="text-center font-semibold"
          />
        ) : (
          <h2 className="text-lg font-semibold">{contactInfo.name}</h2>
        )}
      </div>

      {/* Informações Básicas */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label className="text-xs flex items-center gap-1">
              <Phone className="w-3 h-3" />
              Telefone
            </Label>
            <Input
              value={contactInfo.phone}
              readOnly
              className="bg-muted"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-xs flex items-center gap-1">
              <Mail className="w-3 h-3" />
              E-mail
            </Label>
            <Input
              value={contactInfo.email}
              onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
              readOnly={!isEditing}
              className={!isEditing ? "bg-muted" : ""}
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-xs flex items-center gap-1">
              <Instagram className="w-3 h-3" />
              Instagram
            </Label>
            <Input
              value={contactInfo.instagram}
              onChange={(e) => setContactInfo(prev => ({ ...prev, instagram: e.target.value }))}
              readOnly={!isEditing}
              className={!isEditing ? "bg-muted" : ""}
              placeholder="@username"
            />
          </div>
        </CardContent>
      </Card>

      {/* Etiquetas */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Etiquetas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {contactInfo.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
                {isEditing && (
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </Badge>
            ))}
          </div>
          
          {isEditing && (
            <div className="flex gap-2">
              <Input
                placeholder="Nova etiqueta"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                className="flex-1"
              />
              <Button size="sm" onClick={addTag}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Campos Personalizados */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Campos Personalizados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.entries(contactInfo.customFields).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <Label className="text-xs capitalize">{key}</Label>
              <div className="flex gap-2">
                <Input
                  value={value}
                  onChange={(e) => setContactInfo(prev => ({
                    ...prev,
                    customFields: {
                      ...prev.customFields,
                      [key]: e.target.value
                    }
                  }))}
                  readOnly={!isEditing}
                  className={!isEditing ? "bg-muted flex-1" : "flex-1"}
                />
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCustomField(key)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
          
          {isEditing && (
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Campo"
                  value={newFieldKey}
                  onChange={(e) => setNewFieldKey(e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="Valor"
                  value={newFieldValue}
                  onChange={(e) => setNewFieldValue(e.target.value)}
                  className="flex-1"
                />
              </div>
              <Button size="sm" onClick={addCustomField} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Campo
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Botão de Ação */}
      <div className="pt-4">
        {isEditing ? (
          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancelar
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)} className="w-full">
            <Edit2 className="w-4 h-4 mr-2" />
            Editar
          </Button>
        )}
      </div>
    </div>
  );
}