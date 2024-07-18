'use client';
import { Button } from '@/components/ui/button';
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs';

export default async function Home() {
  return (
    <main>
      <div> Kar hi lenge kuch to :)</div>
      <Button>Start</Button>
      <LoginLink>Sign in</LoginLink>
      <RegisterLink>Sign up</RegisterLink>
    </main>
  );
}
