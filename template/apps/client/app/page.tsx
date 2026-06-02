import { Button } from '@repo/web-ui/base/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/web-ui/base/card';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{{PROJECT_NAME}}</CardTitle>
          <CardDescription>
            Your monorepo is configured and ready to go. This page uses shared
            components from @repo/web-ui.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Button>Get Started</Button>
          <Button variant="outline">Documentation</Button>
        </CardContent>
      </Card>
    </div>
  );
}
