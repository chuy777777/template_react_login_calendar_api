import Calendar from "../components/calendars/Calendar";
import Tabs from "../components/tabs/Tabs";
import { useEffect } from "react";

import { useDb } from "../context/DbContext";

function HomePage() {
    const { clearErrors: clearDbErrors } = useDb()

    useEffect(() => {
        clearDbErrors()
    }, [])

    return (
        <div>
            <div className="row-auto mt-5 p-2 m-auto bg-gray-500 rounded-md">
                <Calendar />
            </div>
            <div className="row-auto mt-5 p-2 m-auto bg-gray-500 rounded-md">
                <Tabs />
            </div>
        </div>
    )
}

export default HomePage

