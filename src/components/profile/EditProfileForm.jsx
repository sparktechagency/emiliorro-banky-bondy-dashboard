import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Lock, ShieldCheck, User2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateAdminProfileMutation } from "@/redux/feature/auth/authApi";
import { ErrorToast, SuccessToast } from "@/lib/utils";

const EditProfileForm = () => {
  const admin = useSelector((state) => state.auth.admin);
  const [updateProfile, { isLoading }] = useUpdateAdminProfileMutation();

  const schema = z.object({
    name: z.string().trim().min(2, "Name is too short"),
    email: z.string().email(),
    phone: z
      .string()
      .trim()
      .optional()
      .transform((v) => (v === "" ? undefined : v))
      .refine((v) => !v || /^\+?\d{10,15}$/.test(v), {
        message: "Invalid phone number",
      }),
    address: z
      .string()
      .optional()
      .transform((v) => (v === "" ? undefined : v)),
  });

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: admin?.name || "",
      email: admin?.email || "",
      phone: admin?.phone || "",
      address: admin?.address || "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const payload = { name: values.name, phone: values.phone, address: values.address };
      await updateProfile(payload).unwrap();
      SuccessToast("Profile updated successfully");
      reset({ ...values });
    } catch (err) {
      const msg = err?.data?.message || "Failed to update profile";
      ErrorToast(msg);
    }
  };

  return (
    <Card>
      <CardContent className="p-4 sm:p-6 space-y-6">
        {/* Personal Information */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full border grid place-items-center bg-primary/10 text-primary">
                <User2 size={14} />
              </div>
              <h3 className="text-sm font-semibold">Personal Information</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">User Name</Label>
                <Input id="name" placeholder="Your name" {...register("name")} />
                {formState.errors.name && (
                  <p className="text-xs text-destructive">{formState.errors.name.message}</p>
                )}
              </div>
            </div>
          </section>

          <Separator />

          {/* Email Address */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full border grid place-items-center bg-primary/10 text-primary">
                <Lock size={14} />
              </div>
              <h3 className="text-sm font-semibold">Email Address</h3>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" disabled {...register("email")} />
            </div>
          </section>

          <Separator />

          {/* Contact Information */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full border grid place-items-center bg-primary/10 text-primary">
                <ShieldCheck size={14} />
              </div>
              <h3 className="text-sm font-semibold">Contact Information</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Contact Number</Label>
                <Input id="phone" type="tel" placeholder="+8801XXXXXXXXX" {...register("phone")} />
                {formState.errors.phone && (
                  <p className="text-xs text-destructive">{formState.errors.phone.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" placeholder="Your address" {...register("address")} />
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

export default EditProfileForm;
