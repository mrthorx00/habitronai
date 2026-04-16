import { motion } from "framer-motion";
import { Settings, User, Bell, Palette, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const sections = [
    {
      icon: User,
      title: "Profile",
      description: "Manage your personal information",
      fields: ["Display Name", "Email"],
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Configure alerts and reminders",
      fields: ["Push Notifications", "Email Reminders"],
    },
    {
      icon: Palette,
      title: "Appearance",
      description: "Customize how LifeAI looks",
      fields: ["Theme", "Font Size"],
    },
    {
      icon: Shield,
      title: "Security",
      description: "Password and account security",
      fields: ["Change Password", "Two-Factor Auth"],
    },
  ];

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <Settings className="h-6 w-6 text-muted-foreground" />
          <h1 className="text-2xl font-heading font-bold">Settings</h1>
        </div>
      </motion.div>

      <div className="space-y-4">
        {sections.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl border bg-card p-5 shadow-card"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                <s.icon className="h-4 w-4 text-foreground" />
              </div>
              <div>
                <h3 className="font-medium">{s.title}</h3>
                <p className="text-xs text-muted-foreground">{s.description}</p>
              </div>
            </div>
            <div className="space-y-3 pl-12">
              {s.fields.map((f) => (
                <div key={f} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{f}</span>
                  <Button variant="outline" size="sm" className="text-xs">
                    Edit
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10 w-full">
          Delete Account
        </Button>
      </motion.div>
    </div>
  );
}
