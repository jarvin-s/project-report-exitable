'use client'

import { useMemo, useState } from 'react'
import dailyNotesData from '@/data/daily-notes.json'
import {
    type DailyNotes,
    formatDayLabel,
    generateWeekdays,
    groupDaysByMonth,
    INTERNSHIP_END,
    INTERNSHIP_START,
    toDateKey,
} from '@/lib/daily-notes'

const dailyNotes = dailyNotesData as DailyNotes

export default function Reflection() {
    const weekdays = useMemo(
        () => generateWeekdays(INTERNSHIP_START, INTERNSHIP_END),
        []
    )
    const months = useMemo(() => groupDaysByMonth(weekdays), [weekdays])

    const daysWithNotes = useMemo(() => {
        const keys = new Set<string>()

        for (const dateKey of Object.keys(dailyNotes)) {
            const date = new Date(`${dateKey}T12:00:00`)

            if (Number.isNaN(date.getTime())) continue
            if (date < INTERNSHIP_START || date > INTERNSHIP_END) continue
            if (date.getDay() === 0 || date.getDay() === 6) continue

            keys.add(dateKey)
        }

        return keys
    }, [])

    const [selectedDateKey, setSelectedDateKey] = useState<string | null>(
        () => daysWithNotes.values().next().value ?? null
    )

    const selectedNote =
        selectedDateKey !== null ? dailyNotes[selectedDateKey] : undefined

    return (
        <section id='reflection' className='scroll-mt-8'>
            <div className='flex flex-col items-center p-4'>
                <h1 className='header-text text-center text-6xl font-bold md:text-left'>
                    Personal Reflection
                </h1>
                <p className='mt-4 max-w-2xl text-center md:text-left'>
                    Reflection on the learning outcomes (LOs): reflect on each
                    LO specifically (why you think you fulfilled the LO in your
                    internship?), where possible referring to products in your
                    portfolio that proof this
                </p>
                <p className='mt-4 max-w-2xl text-center md:text-left'>
                    Reflection on the project, what you have learned
                    professionally and in the ICT domain; relate this to your
                    own development goals as set at the beginning of your
                    internship project (defined in the project proposal)
                </p>

                <div className='mt-12 w-full max-w-2xl'>
                    <h2 className='header-text text-center text-4xl font-bold'>
                        Daily Activity
                    </h2>
                    <div
                        aria-live='polite'
                        className='mt-8 rounded-md border border-[#ececec] bg-white p-6 shadow-sm'
                    >
                        {selectedDateKey ? (
                            <>
                                <h3 className='text-xl font-bold'>
                                    {formatDayLabel(
                                        new Date(`${selectedDateKey}T12:00:00`)
                                    )}
                                </h3>
                                <p className='mt-4 text-lg leading-relaxed'>
                                    {selectedNote ??
                                        'No note for this day yet. Add one in daily-notes.json using the date key YYYY-MM-DD.'}
                                </p>
                            </>
                        ) : (
                            <p className='text-lg text-[#6b6e66]'>
                                Select a day to view its reflection note.
                            </p>
                        )}
                    </div>

                    <div className='mt-4 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3'>
                        {months.map(({ label, days }) => (
                            <div key={label}>
                                <h3 className='text-lg font-bold text-[#ff631c]'>
                                    {label}
                                </h3>
                                <div className='mt-3 flex flex-wrap gap-2'>
                                    {days.map((day) => {
                                        const dateKey = toDateKey(day)
                                        const hasNote =
                                            daysWithNotes.has(dateKey)
                                        const isSelected =
                                            selectedDateKey === dateKey

                                        return (
                                            <button
                                                key={dateKey}
                                                type='button'
                                                onClick={() =>
                                                    setSelectedDateKey(dateKey)
                                                }
                                                aria-pressed={isSelected}
                                                aria-label={formatDayLabel(day)}
                                                className={[
                                                    'flex h-10 min-w-10 items-center justify-center rounded-full border px-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-[#ff631c] focus-visible:ring-offset-2 focus-visible:outline-none',
                                                    isSelected
                                                        ? 'border-[#ff631c] bg-[#ff631c] text-white'
                                                        : hasNote
                                                          ? 'border-[#ff631c] bg-[#fff4ef] text-[#ff631c] hover:bg-[#ff631c] hover:text-white'
                                                          : 'border-[#d9d9d9] bg-white text-[#0b0b0b] hover:border-[#ff631c] hover:text-[#ff631c]',
                                                ].join(' ')}
                                            >
                                                {day.getDate()}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
