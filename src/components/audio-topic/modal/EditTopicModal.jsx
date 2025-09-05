import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogFooter, 
    DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UploadCloud } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Topic name is required.' }),
  topic_image: z.any().optional(),
});

const EditTopicModal = ({ isOpen, onOpenChange, topic, onSubmit, loading }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', topic_image: undefined },
  });

  const selectedFile = form.watch('topic_image');
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (selectedFile instanceof File) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(null);
  }, [selectedFile]);

  useEffect(() => {
    if (topic) {
      form.reset({ name: topic.name || '', topic_image: undefined });
    }
  }, [topic, form]);

  const handleFormSubmit = async (values) => {
    await onSubmit(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Topic</DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Edit the topic details below.
        </DialogDescription>
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
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Replace Image (optional)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          onChange(file);
                        }}
                        {...field}
                        value={undefined}
                        className="hidden"
                        id="edit-topic-image-upload"
                      />
                      <label
                        htmlFor="edit-topic-image-upload"
                        className="flex items-center gap-3 border-2 border-dashed border-muted-foreground/50 rounded-md px-4 py-3 cursor-pointer hover:bg-muted/50 transition min-h-[64px]"
                      >
                        {previewUrl || topic?.topic_image ? (
                          <>
                            <img
                              src={previewUrl || topic?.topic_image}
                              alt={selectedFile?.name || topic?.name}
                              className="h-12 w-12 rounded object-cover"
                            />
                            <div className="flex flex-col items-start">
                              <span className="text-sm font-medium truncate max-w-[220px]">
                                {selectedFile?.name || topic?.topic_image?.split('/')?.pop() || topic?.name}
                              </span>
                              <span className="text-xs text-muted-foreground">Click to change</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <UploadCloud className="h-6 w-6 text-muted-foreground" />
                            <div className="flex flex-col items-start">
                              <span className="text-sm text-muted-foreground">Drag & drop or click to upload</span>
                              <span className="text-xs text-muted-foreground">Images only</span>
                            </div>
                          </>
                        )}
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button loading={loading} type="submit" disabled={loading}>
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTopicModal;