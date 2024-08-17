import { getSession } from 'next-auth/react';
import { google } from 'googleapis';

export default async function handler(req: { body: { spreadsheetId: any; }; session: { spreadsheetId: any; save: () => any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; message?: string; }): void; new(): any; }; }; }) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const { spreadsheetId } = req.body;

  try {
    // Verify the spreadsheet exists and is accessible
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        // private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.get({
      spreadsheetId: spreadsheetId,
    });

    // If no error is thrown, the spreadsheet is accessible
    // Save the spreadsheetId to the user's session or a secure cookie
    req.session.spreadsheetId = spreadsheetId;
    await req.session.save();

    res.status(200).json({ message: 'Spreadsheet ID saved successfully' });
  } catch (error) {
    console.error('Error setting up spreadsheet:', error);
    res.status(500).json({ error: 'Failed to access spreadsheet. Make sure the ID is correct and the sheet is shared with the app.' });
  }
}