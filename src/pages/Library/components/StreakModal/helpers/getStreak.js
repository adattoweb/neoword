export function getStreak(){
    let streak = +localStorage.getItem("neoword-streak")
    const lastTime = new Date(+localStorage.getItem("neoword-lasttime"))
    const today = new Date()
    
    const lastDate = new Date(lastTime.getFullYear(), lastTime.getMonth(), lastTime.getDate())
    
    const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    
    const diffDays = Math.floor(
      (currentDate - lastDate) / (1000 * 60 * 60 * 24)
    )
    
    if(diffDays === 1){
        streak++
    } else if(diffDays > 1){
        streak = 1
    }

    localStorage.setItem("neoword-lasttime", today.getTime())

    localStorage.setItem("neoword-streak", streak)

    return streak
}