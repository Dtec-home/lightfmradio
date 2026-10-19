'use client';

import { Navbar } from '@/components/Navbar';
import { Player } from '@/components/Player';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { PageHeader } from '@/components/PageHeader';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, Send } from 'lucide-react';
import { GivingForm } from '@/components/GivingForm';

const WAYS_TO_HELP = [
  {
    title: 'Prayer Requests',
    description: 'Share what\'s on your heart — our team prays over every request.',
    href: '#prayer-request',
  },
  {
    title: 'WhatsApp Fellowship',
    description: 'Join our Bible study community for daily encouragement.',
    href: '#fellowship',
  },
  {
    title: 'Support the Mission',
    description: 'See what your generosity is funding right now.',
    href: '#give',
  },
  {
    title: 'Volunteer',
    description: 'Serve alongside our ministry team in outreach and media.',
    href: '/contact?category=volunteer',
  },
];

const prayerRequestSchema = z.object({
  name: z.string().min(2, 'Please enter your name (at least 2 characters).'),
  contact: z.string().min(3, 'Please enter an email or phone number so we can reach you.'),
  request: z.string().min(10, 'Please share a bit more detail (at least 10 characters).'),
  isConfidential: z.boolean(),
});

type PrayerRequestValues = z.infer<typeof prayerRequestSchema>;

export default function GetInvolvedPage() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PrayerRequestValues>({
    resolver: zodResolver(prayerRequestSchema),
    defaultValues: {
      name: '',
      contact: '',
      request: '',
      isConfidential: false,
    },
  });

  const onSubmitPrayerRequest = async (data: PrayerRequestValues) => {
    try {
      const response = await fetch('/api/prayer-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Your prayer request has been received', {
          description: 'Our team will be praying over this with you.',
        });
        reset();
      } else {
        toast.error('Something went wrong', {
          description: 'Please try again in a moment.',
        });
      }
    } catch (err) {
      toast.error('Something went wrong', {
        description: 'Please check your connection and try again.',
      });
    }
  };

  return (
    <>
      <Navbar />
      <Player />
      <Toaster />

      <main className="pt-16 pb-24">
        <PageHeader
          title="Get involved"
          intro="Whether through prayer, fellowship, giving, or serving, there's a place for you in this ministry."
        />

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
            {WAYS_TO_HELP.map((way) => (
              <li key={way.title} className="border-b border-border">
                <Link href={way.href} className="group flex items-start justify-between gap-6 py-6">
                  <span>
                    <span className="block font-display text-2xl font-semibold uppercase transition-colors group-hover:text-primary">
                      {way.title}
                    </span>
                    <span className="mt-1 block text-muted-foreground">{way.description}</span>
                  </span>
                  <ArrowRight className="mt-1.5 size-5 shrink-0 text-primary transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="prayer-request" className="scroll-mt-24 border-t border-border py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
            <div className="lg:col-span-5">
              <h2 className="font-display text-4xl leading-none font-bold uppercase md:text-5xl">Share a prayer request</h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
                Whatever you&rsquo;re carrying, our team would be honored to pray over it with you.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmitPrayerRequest)} noValidate className="lg:col-span-7">
              <FieldGroup>
                <Field data-invalid={!!errors.name || undefined}>
                  <FieldLabel htmlFor="pr-name">Name</FieldLabel>
                  <Input id="pr-name" type="text" placeholder="Your name" aria-invalid={!!errors.name} className="bg-background" {...register('name')} />
                  <FieldError errors={[errors.name]} />
                </Field>

                <Field data-invalid={!!errors.contact || undefined}>
                  <FieldLabel htmlFor="pr-contact">Email or phone</FieldLabel>
                  <Input
                    id="pr-contact"
                    type="text"
                    placeholder="you@example.com or 07XX XXX XXX"
                    aria-invalid={!!errors.contact}
                    className="bg-background"
                    {...register('contact')}
                  />
                  <FieldError errors={[errors.contact]} />
                </Field>

                <Field data-invalid={!!errors.request || undefined}>
                  <FieldLabel htmlFor="pr-request">Your prayer request</FieldLabel>
                  <Textarea
                    id="pr-request"
                    rows={5}
                    placeholder="Share what's on your heart…"
                    aria-invalid={!!errors.request}
                    className="resize-none bg-background"
                    {...register('request')}
                  />
                  <FieldError errors={[errors.request]} />
                </Field>

                <Controller
                  control={control}
                  name="isConfidential"
                  render={({ field }) => (
                    <Field orientation="horizontal">
                      <Checkbox
                        id="pr-confidential"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked === true)}
                      />
                      <FieldLabel htmlFor="pr-confidential" className="font-normal">
                        Keep this request confidential
                      </FieldLabel>
                    </Field>
                  )}
                />

                <Button type="submit" disabled={isSubmitting} size="lg" className="h-12 sm:self-start sm:px-8">
                  <Send data-icon="inline-start" />
                  {isSubmitting ? 'Sending…' : 'Send prayer request'}
                </Button>
              </FieldGroup>
            </form>
          </div>
        </section>

        <section id="fellowship" className="scroll-mt-24 py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-12 lg:items-end lg:px-8">
            <div className="lg:col-span-8">
              <h2 className="font-display text-4xl leading-none font-bold uppercase md:text-5xl">WhatsApp Bible study fellowship</h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Reach out and we&rsquo;ll add you to a community of believers growing together in daily Scripture and prayer.
              </p>
            </div>
            {/* TODO: replace with a real wa.me group invite link once supplied by the client */}
            <Button asChild size="lg" className="h-12 px-8 lg:col-span-4 lg:justify-self-end">
              <Link href="/contact">Ask to join</Link>
            </Button>
          </div>
        </section>

        <section id="give" className="scroll-mt-24 border-t border-border py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-12 lg:items-end lg:px-8">
            <div className="lg:col-span-8">
              <h2 className="font-display text-4xl leading-none font-bold uppercase md:text-5xl">Support the Mission</h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Your generosity helps fund Light FM Radio broadcasting, gospel outreach missions, and Christian media ministry across East Africa.
              </p>
              <GivingForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
