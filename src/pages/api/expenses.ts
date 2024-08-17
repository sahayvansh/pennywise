import { google } from "googleapis"
import type { NextApiHandler } from "next"
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET

const ExpensesHandler: NextApiHandler = async (req, res) => {
    const token = await getToken({ req, secret })

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET
    const accessToken = token?.accessToken as string | undefined

    const auth = new google.auth.OAuth2({
        clientId,
        clientSecret,
    })

    auth.setCredentials({
        access_token: accessToken ?? "",
    })

    const sheets = google.sheets({ version: "v4", auth })
    const range = `${process.env.EXPENSES_SHEET_NAME ?? "Expenses"}!A:D`

    if (req.method === "POST") {
        const { body } = req
        const parsedBody = JSON.parse(body)

        const values = [[parsedBody.date, parsedBody.category, parsedBody.description, parsedBody.amount]]

        try {
            const response = await sheets.spreadsheets.values.append({
                spreadsheetId: process.env.SHEET_ID,
                range,
                valueInputOption: "USER_ENTERED",
                requestBody: {
                    values,
                },
            })

            res.status(200).json(response.data)
        } catch (error) {
            res.status(500).json({ error: 'Failed to add expense' })
        }
    } else if (req.method === "GET") {
        try {
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId: process.env.SHEET_ID,
                range,
            })

            const rows = response.data.values

            if (rows?.length) {
                const expenses = rows.slice(1).map((row, index) => ({
                    id: index.toString(),
                    date: row[0],
                    category: row[1],
                    description: row[2],
                    amount: parseFloat(row[3])
                }))

                res.status(200).json(expenses)
            } else {
                res.status(200).json([])
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch expenses' })
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

export default ExpensesHandler