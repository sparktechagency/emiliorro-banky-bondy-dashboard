import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { getInitials } from "@/lib/utils";
import { Camera, ShieldCheck, User2 } from "lucide-react";

const ProfileSummary = () => {
  const admin = useSelector((state) => state.auth.admin);
  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <div className="p-6 bg-accent/50 dark:bg-accent/30">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="relative">
              <Avatar className="h-20 w-20 border">
                <AvatarImage src={admin?.profile_image} alt={admin?.name || "User"} />
                <AvatarFallback>{getInitials(admin?.name)}</AvatarFallback>
              </Avatar>
              <span className="absolute -bottom-1 -right-1 p-1 rounded-full border bg-background shadow">
                <Camera size={14} />
              </span>
            </div>
            <div>
              <p className="font-semibold text-base">{admin?.name || "User"}</p>
              <p className="text-xs text-muted-foreground">{admin?.email || ""}</p>
            </div>
          </div>
        </div>
        <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card className="border shadow-none">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full border grid place-items-center bg-primary/10 text-primary">
                <User2 size={16} />
              </div>
              <div>
                <p className="text-sm font-medium">Profile</p>
                <p className="text-xs text-muted-foreground">Complete</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border shadow-none">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full border grid place-items-center bg-primary/10 text-primary">
                <ShieldCheck size={16} />
              </div>
              <div>
                <p className="text-sm font-medium">Security</p>
                <p className="text-xs text-muted-foreground">Secure</p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSummary;
