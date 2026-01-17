import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Lightbulb, ArrowRight } from 'lucide-react';

export default function Welcome() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'welcome-hero');

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <div className="relative h-48 w-full sm:h-64">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              Welcome to StudyAI
            </h1>
            <p className="mt-2 text-lg text-white/90">
              Your personal AI-powered study buddy.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>What can I do for you?</CardTitle>
            <CardDescription>
              Select a tool from the sidebar to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-start space-y-4">
            <p className="text-muted-foreground">
              Whether you need to understand a complex topic, summarize your
              notes, or test your knowledge, I'm here to help.
            </p>
            <Button asChild variant="ghost" className="text-primary -ml-4">
              <Link href="/?feature=explain">
                Explain a topic <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="border-2 border-accent">
          <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2">
            <div className="rounded-full bg-accent p-3">
              <Lightbulb className="h-6 w-6 text-accent-foreground" />
            </div>
            <CardTitle>Pro Tip</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              For the best results, provide clear and specific topics. For example, instead of "history", try "the causes of World War I".
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
