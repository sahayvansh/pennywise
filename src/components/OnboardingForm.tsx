import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const OnboardingForm = () => {
  const [spreadsheetId, setSpreadsheetId] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/setup-spreadsheet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ spreadsheetId }),
    });
    if (response.ok) {
      router.push('/expenses');
    } else {
      // Handle error
      alert('Failed to set up spreadsheet. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Alert>
        <AlertTitle>Before you begin:</AlertTitle>
        <AlertDescription>
          <ol className="list-decimal list-inside space-y-2">
            <li>Create a new Google Sheet</li>
            <li>Add two sheets named &quot;Expenses&quot; and &quot;Categories&quot;</li>
            <li>In the &quot;Expenses&quot; sheet, add these columns: Date, Category, Description, Amount</li>
            <li>In the &quot;Categories&quot; sheet, add a single column for your expense categories</li>
            <li>Share your sheet with the email address: {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL}</li>
            <li>Copy your Google Sheet ID from the URL (it&apos;s the long string between /d/ and /edit)</li>
          </ol>
        </AlertDescription>
      </Alert>
      <Input
        type="text"
        value={spreadsheetId}
        onChange={(e) => setSpreadsheetId(e.target.value)}
        placeholder="Enter your Google Spreadsheet ID"
        required
      />
      <Button type="submit">Set Up My Account</Button>
    </form>
  );
};