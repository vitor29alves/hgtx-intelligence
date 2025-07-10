
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Atendimentos } from "@/components/Atendimentos";
import { Contatos } from "@/components/Contatos";
import { CRM } from "@/components/CRM";
import { Campanhas } from "@/components/Campanhas";
import { Relatorios } from "@/components/Relatorios";
import { Configuracoes } from "@/components/Configuracoes";
import { UserProfile } from "@/components/UserProfile";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("atendimentos");

  const renderContent = () => {
    switch (activeTab) {
      case "atendimentos":
        return <Atendimentos />;
      case "contatos":
        return <Contatos />;
      case "crm":
        return <CRM />;
      case "campanhas":
        return <Campanhas />;
      case "relatorios":
        return <Relatorios />;
      case "configuracoes":
        return <Configuracoes />;
      case "perfil":
        return <UserProfile />;
      default:
        return <Atendimentos />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-hidden">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
