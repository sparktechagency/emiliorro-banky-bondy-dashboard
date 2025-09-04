import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AlertCircleIcon, ImageUpIcon, XIcon } from 'lucide-react';
import { useFileUpload } from '@/hooks/use-file-upload';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Topic name is required.' }),
  topic_image: z
    .any()
    .refine((file) => file instanceof File, { message: 'Topic image is required.' }),
});

const AddTopicModal = ({ isOpen, onOpenChange, onSubmit, loading }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', topic_image: undefined },
  });

  // Drag & drop uploader (single file)
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024;
  const [state, actions] = useFileUpload({ accept: 'image/*', maxSize });
  const { files, isDragging, errors } = state;
  const { getInputProps, openFileDialog, handleDragEnter, handleDragLeave, handleDragOver, handleDrop, removeFile } = actions;

  // Sync selected file to RHF whenever it changes
  useEffect(() => {
    const file = files[0]?.file || undefined;
    form.setValue('topic_image', file, { shouldValidate: true });
  }, [files, form]);

  const handleFormSubmit = async (values) => {
    await onSubmit(values);
    form.reset({ name: '' });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Topic</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. My Topic" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="topic_image"
              render={() => {
                const previewUrl = files[0]?.preview || null;
                return (
                  <FormItem>
                    <FormLabel>Topic Image</FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <div className="relative">
                          <div
                            role="button"
                            onClick={openFileDialog}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            data-dragging={isDragging || undefined}
                            className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:ring-[3px]"
                          >
                            <input {...getInputProps()} className="sr-only" aria-label="Upload file" />
                            {previewUrl ? (
                              <div className="absolute inset-0">
                                <img src={previewUrl} alt={files[0]?.file?.name || 'Uploaded image'} className="size-full object-cover" />
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                                <div className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border" aria-hidden="true">
                                  <ImageUpIcon className="size-4 opacity-60" />
                                </div>
                                <p className="mb-1.5 text-sm font-medium">Drop your image here or click to browse</p>
                                <p className="text-muted-foreground text-xs">Max size: {maxSizeMB}MB</p>
                              </div>
                            )}
                          </div>
                          {previewUrl && (
                            <div className="absolute top-4 right-4">
                              <button
                                type="button"
                                className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
                                onClick={() => {
                                  removeFile(files[0]?.id);
                                  form.setValue('topic_image', undefined, { shouldValidate: true });
                                }}
                                aria-label="Remove image"
                              >
                                <XIcon className="size-4" aria-hidden="true" />
                              </button>
                            </div>
                          )}
                        </div>

                        {(errors?.length > 0 || form.formState.errors.topic_image) && (
                          <div className="text-destructive flex items-center gap-1 text-xs" role="alert">
                            <AlertCircleIcon className="size-3 shrink-0" />
                            <span>{errors?.[0] || form.formState.errors.topic_image?.message}</span>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button loading={loading} type="submit" disabled={loading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTopicModal;
