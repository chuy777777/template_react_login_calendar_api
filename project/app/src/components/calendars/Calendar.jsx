import dayjs from "dayjs";
import { useState } from "react";
import { days, generateDate, months } from "../../utils/calendar";
import cn from "../../utils/cn"
import { GrFormNext, GrFormPrevious } from "react-icons/gr"

function Calendar() {
    let currentDate = dayjs()
    const [today, setToday] = useState(currentDate)
    const [selectedDate, setSelectedDate] = useState(currentDate)
    const dateFormat = "YYYY-MM-DD"
    const onlyDatesCalendar = []

    return (
        <div>
            <div className="block m-2 rounded-lg bg-white p-6 dark:bg-neutral-400">
                <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Calendario
                </h5>
            </div>
            <div className="block m-2 rounded-lg bg-white p-6 dark:bg-neutral-400">
                <div className="flex mx-auto divide-x-2 gap-10">
                    <div className="">
                        <div className="flex justify-between">
                            <h1 className="font-semibold">{months[today.month()]}, {today.year()}</h1>
                            <div className="flex items-center gap-5">
                                <GrFormPrevious className="w-5 h-5 cursor-pointer" onClick={() => {
                                    setToday(today.month(today.month() - 1))
                                }} />
                                <h1 className="cursor-pointer" onClick={() => {
                                    setToday(currentDate)
                                }}>Hoy</h1>
                                <GrFormNext className="w-5 h-5 cursor-pointer" onClick={() => {
                                    setToday(today.month(today.month() + 1))
                                }} />
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-7 text-gray-400">
                            {
                                days.map((day, index) => {
                                    return (
                                        <h1 className="h-14 grid place-content-center text-sm" key={index}>{day}</h1>
                                    )
                                })
                            }
                        </div>
                        <div className="w-full grid grid-cols-7">
                            {
                                generateDate(today.month(), today.year()).map(({ currentMonth, date, today }, index) => {
                                    return (
                                        <div className="h-14 border-t grid place-content-center text-sm" key={index}>
                                            <h1 className={cn(
                                                currentMonth ? "" : "text-gray-400",
                                                today ? "bg-red-600 text-white" : "",
                                                onlyDatesCalendar.includes(date.format(dateFormat)) ? "border-4 border-green-500" : "",
                                                selectedDate.toDate().toDateString() === date.toDate().toDateString() ? "bg-black text-white" : "",
                                                "m-6 h-10 w-10 grid place-content-center rounded-full hover:bg-black hover:text-white transition-all cursor-pointer"
                                            )} onClick={() => {
                                                setSelectedDate(date)
                                            }}>{date.date()}</h1>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="px-5 w-full grid grid-cols-1 divide-y-2">
                        <div className="p-2">
                            <ul>
                                <li className="flex"><p className="bg-red-600 m-1 h-5 w-5 rounded-full"></p><p className="m-1 h-5 text-xm">Dia actual</p></li>
                                <li className="flex"><p className="bg-black m-1 h-5 w-5 rounded-full"></p><p className="m-1 h-5 text-xm">Dia seleccionado</p></li>
                                <div className="container bg-red-400 text-center rounded-lg p-5 m-2">
                                    Dia seleccionado: <b>{selectedDate.format(dateFormat)}</b>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calendar