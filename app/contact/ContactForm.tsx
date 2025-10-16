'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { sendMessageServerAction } from '../actions/sendMailServerAction';

// Define the type of state returned by sendMessageServerAction
type ContactFormState =
  | { success: string }
  | { error: string }
  | { fullnameError: string }
  | { emailError: string }
  | { messageError: string };

const labelWithRequiredStar = ({ label }: { label: string }) => (
  <Label htmlFor={label.toLowerCase()}>
    <span className="flex">
      <span>{label}</span>
      <span className="text-red-500">*</span>
    </span>
  </Label>
);

const ContactForm = () => {
  // Specify state type for useActionState
const [state, action, isPending] = useActionState<
  ContactFormState | null,
  FormData
>(sendMessageServerAction, null);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    message: '',
  });

  // Handle success messages
  useEffect(() => {
    if (state && 'success' in state) {
      toast.success(state.success);
      setFormData({ fullname: '', email: '', message: '' });
    }
  }, [state]);

  // Handle errors
  useEffect(() => {
    if (state && 'error' in state) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form action={action} className="space-y-6">
      {/* Name */}
      <div className="space-y-2">
        {labelWithRequiredStar({ label: 'Name' })}
        <Input
          type="text"
          id="name"
          placeholder="Your name, your fame"
          name="fullname"
          value={formData.fullname}
          onChange={(e) =>
            setFormData({ ...formData, fullname: e.target.value })
          }
        />
        {state && 'fullnameError' in state && (
          <span className="text-sm text-red-500">{state.fullnameError}</span>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        {labelWithRequiredStar({ label: 'Email' })}
        <Input
          type="text"
          id="email"
          placeholder="Where can I reach you back?"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <span className="text-sm text-muted-foreground">
          Temporary emails are also accepted, unless you wish to hear back 😉
        </span>
        {state && 'emailError' in state && (
          <span className="text-sm text-red-500">{state.emailError}</span>
        )}
      </div>

      {/* Message */}
      <div className="space-y-2">
        {labelWithRequiredStar({ label: 'Message' })}
        <Textarea
          id="message"
          placeholder="Your words, my inbox."
          name="message"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        />
        {state && 'messageError' in state && (
          <span className="text-sm text-red-500">{state.messageError}</span>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col space-y-4">
        <Button
          type="submit"
          size="lg"
          className="w-full py-4"
          disabled={isPending}
        >
          {isPending
            ? 'Transporting your message to my inbox... 📨'
            : 'Submit'}
        </Button>

        <Button
          type="reset"
          variant="outline"
          size="lg"
          className="w-full py-4"
          onClick={() => setFormData({ fullname: '', email: '', message: '' })}
        >
          Reset
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
