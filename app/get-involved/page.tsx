'use client';

import { Navbar } from '@/components/Navbar';
import { Player } from '@/components/Player';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import Link from 'next/link';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { HeartHandshake, MessageCircle, HandHeart, Users, Send } from 'lucide-react';

const WAYS_TO_HELP = [
  {
    icon: HeartHandshake,
    title: 'Prayer Requests',
    description: 'Share what\'s on your heart — our team prays over every request.',
    href: '#prayer-request',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Fellowship',
    description: 'Join our Bible study community for daily encouragement.',
    href: '#fellowship',
  },
  {
    icon: HandHeart,
    title: 'Support the Mission',
    description: 'See what your generosity is funding right now.',
    href: '#give',
  },
  {
    icon: Users,
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

      <main className="pt-24 pb-32 bg-background">
        <section className="py-16 bg-gradient-to-b from-muted via-background to-background border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Get Involved</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Whether through prayer, fellowship, giving, or serving — there's a place for you in this ministry.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WAYS_TO_HELP.map((way) => (
                <Card key={way.title} className="p-6 gap-0 rounded-2xl hover:shadow-lg transition-shadow">
                  <CardContent className="p-0 flex flex-col items-start">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <way.icon size={22} className="text-accent" />
                    </div>
                    <h3 className="font-serif font-bold text-foreground mb-2">{way.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{way.description}</p>
                    <Button asChild variant="outline" size="sm">
                      <Link href={way.href}>Learn more</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Prayer Request Section */}
        <section id="prayer-request" className="py-16 bg-muted scroll-mt-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Share a Prayer Request</h2>
              <p className="text-muted-foreground">
                Whatever you're carrying, our team would be honored to pray over it with you.
              </p>
            </div>

            <Card className="p-6 sm:p-8">
              <CardContent className="p-0">
                <form onSubmit={handleSubmit(onSubmitPrayerRequest)} noValidate className="space-y-6">
                  <div>
                    <label htmlFor="pr-name" className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <Input
                      id="pr-name"
                      type="text"
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="pr-contact" className="block text-sm font-medium text-foreground mb-2">
                      Email or Phone
                    </label>
                    <Input
                      id="pr-contact"
                      type="text"
                      placeholder="your@email.com or phone number"
                      aria-invalid={!!errors.contact}
                      {...register('contact')}
                    />
                    {errors.contact && (
                      <p className="mt-1.5 text-sm text-destructive">{errors.contact.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="pr-request" className="block text-sm font-medium text-foreground mb-2">
                      Your Prayer Request
                    </label>
                    <Textarea
                      id="pr-request"
                      rows={5}
                      placeholder="Share what's on your heart..."
                      aria-invalid={!!errors.request}
                      className="resize-none"
                      {...register('request')}
                    />
                    {errors.request && (
                      <p className="mt-1.5 text-sm text-destructive">{errors.request.message}</p>
                    )}
                  </div>

                  <Controller
                    control={control}
                    name="isConfidential"
                    render={({ field }) => (
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="pr-confidential"
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked === true)}
                        />
                        <label htmlFor="pr-confidential" className="text-sm text-muted-foreground cursor-pointer">
                          Keep this request confidential
                        </label>
                      </div>
                    )}
                  />

                  <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
                    <Send size={18} />
                    {isSubmitting ? 'Sending...' : 'Send Prayer Request'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* WhatsApp Fellowship Section */}
        <section id="fellowship" className="py-16 scroll-mt-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <MessageCircle size={26} className="text-accent" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">WhatsApp Bible Study Fellowship</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join our WhatsApp Bible Study Fellowship — reach out and we'll add you to a community of
              believers growing together in daily Scripture and prayer.
            </p>
            {/* TODO: replace with a real wa.me group invite link once supplied by the client */}
            <Button asChild size="lg">
              <Link href="/contact">Ask to Join</Link>
            </Button>
          </div>
        </section>

        {/* Giving / Transparency Section */}
        <section id="give" className="py-16 bg-muted scroll-mt-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <HandHeart size={26} className="text-accent" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">What Your Support Is Funding</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Right now, your generosity is helping fund a PA system purchase for Lionhill SDA Church.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Support the Mission</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
