export function getIsTheFirstTime(){
    const date = new Date()
    const today = date.getDate()

    const time = +localStorage.getItem("neoword-lastdate")

    if(today !== time){
        localStorage.setItem("neoword-lastdate", today)
        return true
    }
    return false
}