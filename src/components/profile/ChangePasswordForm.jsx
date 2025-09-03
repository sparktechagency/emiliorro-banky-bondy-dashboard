import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangePasswordMutation } from "@/redux/feature/auth/authApi";

const ChangePasswordForm = () => {
  const schema = z
    .object({
      oldPassword: z.string().min(6, "At least 6 characters"),
      newPassword: z.string().min(6, "At least 6 characters"),
      confirmNewPassword: z.string().min(6, "At least 6 characters"),
    })
    .refine((vals) => vals.newPassword === vals.confirmNewPassword, {
      path: ["confirmNewPassword"],
      message: "Passwords do not match",
    });

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onSubmit = async (values) => {
    try {
      await changePassword({ oldPassword: values.oldPassword, newPassword: values.newPassword, confirmNewPassword: values.confirmNewPassword }).unwrap();
      reset();
    } catch {
      // toasts handled in mutation; nothing extra here
    }
  };

  return (
    <Card>
      <CardContent className="p-4 sm:p-6 space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full border grid place-items-center bg-primary/10 text-primary">
                <Lock size={14} />
              </div>
              <h3 className="text-sm font-semibold">Change Password</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="oldPassword">Current Password</Label>
                <Input id="oldPassword" type="password" placeholder="••••••••" {...register("oldPassword")} />
                {formState.errors.oldPassword && (
                  <p className="text-xs text-destructive">{formState.errors.oldPassword.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" placeholder="••••••••" {...register("newPassword")} />
                {formState.errors.newPassword && (
                  <p className="text-xs text-destructive">{formState.errors.newPassword.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                <Input id="confirmNewPassword" type="password" placeholder="••••••••" {...register("confirmNewPassword")} />
                {formState.errors.confirmNewPassword && (
                  <p className="text-xs text-destructive">{formState.errors.confirmNewPassword.message}</p>
                )}
              </div>
            </div>
          </section>
          <div className="pt-2">
            <Button loading={isLoading} className="w-full" type="submit" disabled={isLoading}>
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm;
