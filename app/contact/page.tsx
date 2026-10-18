'use client';

import { Navbar } from '@/components/Navbar';
import { Player } from '@/components/Player';
import { Footer } from '@/components/Footer';
import { PageHeader, SectionHeader } from '@/components/PageHeader';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, Send, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQS = [
  {
    q: 'How do I become a Christian?',
    a: "Simply believe in Jesus Christ, repent of your sins, and accept Him as your Lord and Savior. Pray and tell God you want to follow Jesus. We're here to help you take this life-changing step.",
  },
  {
    q: 'What happens after I accept Jesus?',
    a: "You experience God's forgiveness, peace, and eternal life. We recommend finding a local church, getting baptized, and connecting with a faith community to grow in your relationship with Christ.",
  },
  {
    q: 'Is it too late for God to forgive me?',
    a: "No! God's grace is unlimited. No matter what you've done, Jesus can forgive you. He died for ALL our sins. It's never too late to turn to Him.",
  },
  {
    q: 'How can I know Jesus is real?',
    a: 'Millions testify to encountering Jesus through prayer, Scripture, and the Holy Spirit. We invite you to seek Him with an open heart. Jesus said, "Ask and it will be given to you." (Matthew 7:7)',
  },
];

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name (at least 2 characters).'),
  email: z.string().min(1, 'Email is required.').email('Please enter a valid email address.'),
  subject: z.string().min(1, 'Please enter a subject.'),
  category: z.string().min(1, 'Please choose how we can help you.'),
  message: z.string().min(10, 'Message should be at least 10 characters.'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      category: 'salvation',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          reset();
          setSubmitted(false);
        }, 5000);
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <Player />

      <main className="pt-16 pb-24">
        <PageHeader
          title="Your spiritual journey matters"
          intro="Whether you're accepting Jesus for the first time, seeking prayer, or have questions about faith, we're here to help you on your path to Christ."
        />

        <section className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-12 lg:px-8">
          <aside className="flex flex-col gap-10 lg:col-span-4">
            <div className="flex flex-col gap-6">
              <a href="mailto:lcministries254@gmail.com" className="group flex gap-4">
                <Mail className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
                <span>
                  <span className="block font-display text-lg font-semibold tracking-[0.06em] uppercase">Email us</span>
                  <span className="text-muted-foreground group-hover:text-foreground group-hover:underline">lcministries254@gmail.com</span>
                </span>
              </a>
              <a href="tel:+254713710041" className="group flex gap-4">
                <Phone className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
                <span>
                  <span className="block font-display text-lg font-semibold tracking-[0.06em] uppercase">Prayer line, 24/7</span>
                  <span className="text-muted-foreground tabular-nums group-hover:text-foreground group-hover:underline">0713 710 041</span>
                  <span className="mt-1 block text-sm text-muted-foreground">Call anytime for prayer or counseling</span>
                </span>
              </a>
            </div>

            <div className="border-t-2 border-foreground pt-6">
              <h2 className="font-display text-2xl font-semibold uppercase">The gospel in three minutes</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">God loves you</span> (John 3:16) and has a plan for your life. But our sins separate us from God. Jesus died for your sins and rose again. Believe in Him, confess your sins, and accept His forgiveness today.
              </p>
              <blockquote className="mt-4 text-foreground/80 italic">
                &ldquo;If you confess with your mouth that Jesus is Lord and believe in your heart that God raised him from the dead, you will be saved.&rdquo; Romans 10:9
              </blockquote>
            </div>
          </aside>

          <div className="lg:col-span-7 lg:col-start-6">
            {submitted ? (
              <div className="flex animate-rise flex-col items-start gap-4 border-t-2 border-foreground pt-8">
                <CheckCircle className="size-8 text-accent-alt" aria-hidden />
                <h2 className="font-display text-4xl font-bold uppercase">Thank you, friend</h2>
                <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
                  Your request has been received. Our ministry team will reach out to you within 24 hours to pray with you and support your spiritual journey.
                </p>
                <p className="text-accent-alt italic">May the peace of Christ be with you. John 14:27</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <FieldGroup>
                  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                    <Field data-invalid={!!errors.name || undefined}>
                      <FieldLabel htmlFor="name">Name</FieldLabel>
                      <Input id="name" type="text" placeholder="Your name" aria-invalid={!!errors.name} {...register('name')} />
                      <FieldError errors={[errors.name]} />
                    </Field>

                    <Field data-invalid={!!errors.email || undefined}>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input id="email" type="email" placeholder="you@example.com" aria-invalid={!!errors.email} {...register('email')} />
                      <FieldError errors={[errors.email]} />
                    </Field>
                  </div>

                  <Field data-invalid={!!errors.category || undefined}>
                    <FieldLabel htmlFor="category">How can we help you?</FieldLabel>
                    <select
                      id="category"
                      aria-invalid={!!errors.category}
                      className="border-input dark:bg-input/30 flex h-9 w-full min-w-0 cursor-pointer rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:ring-destructive/40"
                      {...register('category')}
                    >
                      <option value="salvation">I want to accept Jesus Christ</option>
                      <option value="prayer">I need prayer</option>
                      <option value="counseling">I need spiritual counseling</option>
                      <option value="questions">I have questions about faith</option>
                      <option value="volunteer">I want to volunteer</option>
                      <option value="giving">I want to give or support the ministry</option>
                      <option value="other">Other</option>
                    </select>
                    <FieldError errors={[errors.category]} />
                  </Field>

                  <Field data-invalid={!!errors.subject || undefined}>
                    <FieldLabel htmlFor="subject">Subject</FieldLabel>
                    <Input id="subject" type="text" placeholder="What is this about?" aria-invalid={!!errors.subject} {...register('subject')} />
                    <FieldError errors={[errors.subject]} />
                  </Field>

                  <Field data-invalid={!!errors.message || undefined}>
                    <FieldLabel htmlFor="message">Message</FieldLabel>
                    <Textarea
                      id="message"
                      rows={6}
                      placeholder="Tell us what's on your mind…"
                      aria-invalid={!!errors.message}
                      className="resize-none"
                      {...register('message')}
                    />
                    <FieldError errors={[errors.message]} />
                  </Field>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" disabled={isSubmitting} size="lg" className="h-12 sm:self-start sm:px-8">
                    <Send data-icon="inline-start" />
                    {isSubmitting ? 'Sending…' : 'Send message'}
                  </Button>
                </FieldGroup>
              </form>
            )}
          </div>
        </section>

        <section className="border-t border-border py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Questions about Jesus & salvation"
              description="Biblical answers to help you understand faith and God's plan for your life."
            />
            <Accordion type="single" collapsible className="max-w-3xl">
              {FAQS.map((faq) => (
                <AccordionItem key={faq.q} value={faq.q}>
                  <AccordionTrigger className="font-display text-xl font-semibold">{faq.q}</AccordionTrigger>
                  <AccordionContent className="max-w-prose text-base leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
