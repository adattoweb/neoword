import { readLocal } from "@/helpers/readLocal"

export function getIsTheFirstTime(){
    const date = new Date()

    const time = readLocal("neoword-lastdate")
    const today = [date.getDate(), date.getMonth() + 1, date.getFullYear()]

    if(today[0] !== time[0]){
        localStorage.setItem("neoword-lastdate", JSON.stringify(today))
        console.log("+++")
        return true
    }
    return false
}