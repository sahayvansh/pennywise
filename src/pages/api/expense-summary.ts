import { google } from "googleapis"
import type { NextApiHandler } from "next"
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET

const ExpenseSummaryHandler: NextApiHandler = async (req, res) => {
    const token = await getToken({ req, secret })

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    if (req.method !== "GET") {
        res.setHeader('Allow', ['GET'])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
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

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range,
        })

        const rows = response.data.values

        if (rows?.length) {
            const expenses = rows.slice(1).map(row => ({
                category: row[1],
                amount: parseFloat(row[3])
            }))

            const summary = expenses.reduce((acc, expense) => {
                if (!acc[expense.category]) {
                    acc[expense.category] = 0
                }
                acc[expense.category] += expense.amount
                return acc
            }, {} as Record<string, number>)

            const formattedSummary = Object.entries(summary).map(([category, total]) => ({
                category,
                total
            }))

            res.status(200).json(formattedSummary)
        } else {
            res.status(200).json([])
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch expense summary' })
    }
}

export default ExpenseSummaryHandler