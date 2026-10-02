export type DailyNotes = Record<string, string>

export const INTERNSHIP_START = new Date(2026, 7, 31)
export const INTERNSHIP_END = new Date(2027, 0, 22)

export function toDateKey(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

export function generateWeekdays(start: Date, end: Date): Date[] {
    const weekdays: Date[] = []
    const current = new Date(start)

    while (current <= end) {
        const dayOfWeek = current.getDay()

        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            weekdays.push(new Date(current))
        }

        current.setDate(current.getDate() + 1)
    }

    return weekdays
}

export function groupDaysByMonth(days: Date[]): { label: string; days: Date[] }[] {
    const groups = new Map<string, Date[]>()

    for (const day of days) {
        const label = day.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
        })

        const existing = groups.get(label)

        if (existing) {
            existing.push(day)
        } else {
            groups.set(label, [day])
        }
    }

    return Array.from(groups.entries()).map(([label, monthDays]) => ({
        label,
        days: monthDays,
    }))
}

export function formatDayLabel(date: Date): string {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
}
