import { Navbar } from "@/components/navigation/navbar";
import { CommunicationPreferencesForm } from "@/components/pages/personalized-content/alerts-and-notifications/communication-preferences-form";
import { EmailPreferencesForm } from "@/components/pages/personalized-content/alerts-and-notifications/email-preferences-form";

export const AlertsAndNotificationsPage = () => {
  return (
    <div>
      <Navbar />
      <main className="p-10">
        <div>
          <h1 className="text-2xl font-bold">Alerts and Notifications</h1>
          <hr className="mt-5" />
        </div>
        <div className="space-y-5">
          <EmailPreferencesForm />
          <CommunicationPreferencesForm />
        </div>
      </main>
    </div>
  );
};
